import { Diagram } from '@zyplux/ui/diagram';
import { DiagramNode, LoopRing, PhaseCaption, ResolveBadge, SpokeLine } from '@zyplux/ui/diagram';

const RESOLVE_DELAY_MS = 1800;

const NODE_POSITIONS = [
  { x: 280, y: 50 },
  { x: 430, y: 200 },
  { x: 280, y: 350 },
  { x: 130, y: 200 },
];

export type SystemMapContent = {
  badge: string;
  captionPending: string;
  captionResolved: string;
  figcaption: string;
  nodes: { label: string; snag?: boolean | undefined }[];
};

export const SystemMap = ({ content }: { content: SystemMapContent }) => (
  <Diagram caption={content.figcaption} resolveDelayMs={RESOLVE_DELAY_MS} viewBox='0 0 560 400'>
    <LoopRing cx={280} cy={200} r={150} />
    <SpokeLine x1={280} x2={280} y1={200} y2={350} />
    {content.nodes.map((node, index) => {
      const position = NODE_POSITIONS[index];
      if (!position) {
        throw new Error(`system map has no position for node ${node.label}`);
      }
      return <DiagramNode key={node.label} label={node.label} snag={node.snag} x={position.x} y={position.y} />;
    })}
    <PhaseCaption pending={content.captionPending} resolved={content.captionResolved} x={280} y={392} />
    <ResolveBadge label={content.badge} x={280} y={200} />
  </Diagram>
);
