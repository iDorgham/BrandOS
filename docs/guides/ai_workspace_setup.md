# AI Workspace Setup for Brand OS

This document outlines the unified configuration for all AI-powered development tools used in the Brand OS project, including Gemini CLI, Claude CLI, Opencode CLI, Kilocode CLI, and IDE extensions.

The goal is to create a cohesive and intelligent development environment where AI assistants can work together seamlessly, understand the project's context, and adhere to its standards.

## 1. Guiding Principles (Rules)

These rules are the foundation of the AI workspace. They ensure consistency, safety, and efficiency.

- **Rule 1: Context is King.** Every interaction must start with an understanding of the current context. The AI should use the provided file and project structure information.
- **Rule 2: Adhere to Project Conventions.** All generated code must follow the existing coding style, naming conventions, and architectural patterns.
- **Rule 3: Database-First Security.** Any database schema change must be proposed as a Supabase migration file. RLS policies must be applied to all new tables.
- **Rule 4: Component-Based UI.** Frontend development should focus on creating or modifying reusable React components in the `web/src/components` and `web/src/features` directories.
- **Rule 5: Service Layer Abstraction.** All business logic and external API calls must be handled in the `web/src/services` directory. UI components should not contain direct API calls.
- **Rule 6: Type Safety First.** All generated code must be strongly typed using TypeScript.
- **Rule 7: Test-Driven Development.** For any new feature or bug fix, the AI should also create or update the corresponding tests.
- **Rule 8: Documentation is a Deliverable.** For any new feature, the relevant documentation in the `/docs` directory should be updated.

## 2. Specialized Personas (Agents)

These are the specialized AI personas that can be invoked for specific tasks.

### a. `brandos-architect`

- **Description:** The system architect. Understands the overall project structure, data models, and business logic.
- **Expertise:** System design, database schema, API design, security.
- **When to use:** For high-level questions about the architecture, designing new features, or refactoring existing ones.

### b. `react-pro`

- **Description:** The React specialist. An expert in building and maintaining the Brand OS frontend.
- **Expertise:** React 19, TypeScript, Tailwind CSS, Framer Motion, `@xyflow/react`.
- **When to use:** For creating new UI components, fixing frontend bugs, and implementing UI/UX designs.

### c. `supabase-expert`

- **Description:** The Supabase and PostgreSQL guru.
- **Expertise:** Database schema design, writing SQL migrations, optimizing queries, and managing RLS policies.
- **When to use:** For any database-related tasks.

### d. `doc-writer`

- **Description:** The technical writer. Responsible for keeping the project documentation up-to-date.
- **Expertise:** Markdown, technical writing.
- **When to use:** For creating and updating documentation.

## 3. Core Capabilities (Skills)

These are the specific skills that the agents can use to perform tasks.

### a. `create-react-component`

- **Description:** Creates a new React component with a corresponding Storybook story and test file.
- **Parameters:** `name`, `path`, `props`
- **Example:** `create-react-component --name UserProfile --path features/profile --props "{ name: string, avatarUrl: string }"`

### b. `create-supabase-migration`

- **Description:** Creates a new Supabase migration file with the specified SQL commands.
- **Parameters:** `name`, `sql`
- **Example:** `create-supabase-migration --name add_new_table --sql "CREATE TABLE new_table (id UUID PRIMARY KEY);"`

### c. `generate-service-method`

- **Description:** Adds a new method to a service in `web/src/services`.
- **Parameters:** `service`, `methodName`, `params`, `body`
- **Example:** `generate-service-method --service brand.service.ts --methodName getBrandByName --params "name: string" --body "return supabase.from('brands').select().eq('name', name);"`

### d. `update-docs`

- **Description:** Updates a section of a documentation file.
- **Parameters:** `file`, `section`, `content`
- **Example:** `update-docs --file docs/API.md --section "Brand API" --content "New endpoint for getting brands by name."`

## 4. Claude Pro Plan Quota Conservation Strategy

To ensure the sustainable use of the Claude Pro plan, the following strategies should be implemented:

- **1. Precision Prompting:** Prompts should be concise and specific. Avoid vague or open-ended questions.
- **2. Request Focused Outputs:** Ask for code only, or Markdown only, to avoid verbose, conversational responses. Add "Be concise" or "Code only" to the end of your prompts.
- **3. Chain of Thought for Complexity:** For complex problems, guide the AI by breaking the task down into smaller, logical steps. This is more efficient than a single, large request.
- **4. Leverage Context7 MCP:** The MCP server is the most powerful tool for quota conservation. By providing the AI with direct access to relevant documentation and code examples, it dramatically reduces the need for large context windows in the prompt itself. The AI can pull in context as needed, rather than having it all pushed in one large prompt.
- **5. Use Smaller Models for Simple Tasks:** Not every task requires the most powerful model. For simple, repetitive tasks, use a smaller, faster, and cheaper model. This can be configured at the CLI or IDE level.
  - **Examples:** Code formatting, syntax correction, generating boilerplate, simple translations.
- **6. Cache Repeated Requests:** Implement a local caching mechanism (at the CLI or IDE level) to store and retrieve responses for identical prompts. This is especially useful for common questions about the project architecture or conventions.
- **7. Human-in-the-Loop:** Don't rely on the AI for everything. Use it as a powerful assistant, but keep the human developer in control. For tasks that require significant creative or critical thinking, use the AI for research and initial drafts, but the final implementation should be driven by the developer.
