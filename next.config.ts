import type { NextConfig } from "next";
import { EMBED_FRAME_SRC } from "./lib/demo";

// Vercel Analytics / Speed Insights are proxied through the site's own origin
// in production (/_vercel/insights/..., /_vercel/speed-insights/...), which
// 'self' already covers. The two vercel-scripts.com / vercel-insights.com
// hosts are only needed as the library's fallback when that proxy isn't
// available (e.g. running outside Vercel, as in local dev) — per Vercel's
// own guidance for a self-hosted CSP.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' ws: wss: https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  `frame-src ${EMBED_FRAME_SRC}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'none'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
    ];
  },
};

export default nextConfig;