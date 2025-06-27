/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // If you plan to export static HTML, uncomment the following:
  // output: 'export',
  // trailingSlash: true, // Optional: if your static host prefers trailing slashes
  // Optional: if you need to serve images from a subdirectory in static export
  // images: {
  //   unoptimized: true,
  // },
};

export default nextConfig;
