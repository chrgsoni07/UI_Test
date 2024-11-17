/** @type {import('next').NextConfig} */
const nextConfig = {
  // Defined this env only for local testing
  env: {
    RETURN_MOCK: process.env.RETURN_MOCK,
  },
};

export default nextConfig;
