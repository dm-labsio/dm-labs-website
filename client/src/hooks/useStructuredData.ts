import { useEffect } from "react";

/** Own one script per page, including when mounting over a static snapshot. */
export function useStructuredData(id: string, schema: unknown) {
  const json = schema ? JSON.stringify(schema).replace(/</g, "\\u003c") : null;
  useEffect(() => {
    document.getElementById(id)?.remove();
    if (!json) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = json;
    document.head.appendChild(script);
    return () => script.remove();
  }, [id, json]);
}
