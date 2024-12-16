/** @type {import('next').NextConfig} */
const nextConfig = {
  // Defined this env only for local testing
  env: {
    RETURN_MOCK: process.env.RETURN_MOCK,
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
