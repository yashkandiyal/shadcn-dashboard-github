/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: true, // This makes it a permanent redirect (HTTP 308)
      },
    ];
  },
};

module.exports = nextConfig
