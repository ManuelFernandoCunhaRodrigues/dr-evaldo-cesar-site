import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // Atualize com o domínio oficial antes de publicar em produção.
    sitemap: "/sitemap.xml",
  };
}
