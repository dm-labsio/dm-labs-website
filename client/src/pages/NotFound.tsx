import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background">
      <div className="container text-center py-20">
        <p className="text-8xl font-bold text-primary/15 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>404</p>
        <h1 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-[oklch(0.52_0.19_264)] transition-colors"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
