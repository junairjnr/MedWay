import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.vitalmobility.ca", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/rentals/hospital-beds", destination: "/rentals/hospital-bed-rental", permanent: true },
      { source: "/rentals/mobility-scooters", destination: "/rentals/mobility-scooter-rental", permanent: true },
      { source: "/rentals/patient-lifts", destination: "/rentals/patient-lift-rental", permanent: true },
      { source: "/rentals/wheelchairs", destination: "/rentals/wheelchair-rental", permanent: true },
    ];
  },
};

export default nextConfig;
