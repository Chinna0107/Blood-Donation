export const generateSitemap = () => {
  const baseUrl = 'https://hk-blood-donation.vercel.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/donor', priority: '0.9', changefreq: 'weekly' },
    { url: '/acceptor', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/mission', priority: '0.7', changefreq: 'monthly' },
    { url: '/donor-guidelines', priority: '0.8', changefreq: 'monthly' },
    { url: '/acceptor-guidelines', priority: '0.8', changefreq: 'monthly' },
    { url: '/login', priority: '0.6', changefreq: 'monthly' },
    { url: '/signup', priority: '0.6', changefreq: 'monthly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};
