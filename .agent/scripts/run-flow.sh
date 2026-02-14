#!/bin/bash
# Brand DNA - Workflow Runner
# Executes AI workflow files with proper context

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Brand DNA Workflow Runner${NC}"
echo "Workspace: $WORKSPACE_DIR"

# Check for workflow file
if [ -z "$1" ]; then
    echo "Usage: ./run-flow.sh <workflow-file.af.yaml> [options]"
    echo ""
    echo "Available workflows:"
    ls -1 "$SCRIPT_DIR/workflows/"*.af.yaml 2>/dev/null | xargs -n1 basename
    exit 1
fi

WORKFLOW_FILE="$1"
WORKFLOW_PATH="$SCRIPT_DIR/workflows/$WORKFLOW_FILE"

if [ ! -f "$WORKFLOW_PATH" ]; then
    echo -e "${RED}Error: Workflow not found: $WORKFLOW_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}Loading workflow:${NC} $WORKFLOW_FILE"

# Parse workflow name
WORKFLOW_NAME=$(grep "^name:" "$WORKFLOW_PATH" | head -1 | cut -d'"' -f2)
WORKFLOW_DESC=$(grep "^description:" "$WORKFLOW_PATH" | head -1 | cut -d'"' -f2)

echo "Name: $WORKFLOW_NAME"
echo "Description: $WORKFLOW_DESC"

# Check for required tools
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}Error: $1 not found${NC}"
        exit 1
    fi
}

# Route based on workflow complexity
route_workflow() {
    local risk_score=$1
    
    if (( $(echo "$risk_score < 0.3" | bc -l) )); then
        echo -e "${GREEN}Route: Gemini (fast/cheap)${NC}"
        echo "gemini"
    elif (( $(echo "$risk_score >= 0.3 && $risk_score < 0.7" | bc -l) )); then
        echo -e "${YELLOW}Route: KiloCode (balanced)${NC}"
        echo "kilocode"
    else
        echo -e "${RED}Route: Claude + Human Approval${NC}"
        echo "claude"
    fi
}

# Execute workflow steps
execute_steps() {
    local step_id=$1
    local gate=$2
    
    echo -e "\n${GREEN}Executing step:${NC} $step_id"
    echo "Gate: $gate"
    
    case $gate in
        "hitl")
            echo -e "${RED}🔴 HITL Gate - Approval Required${NC}"
            read -p "Approve this step? (y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "Step aborted by user"
                exit 0
            fi
            ;;
        "passive")
            echo -e "${YELLOW}🟡 Passive Approval - 30s countdown${NC}"
            for i in {30..1}; do
                echo -ne "\rApproving in ${i}s... (press any key to approve)"
                read -t 1 -n 1 key 2>/dev/null && break
            done
            echo
            ;;
        "auto"|"")
            echo -e "${GREEN}🟢 Auto-execute${NC}"
            ;;
    esac
}

# Main execution
echo -e "\n${GREEN}Starting workflow execution...${NC}"

# Parse and execute
TOTAL_STEPS=$(grep -c "^  - id:" "$WORKFLOW_PATH" || echo "0")
echo "Total steps: $TOTAL_STEPS"

# Execute each step (simplified - real implementation would parse YAML)
STEP=1
while IFS= read -r line; do
    if [[ $line =~ ^\ +-\ id:\ \"(.+)\" ]]; then
        step_id="${BASH_REMATCH[1]}"
        gate="auto"
        
        # Look for gate in next lines
        next_lines=$(sed -n "/^  - id: \"$step_id\"/,/^  - id:/p" "$WORKFLOW_PATH" | head -20)
        if echo "$next_lines" | grep -q "gate:"; then
            gate=$(echo "$next_lines" | grep "gate:" | cut -d'"' -f2)
        fi
        
        execute_steps "$step_id "$gate""
        STEP=$((STEP + 1))
    fi
done < "$WORKFLOW_PATH"

echo -e "\n${GREEN}Workflow complete!${NC}"
