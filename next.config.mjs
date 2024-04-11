/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is just a redirect for this example to a mock job detail page
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/jobs/3vv02mts",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
