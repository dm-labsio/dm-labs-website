import type { IncomingMessage, ServerResponse } from "node:http";
import { currencyForCountry } from "../shared/currency.js";

/** Vercel supplies country from the request IP. No IP is returned or stored. */
export default function visitorCurrency(request: IncomingMessage, response: ServerResponse) {
  response.setHeader("Cache-Control", "private, no-store");
  response.setHeader("Vercel-CDN-Cache-Control", "no-store");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Robots-Tag", "noindex");
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    response.statusCode = 405;
    response.end();
    return;
  }
  const currency = currencyForCountry(request.headers["x-vercel-ip-country"]);
  response.end(request.method === "HEAD" ? undefined : JSON.stringify({ currency }));
}
