import React from "react";

/** Exact outlined assets from the supplied DM Labs logo suite. Never mirrored. */
export default function BrandLogo({ full = false }: { full?: boolean }) {
  return <img
    src={full ? "/brand/v1/dm-labs-horizontal-glass-dark.svg" : "/brand/v1/dm-labs-horizontal-small-flat-dark.svg"}
    alt="DM-labs.io" width="200" height="40"
    className="brand-logo" decoding="async"
  />;
}
