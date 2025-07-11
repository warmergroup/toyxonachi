export default defineEventHandler(async (event) => {
  // useRuntimeConfig o'rniga process.env ishlating
  const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'https://toyxonachi.uz/api'
  
  try {
    const response = await $fetch('/wedding-halls/all', {
      baseURL: apiUrl
    }) as any
    
    const toyxonalar = response.data || response || []
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://toyxonachi.uz/</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://toyxonachi.uz/toyxonalar</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        ${toyxonalar.map((toyxona: any) => `
        <url>
            <loc>https://toyxonachi.uz/toyxona/${toyxona.id}</loc>
            <lastmod>${toyxona.updated_at || new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        `).join('')}
        </urlset>`
    
    setHeader(event, 'Content-Type', 'application/xml')
    return sitemap
    
  } catch (error) {
    console.error('Sitemap error:', error)
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://toyxonachi.uz/</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        </urlset>`
  }
})
