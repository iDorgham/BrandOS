#!/bin/bash
# Brand DNA - Development Helper Script
# Common development tasks made easy

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$SCRIPT_DIR/../web"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Brand DNA Development Helper     ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"

# Check we're in the right place
if [ ! -d "$WEB_DIR" ]; then
    echo -e "${RED}Error: web directory not found${NC}"
    exit 1
fi

show_menu() {
    echo ""
    echo "Select an option:"
    echo "  1. Start dev server"
    echo "  2. Build for production"
    echo "  3. Run tests"
    echo "  4. Typecheck"
    echo "  5. Analyze bundle"
    echo "  6. Run workflow"
    echo "  7. List agents"
    echo "  8. List skills"
    echo "  9. Quick search"
    echo "  10. Git status"
    echo "  q. Quit"
    echo ""
    read -p "Choice: " choice
}

case "${1:-menu}" in
    1|dev)
        echo -e "${GREEN}Starting dev server...${NC}"
        cd "$WEB_DIR" && npm run dev
        ;;
        
    2|build)
        echo -e "${GREEN}Building for production...${NC}"
        cd "$WEB_DIR" && npm run build
        ;;
        
    3|test)
        echo -e "${GREEN}Running tests...${NC}"
        cd "$WEB_DIR" && npm run test
        ;;
        
    4|typecheck)
        echo -e "${GREEN}Running typecheck...${NC}"
        cd "$WEB_DIR" && npx tsc --noEmit
        ;;
        
    5|analyze)
        echo -e "${GREEN}Analyzing bundle...${NC}"
        cd "$WEB_DIR" && ANALYZE=true npm run build
        ;;
        
    6|workflow)
        if [ -z "$2" ]; then
            echo "Available workflows:"
            ls -1 "$SCRIPT_DIR/workflows/"*.af.yaml 2>/dev/null | xargs -n1 basename
        else
            echo -e "${GREEN}Running workflow: $2${NC}"
            bash "$SCRIPT_DIR/run-flow.sh" "$2"
        fi
        ;;
        
    7|agents)
        echo "Available agents:"
        find "$SCRIPT_DIR/agents" -name "*.json" | while read f; do
            name=$(basename "$f" .json)
            domain=$(dirname "$f" | xargs basename)
            echo "  - $domain/$name"
        done
        ;;
        
    8|skills)
        echo "Available skills:"
        find "$SCRIPT_DIR/skills" -name "*.json" | while read f; do
            name=$(basename "$f" .json)
            domain=$(dirname "$f" | xargs basename)
            echo "  - $domain/$name"
        done
        ;;
        
    9|search)
        if [ -z "$2" ]; then
            read -p "Search pattern: " pattern
        else
            pattern="$2"
        fi
        echo -e "${GREEN}Searching in web/src...${NC}"
        grep -r --include="*.ts" --include="*.tsx" "$pattern" "$WEB_DIR/src" | head -20
        ;;
        
    10|status)
        cd "$SCRIPT_DIR" && git status
        ;;
        
    *)
        show_menu
        ;;
esac
