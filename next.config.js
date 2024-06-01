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
    loader: "imgix",
    path: "",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
