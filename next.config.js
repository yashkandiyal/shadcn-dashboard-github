/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["api.dicebear.com"],
    dangerouslyAllowSVG: true,
  },
  
};

module.exports = nextConfig;
