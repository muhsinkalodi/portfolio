import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual domain when you connect a custom domain on Netlify
  const baseUrl = 'https://muhsinkalodi.netlify.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
