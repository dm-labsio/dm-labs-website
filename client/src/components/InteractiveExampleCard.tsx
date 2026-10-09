import DemoPreviewArtwork from "./DemoPreviewArtwork";
export interface InteractiveExampleCardProps {
  demoId: string;
  title: string;
  subtitle: string;
  href: string;
  actionText: string;
}
export default function InteractiveExampleCard({
  demoId,
  title,
  subtitle,
  href,
  actionText,
}: InteractiveExampleCardProps) {
  return (
    <div className="demo-home-card w-full">
      <a
        href={href}
        className="demo-home-link"
        aria-label={`${actionText}: ${title}`}
      >
        <DemoPreviewArtwork id={demoId} />
        <span className="demo-home-caption">
          <span>
            <span className="demo-home-title">{title}</span>
            <span className="demo-home-subtitle">{subtitle}</span>
          </span>
          <span className="demo-home-action">{actionText}</span>
        </span>
      </a>
    </div>
  );
}
