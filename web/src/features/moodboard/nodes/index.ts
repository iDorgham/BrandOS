export * from './ImageNode';
export * from './TextNode';
export * from './TitleNode';
export * from './ParagraphNode';
export * from './TypographyNode';
export * from './GridSysNode';
export * from './ToneNode';
export * from './CompetitorNode';
export * from './MoodGaugeNode';
export * from './IconsNode';
export * from './ReferenceNode';
export * from './AttributeNode';
export * from './LogicNode';
export * from './PresetNode';
export * from './PaletteNode';
export * from './TextureNode';
export * from './NegativeNode';
export * from './WeatherNode';
export * from './SpotifyNode';
export * from './WebRefNode';
export * from './MidjourneyNode';
export * from './CMSSyncNode';
export * from './LabelNode';
export * from './SectionNode';
export * from './GroupNode';
export * from './TriggerNode';
export * from './EngineNode';
export * from './SwitchNode';
export * from './ReceiverNode';
export * from './EncoderNode';
export * from './ModelProfileNode';
export * from './EmitterNode';
export * from './ContentNode';
export * from './KSamplerNode';
export * from './CheckpointNode';
export * from './VAENode';
export * from './ContentGenNode';
export * from './HeadlineGenNode';
export * from './SEOOptimizerNode';
export * from './HashtagGenNode';
export * from './ContentRewriterNode';
export * from './SocialPosterNode';
export * from './SchedulerNode';
export * from './StoryCreatorNode';
export * from './EmailSenderNode';
export * from './WebhookNode';
export * from './APIRequestNode';
export * from './GoogleSheetNode';
export * from './SlackNode';
export * from './TelegramNode';
export * from './WhatsAppNode';
export * from './ResearchNode';
export * from './ContentPlanNode';
export * from './MetaAdsNode';
export * from './GoogleAdsNode';

import { ImageNode } from './ImageNode';
import { TextNode } from './TextNode';
import { TitleNode } from './TitleNode';
import { ParagraphNode } from './ParagraphNode';
import { TypographyNode } from './TypographyNode';
import { GridSysNode } from './GridSysNode';
import { ToneNode } from './ToneNode';
import { CompetitorNode } from './CompetitorNode';
import { MoodGaugeNode } from './MoodGaugeNode';
import { IconsNode } from './IconsNode';
import { ReferenceNode } from './ReferenceNode';
import { AttributeNode } from './AttributeNode';
import { LogicNode } from './LogicNode';
import { PresetNode } from './PresetNode';
import { PaletteNode } from './PaletteNode';
import { TextureNode } from './TextureNode';
import { NegativeNode } from './NegativeNode';
import { WeatherNode } from './WeatherNode';
import { SpotifyNode } from './SpotifyNode';
import { WebRefNode } from './WebRefNode';
import { MidjourneyNode } from './MidjourneyNode';
import { CMSSyncNode } from './CMSSyncNode';
import { LabelNode } from './LabelNode';
import { SectionNode } from './SectionNode';
import { TriggerNode } from './TriggerNode';
import { EngineNode } from './EngineNode';
import { SwitchNode } from './SwitchNode';
import { ReceiverNode } from './ReceiverNode';
import { EncoderNode } from './EncoderNode';
import { ModelProfileNode } from './ModelProfileNode';
import { EmitterNode } from './EmitterNode';
import { ContentNode } from './ContentNode';
import { KSamplerNode } from './KSamplerNode';
import { CheckpointNode } from './CheckpointNode';
import { VAENode } from './VAENode';
import { ContentGenNode } from './ContentGenNode';
import { HeadlineGenNode } from './HeadlineGenNode';
import { SEOOptimizerNode } from './SEOOptimizerNode';
import { HashtagGenNode } from './HashtagGenNode';
import { ContentRewriterNode } from './ContentRewriterNode';
import { SocialPosterNode } from './SocialPosterNode';
import { SchedulerNode } from './SchedulerNode';
import { StoryCreatorNode } from './StoryCreatorNode';
import { EmailSenderNode } from './EmailSenderNode';
import { WebhookNode } from './WebhookNode';
import { APIRequestNode } from './APIRequestNode';
import { GoogleSheetNode } from './GoogleSheetNode';
import { SlackNode } from './SlackNode';
import { TelegramNode } from './TelegramNode';
import { WhatsAppNode } from './WhatsAppNode';
import { GroupNode } from './GroupNode';
import { ResearchNode } from './ResearchNode';
import { ContentPlanNode } from './ContentPlanNode';
import { MetaAdsNode } from './MetaAdsNode';
import { GoogleAdsNode } from './GoogleAdsNode';
import { ShapeNode } from './ShapeNode';

export const nodeTypes = {
    image: ImageNode,
    text: TextNode,
    title: TitleNode,
    paragraph: ParagraphNode,
    typography: TypographyNode,
    grid: GridSysNode,
    tone: ToneNode,
    competitor: CompetitorNode,
    mood_gauge: MoodGaugeNode,
    icons: IconsNode,
    reference: ReferenceNode,
    attribute: AttributeNode,
    logic: LogicNode,
    preset: PresetNode,
    palette: PaletteNode,
    texture: TextureNode,
    negative: NegativeNode,
    weather: WeatherNode,
    spotify: SpotifyNode,
    web_ref: WebRefNode,
    midjourney: MidjourneyNode,
    cms_sync: CMSSyncNode,
    label: LabelNode,
    section: SectionNode,
    groupNode: GroupNode,
    trigger: TriggerNode,
    engine: EngineNode,
    switch: SwitchNode,
    receiver: ReceiverNode,
    encoder: EncoderNode,
    model_profile: ModelProfileNode,
    emitter: EmitterNode,
    content: ContentNode,
    ksampler: KSamplerNode,
    checkpoint: CheckpointNode,
    vae: VAENode,
    content_gen: ContentGenNode,
    headline_gen: HeadlineGenNode,
    seo_optimizer: SEOOptimizerNode,
    hashtag_gen: HashtagGenNode,
    content_rewriter: ContentRewriterNode,
    social_poster: SocialPosterNode,
    scheduler: SchedulerNode,
    story_creator: StoryCreatorNode,
    email_sender: EmailSenderNode,
    webhook: WebhookNode,
    api_request: APIRequestNode,
    google_sheet: GoogleSheetNode,
    slack: SlackNode,
    telegram: TelegramNode,
    whatsapp: WhatsAppNode,
    research: ResearchNode,
    content_plan: ContentPlanNode,
    meta_ads: MetaAdsNode,
    google_ads: GoogleAdsNode,
    // Shape Nodes
    square: ShapeNode,
    circle: ShapeNode,
    triangle: ShapeNode,
    hexagon: ShapeNode,
};
