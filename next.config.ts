import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //images:{path:"/"}
  images: {
    domains: ['images.unsplash.com'],
    
  },
  typescript: {
        ignoreBuildErrors: true,
      },

};

export default nextConfig;
