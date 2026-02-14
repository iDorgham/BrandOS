# Node Reference

This document provides a comprehensive reference for all nodes available in the Brand OS moodboard.

---

## Standard Node Connections

Unless otherwise specified, all nodes have the following connection points:

- **Inputs:**
  - `Top`: Accepts incoming data or trigger signals.
  - `Left`: Accepts incoming data or trigger signals.
- **Outputs:**
  - `Right`: Sends data or trigger signals.
  - `Bottom`: Sends data or trigger signals.

---

## Node Index

- [AttributeNode](#attributenode)
- [CheckpointNode](#checkpointnode)
- [CMSSyncNode](#cmssyncnode)
- [CompetitorNode](#competitornode)
- [ContentNode](#contentnode)
- [EmitterNode](#emitternode)
- [EncoderNode](#encodernode)
- [EngineNode](#enginenode)
- [GridSysNode](#gridsysnode)
- [IconsNode](#iconsnode)
- [ImageNode](#imagenode)
- [KSamplerNode](#ksamplernode)
- [LabelNode](#labelnode)
- [LogicNode](#logicnode)
- [MidjourneyNode](#midjourneynode)
- [ModelProfileNode](#modelprofilenode)
- [MoodGaugeNode](#moodgaugenode)
- [NegativeNode](#negativenode)
- [PaletteNode](#palettenode)
- [ParagraphNode](#paragraphnode)
- [PresetNode](#presetnode)
- [ReceiverNode](#receivernode)
- [ReferenceNode](#referencenode)
- [SectionNode](#sectionnode)
- [SpotifyNode](#spotifynode)
- [SwitchNode](#switchnode)
- [TextNode](#textnode)
- [TextureNode](#texturenode)
- [TitleNode](#titlenode)
- [ToneNode](#tonenode)
- [TriggerNode](#triggernode)
- [TypographyNode](#typographynode)
- [VAENode](#vaenode)
- [WeatherNode](#weathernode)
- [WebRefNode](#webrefnode)

---

## Node Details

### AttributeNode
- **Description:** Defines a specific attribute with a key and value. Used to add custom metadata to a brand.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Key`: The name of the attribute.
  - `Value`: The value of the attribute.

### CheckpointNode
- **Description:** A node for loading a specific model checkpoint. Used in AI image generation workflows.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Model`: A dropdown to select the model checkpoint.

### CMSSyncNode
- **Description:** Synchronizes content with a Content Management System (CMS).
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `CMS Endpoint`: The URL of the CMS API.
  - `Authentication Token`: The token for authenticating with the CMS.

### CompetitorNode
- **Description:** A node for analyzing a competitor's brand. It includes fields for brand name, website, and notes.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Name`: The name of the competitor.
  - `Website`: The competitor's website URL.
  - `Notes`: A text area for notes about the competitor.

### ContentNode
- **Description:** A flexible node for adding various types of content, such as text, images, or links.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Content Type`: A dropdown to select the type of content (Text, Image, Link).
  - `Content`: The content itself (a text input, image upload, or URL input).

### EmitterNode
- **Description:** Emits a signal or data to connected nodes. Used to trigger actions or pass data through a workflow.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Data`: The data to be emitted. Can be a text input, a JSON editor, or a file upload.

### EncoderNode
- **Description:** Encodes data into a specific format. Used in AI image generation workflows.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Encoder Type`: A dropdown to select the type of encoder.

### EngineNode
- **Description:** Represents an AI generation engine, such as DALL-E or Midjourney.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Engine`: A dropdown to select the AI engine (e.g., DALL-E 3, Midjourney v6).

### GridSysNode
- **Description:** Defines a grid system for layout and composition.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Columns`: The number of columns in the grid.
  - `Rows`: The number of rows in the grid.
  - `Gap`: The space between grid items.

### IconsNode
- **Description:** A node for managing and displaying a set of icons.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Icon Set`: A dropdown to select the icon set (e.g., Font Awesome, Material Icons).
  - `Icons`: A list of icons to display, with the ability to add/remove icons.

### ImageNode
- **Description:** Upload and display an image.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `URL`: The URL of the image.
  - `Alt Text`: The alt text for the image.
  - `Display Mode`: A dropdown to select the display mode (e.g., Cover, Contain).

### KSamplerNode
- **Description:** A node for configuring the K-Sampler in an AI image generation workflow.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Seed`: The random seed for the sampler.
  - `Steps`: The number of sampling steps.
  - `CFG Scale`: The Classifier-Free Guidance scale.

### LabelNode
- **Description:** A simple text label.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Text`: The text content of the label.
  - `Font Size`: The font size of the label.
  - `Font Weight`: The font weight of the label.

### LogicNode
- **Description:** A node that performs a logical operation, such as an "IF" statement.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Condition`: The condition to be evaluated.
  - `True Output`: The data to be sent to the 'true' output.
  - `False Output`: The data to be sent to the 'false' output.

### MidjourneyNode
- **Description:** A dedicated node for interacting with the Midjourney API.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Prompt`: The text prompt to be sent to Midjourney.
  - `Parameters`: Additional parameters for the Midjourney API.

### ModelProfileNode
- **Description:** A node for defining the profile of an AI model, including its name, version, and other parameters.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Name`: The name of the model.
  - `Version`: The version of the model.
  - `Description`: A description of the model.

### MoodGaugeNode
- **Description:** A node for setting the mood of a brand on a sliding scale.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Value`: A slider to set the mood value (0-100).

### NegativeNode
- **Description:** Defines negative prompts for AI image generation.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Text`: A text area for the negative prompt.

### PaletteNode
- **Description:** A node for defining a color palette.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Colors`: A list of colors, with the ability to add, remove, and edit colors.

### ParagraphNode
- **Description:** A node for adding a block of text.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Text`: The text content of the paragraph.
  - `Font Size`: The font size of the paragraph.
  - `Line Height`: The line height of the paragraph.

### PresetNode
- **Description:** A node for saving and loading a preset configuration of other nodes.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Preset Name`: The name of the preset.
  - `Save Button`: A button to save the current node configuration as a preset.
  - `Load Button`: A button to load a saved preset.

### ReceiverNode
- **Description:** Receives a signal or data from connected nodes.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - (No settings)

### ReferenceNode
- **Description:** A node for adding a reference to an external resource, such as a URL or a file.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `URL`: The URL of the reference.
  - `Title`: The title of the reference.

### SectionNode
- **Description:** A container node for grouping other nodes.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Title`: The title of the section.

### SpotifyNode
- **Description:** A node for embedding a Spotify playlist or track.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `URL`: The URL of the Spotify playlist or track.

### SwitchNode
- **Description:** A switch that can be toggled on or off, controlling the flow of data or signals.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `On/Off`: A toggle switch to turn the node on or off.

### TextNode
- **Description:** A node for adding and editing text content.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Text`: The text content.
  - `Font Size`: The font size.
  - `Font Weight`: The font weight.
  - `Color`: The color of the text.

### TextureNode
- **Description:** A node for defining a texture or pattern.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Image URL`: The URL of the texture image.
  - `Opacity`: The opacity of the texture.

### TitleNode
- **Description:** A node for adding a title.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Text`: The text content of the title.
  - `Font Size`: The font size of the title.
  - `Font Weight`: The font weight of the title.
  - `Color`: The color of the title.

### ToneNode
- **Description:** A node for defining the tone of voice for a brand.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Tone`: A dropdown to select the tone of voice (e.g., Formal, Playful, Serious).

### TriggerNode
- **Description:** A button that can be manually triggered to start a workflow.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Label`: The text label for the button.

### TypographyNode
- **Description:** A node for defining the typography of a brand, including font, size, and weight.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Font Family`: The font family.
  - `Font Size`: The font size.
  - `Font Weight`: The font weight.
  - `Line Height`: The line height.
  - `Letter Spacing`: The letter spacing.

### VAENode
- **Description:** A node for configuring the VAE (Variational Autoencoder) in an AI image generation workflow.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `VAE`: A dropdown to select the VAE.

### WeatherNode
- **Description:** A node that displays the current weather for a given location.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `Location`: The location for which to display the weather.

### WebRefNode
- **Description:** A node for embedding a web page.
- **Inputs:** Top, Left
- **Outputs:** Right, Bottom
- **Settings Panel:**
  - `URL`: The URL of the web page to embed.
