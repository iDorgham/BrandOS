# Rule: Context is King

Every AI interaction must start with understanding the current context. Never make assumptions about the task, project structure, or user intent without gathering relevant context first.

## Core Principles

1. **Understand Before Acting** - Read relevant files, understand project structure, and clarify requirements before generating any code or content.

2. **Gather Context Strategically**
   - Use `grep` to find relevant code patterns before reading files
   - Use `glob` to locate files by pattern
   - Read files in chunks for large files
   - Reference existing code conventions

3. **Ask for Clarification** - When context is unclear, ask specific questions instead of making assumptions.

## Token Optimization

- Only read files directly relevant to the task
- Use targeted searches instead of full file reads
- Reference existing patterns rather than re-explaining
- Provide specific file paths and line numbers in requests

## Examples

**Bad:**
User: "Add a button"
AI: Adds a button to a random component

**Good:**
User: "Add a submit button to the login form"
AI: "I can add that. Which file contains the login form? And should this be a primary or secondary button style?"
