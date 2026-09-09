export interface Testimonial {
  id: number;
  name: string;
  excerpt: string;
  full: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Verified Customer",
    excerpt:
      "Excellent service from start to finish. The medical bed was installed quickly and professionally, and the technician was knowledgeable...",
    full: "Excellent service from start to finish. The medical bed was installed quickly and professionally, and the technician was knowledgeable, careful, and courteous. They explained how to use the bed and made sure everything was working properly before leaving. Very satisfied with the installation and would highly recommend their service.",
    rating: 5,
  },
  {
    id: 2,
    name: "Verified Customer",
    excerpt:
      "Great experience with the medical bed rental service. The bed was delivered on time, clean, and in excellent working condition...",
    full: "Great experience with the medical bed rental service. The bed was delivered on time, clean, and in excellent working condition. The staff was friendly, professional, and very helpful throughout the process. Everything was explained clearly, and the rental process was smooth and stress-free. Highly recommend their service!",
    rating: 5,
  },
  {
    id: 3,
    name: "Verified Customer",
    excerpt:
      "Great service! The medical bed was delivered on time, and everything was smooth and easy. Very happy with the service.",
    full: "Great service! The medical bed was delivered on time, and everything was smooth and easy. Very happy with the service.",
    rating: 5,
  },
];
