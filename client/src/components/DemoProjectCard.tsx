import DemoPreviewArtwork from "./DemoPreviewArtwork";

interface DemoProjectCardProps {
  id: string;
  name: string;
  tagline: string;
  actionLabel: string;
  onClick: () => void;
}

export default function DemoProjectCard({
  id,
  name,
  tagline,
  actionLabel,
  onClick,
}: DemoProjectCardProps) {
  return (
    <article className="demo-project-card" data-demo-card={id}>
      <DemoPreviewArtwork id={id} />
      <div className="demo-project-caption">
        <div>
          <h3 className="text-lg templates-editorial-card-title">{name}</h3>
          <p>{tagline}</p>
        </div>
        <button
          className="demo-project-action"
          onClick={onClick}
          aria-label={`${actionLabel}: ${name}`}
        >
          {actionLabel}
        </button>
      </div>
    </article>
  );
}
