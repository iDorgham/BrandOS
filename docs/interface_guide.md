# Brand OS Interface & Communication Guide

This document provides a comprehensive nomenclature for all interface elements in Brand OS. Use these names to ensure precise communication during development and editing.

## 🧭 Main Navigation (Sidebar)

These are the primary views accessible from the left-most permanent sidebar:

| Page Name | Internal Key | Description |
| :--- | :--- | :--- |
| **Dashboard** | `dashboard` | High-level overview of brand health, recent assets, and quick actions. |
| **Brand Identity** | `identity` | Visual spectrums and DNA visualizations of the selected brand. |
| **Brand Doctrine** | `doctrine` | Core brand guidelines, tone rules, and stylistic signatures. |
| **Moodboard** | `moodboard` | Infinite canvas for visual strategy and workflow automation. |
| **Studio** | `creative` | The AI generation engine for creating brand-aligned assets. |
| **Library** | `library` | Repository of all generated and uploaded assets. |
| **AI Training** | `training` | Interface for fine-tuning models and refining brand patterns. |
| **Compliance Audit** | `audit` | Scoring and verification of assets against brand doctrine. |
| **Analytics** | `analytics` | Data performance and brand consistency metrics. |
| **Deployment** | `deployment` | Managing exports and integrations to external platforms. |
| **Team Management** | `team` | Workspace members, invitations, and role assignments. |
| **Settings** | `settings` | Global system, workspace, and account configuration. |
| **Profile** | `profile` | Individual user settings and avatar management. |

---

## ⚙️ Settings Index

The Settings view is organized into four main groups:

### 1. Account Group
- **Profile**: Name, email, and personal preferences.
- **Security**: Password management and session security.

### 2. Workspace Group
- **General**: Workspace name, slug, and core metadata.
- **Appearance**: Theme selection (Dark/Light/Cyber) and UI scaling.
- **Moodboard**: Global canvas defaults and interaction settings.

### 3. Integrations Group
- **LLMs / AI Models**: Configuration for Gemini, GPT, and Midjourney endpoints.
- **API & Webhooks**: Personal access tokens and outgoing notification triggers.

### 4. Organization Group
- **Team**: Bulk member management and workspace roles.
- **Subscription**: Billing history, plan selection, and usage quotas.

---

## 🎨 Comprehensive Moodboard Interface

### Standard Components
| Component Name | Function |
| :--- | :--- |
| **Board Canvas** | The primary workspace for node interaction. |
| **MoodBoard Sidebar** | Left-hand panel containing the Node Browser. |
| **Node Browser** | Category-nested list of all available node types. |
| **Settings Panel** | Right-hand property editor for selected nodes/canvas. |
| **Status Bar** | Bottom strip showing counts and save status. |
| **Active Header** | Top navigation containing Brand Name and View Modes. |

### Tools & Menus
- **Command Palette** (`Ctrl+K`): Global search for commands and templates.
- **Quick Add Menu**: Floating menu for rapid node creation.
- **Context Menu**: Right-click actions for nodes, edges, and groups.
- **Node Group Envelope**: The visual border and title bar for grouped nodes.

---

## 🧩 Node Catalog

When requesting edits to nodes, refer to these categories:

### 1. Core / Layout
- **Title / Headline**: Text headers.
- **Paragraph / Text**: Body copy containers.
- **LabelNode**: Small text tags.
- **ImageNode**: Visual asset containers.
- **Section / GridSys**: Spatial organization and layout frames.

### 2. Brand DNA
- **PaletteNode**: Interactive color swatches.
- **TypographyNode**: Font specification and preview.
- **MoodGauge / Attribute**: Visual sliders for brand tone.
- **DNA Spectrum**: Visualization of brand personality nodes.

### 3. AI & Creative
- **ContentGen / HeadlineGen**: Prompt-driven text generation.
- **NegativeNode / PresetNode**: Refinement constraints for AI.
- **KSampler / VAE / Scheduler**: Low-level AI engine configurations.
- **Midjourney / StoryCreator**: Advanced generation pipelines.

### 4. Integration & Logic
- **APIRequest / Webhook**: Connectivity to external services.
- **Slack / Telegram / WhatsApp**: Communication channel output.
- **GoogleSheet / CMSSync**: Data synchronization nodes.
- **MetaAds / GoogleAds**: Direct-to-platform ad deployment.
- **Trigger / Logic / Switch**: Conditional workflow routing.

---
*Use this guide as the source of truth for all terminology in the Brand OS ecosystem.*

# �️ Desktop Interface Sketches (Computer)

These sketches represent the layout on large screens where the Sidebar is permanent.

## 1. Desktop Global Shell
```text
_______________________________________________________________________________
|      |                                                                       |
|  S   |  [ ACTIVE HEADER (Brand Name, Breadcrumbs, Global Actions) ]          |
|  I   |_______________________________________________________________________|
|  D   |                                                                       |
|  E   |                                                                       |
|  B   |                                                                       |
|  A   |                         MAIN VIEW CONTENT AREA                        |
|  R   |                                                                       |
|      |                                                                       |
|______|_______________________________________________________________________|
```

## 2. Desktop Moodboard (Creative Canvas)
```text
_______________________________________________________________________________
| [ HEADER ] [ BRAND NAME ]               [ TOOLBAR: Ptr, Text, Img, Export ]   |
|_______________________________________________________________________________|
| S |                                                                    | S    |
| I |                                                                    | E    |
| D |                                                                    | T    |
| E |                        INFINITE BOARD CANVAS                       | T    |
| B |                    (Nodes, Edges, Groups, Cursors)                 | I    |
| A |                                                                    | N    |
| R |                                                                    | G    |
|___|____________________________________________________________________| S____|
| [ STATUS BAR: Nodes: X | Edges: Y | Workspace: Z | Sync Status ]              |
```

## 3. Desktop Dashboard & Feature Views
```text
_______________________________________________________________________________
| [ SIDEBAR ] | [ VIEW HEADER ]                         [ ACTIONS/SEARCH ]     |
| (Full/Mini) |________________________________________________________________|
|             |                                                                |
|             |  [ PRIMARY CONTENT MODULES ]         [ SIDEBAR/UTILITY ]       |
|             |  (Visualization/Studio/Grid)         (Settings/History)        |
|             |                                                                |
|_____________|________________________________________________________________|
```

## 4. Workflow Library Browser (Modal Overlay)
```text
 _____________________________________________________________________________
| [ HEADER: WORKFLOW LIBRARY ] [ SEARCH ] [ TOTAL: XX ]                 [ X ] |
|_____________________________________________________________________________|
|             |                                                               |
| [ CATEGORY  |   [ WORKFLOW GRID ]                                           |
|   FILTERS ] |   ____________________   ____________________                 |
|             |   | [ WORKFLOW CARD ] |  | [ WORKFLOW CARD ] |                |
|  - Logic    |   | Name, Description |  | Name, Description |                |
|  - Social   |   | [ SELECT ]        |  | [ SELECT ]        |                |
|  - Web      |   |___________________|  |___________________|                |
|             |                                                               |
|_____________|_______________________________________________________________|
| [ FOOTER: System Active ]                       [ XX SEQUENCES DEPLOYABLE ] |
```

## 5. Modules Manager (Modal Overlay)
```text
 _____________________________________________________________________________
| [ HEADER: MODULES MANAGER ]                                           [ X ] |
|_____________________________________________________________________________|
|                                                                             |
|                         [ MODULES MARKETPLACE VIEW ]                        |
|                                                                             |
|      (Grid of installable integration nodes and system enhancements)        |
|                                                                             |
|_____________________________________________________________________________|
| [ FOOTER: Secure Encryption ]                  [ (c) 2026 Brand OS Ent. ]   |
```

# 📱 Mobile Interface Sketches (Phone/Tablet)

These sketches represent the compact layout where navigation moves to the bottom.

## 1. Mobile Global Shell
```text
_________________________________
| [ COMPACT SITE HEADER ]       |
|_______________________________|
|                               |
|                               |
|      MAIN VIEW CONTENT AREA   |
|                               |
|                               |
|_______________________________|
| [ BOTTOM NAV (4 Quick Tabs) ] |
|_______________________________|
```

## 2. Mobile Feature Layout (Stack)
```text
_________________________________
| [ HEADER ]            [ MENU ]|
|_______________________________|
|                               |
|  [ CONTENT MODULE A ]         |
|  (Full Width)                 |
|                               |
|  [ CONTENT MODULE B ]         |
|  (Full Width)                 |
|                               |
|  [ COMPACT LISTS ]            |
|  (Single Column)              |
|                               |
|_______________________________|
| [ BOTTOM NAV ]        [ MORE ]|
```

## 3. Mobile Moodboard
```text
_________________________________
| [ COMPACT HEADER ]    [ TOOL ]|
|_______________________________|
|                               |
|                               |
|      ZOOMABLE CANVAS AREA     |
|                               |
|                               |
|_______________________________|
| [ MINI STATUS ] [ NAV BAR ]   |
```

# 🗺️ Page-Specific Layout Details

For more granular communication, use these regional names for both platforms:

| Region | Desktop Position | Mobile Position |
| :--- | :--- | :--- |
| **Primary Nav** | Left Sidebar | Bottom Navigation Bar |
| **Secondary Nav** | Internal Sidebar / Tabs | "More" Full-screen Menu |
| **Header** | Top Bar (Wide) | Top Bar (Condensed) |
| **Workspace** | Center Layout | Vertical Stack |
| **Settings** | Right Panel (Slide-out) | Modal / Bottom Sheet |
