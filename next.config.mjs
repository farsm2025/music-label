const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/blog_studio.html', destination: '/news/studio', permanent: true },
      { source: '/blog_video.html', destination: '/news/video', permanent: true },
      { source: '/blog_tour.html', destination: '/news/tour', permanent: true },
      { source: '/web.html', destination: '/credits', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
    ];
  },
};
export default nextConfig;
