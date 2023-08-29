/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.gravatar.com",
      "i.pravatar.cc",
      "sinc-staging.s3.ap-northeast-1.amazonaws.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
