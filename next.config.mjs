/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images here are small, already-compressed screenshots of real campaign work.
  // Disabling the optimizer keeps `npm install` light (no sharp requirement) and
  // means the project also exports cleanly to static hosting.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
