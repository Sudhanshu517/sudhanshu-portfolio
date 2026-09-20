import { SITE_URL } from "@/data/profile"

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.7 },
  ]
}
