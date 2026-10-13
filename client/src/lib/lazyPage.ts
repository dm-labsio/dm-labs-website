import {
  createElement,
  use,
  type ComponentType,
  type ReactElement,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LazyPage<P = any> = ((props: P) => ReactElement | null) & {
  /** Starts (or reuses) the download of this page's code. */
  preload: () => Promise<unknown>;
  /** True once the code is in memory, so the page renders without waiting. */
  isLoaded: () => boolean;
  /** Source module, e.g. "pages/Pricing"; keys page-chunks.json for prefetching. */
  key: string;
};

/**
 * A page whose code downloads on demand. Unlike React.lazy, a page that is
 * already loaded renders synchronously: the router only switches to a page
 * once `isLoaded()` is true, so visitors never see an empty placeholder.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyPage<P = any>(
  load: () => Promise<{ default: unknown }>,
  key: string
): LazyPage<P> {
  let Loaded: ComponentType<object> | null = null;
  let pending: Promise<unknown> | null = null;
  const preload = () =>
    (pending ??= load().then(
      module => {
        Loaded = module.default as ComponentType<object>;
      },
      error => {
        // Allow a retry, e.g. after a dropped mobile connection.
        pending = null;
        throw error;
      }
    ));
  const Page = ((props: P) => {
    if (Loaded) return createElement(Loaded, props as object);
    use(preload());
    return Loaded ? createElement(Loaded, props as object) : null;
  }) as LazyPage<P>;
  Page.preload = preload;
  Page.isLoaded = () => Loaded !== null;
  Page.key = key;
  return Page;
}
