// Mock testimonial data for Paula Wilson Realty

export const testimonials = [
  {
    id: 1,
    name: "Sarah & Mike Johnson",
    location: "Oklahoma City, OK",
    rating: 5,
    date: "2024-01-15",
    text: "Paula made our home buying experience absolutely wonderful! As first-time buyers, we had so many questions, and she patiently walked us through every step of the process. Her bilingual skills were incredibly helpful for my Spanish-speaking parents. We found our dream home in just 3 weeks!",
    propertyAddress: "1234 Oak Tree Lane, Oklahoma City, OK",
    avatar: "/images/testimonials/sarah-mike.jpg",
    featured: true
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    location: "Edmond, OK",
    rating: 5,
    date: "2023-12-08",
    text: "¡Paula es increíble! She helped me sell my home and buy a new one simultaneously. Her knowledge of the Oklahoma City market is outstanding, and she was always available to answer my calls. The entire process was smooth and stress-free. Highly recommend!",
    propertyAddress: "5678 Maple Street, Edmond, OK",
    avatar: "/images/testimonials/maria.jpg",
    featured: true
  },
  {
    id: 3,
    name: "David Thompson",
    location: "Norman, OK",
    rating: 5,
    date: "2023-11-22",
    text: "Paula went above and beyond to help us find the perfect home for our growing family. She understood exactly what we were looking for and showed us properties that matched our criteria perfectly. Her negotiation skills saved us thousands of dollars!",
    propertyAddress: "9012 Pine Ridge Drive, Norman, OK",
    avatar: "/images/testimonials/david.jpg",
    featured: false
  },
  {
    id: 4,
    name: "Jennifer & Carlos Martinez",
    location: "Moore, OK",
    rating: 5,
    date: "2023-10-30",
    text: "We cannot thank Paula enough for helping us sell our home so quickly! She priced it perfectly and had multiple offers within the first week. Her marketing strategy and professional photography made our home stand out. Paula truly cares about her clients.",
    propertyAddress: "3456 Willow Creek Court, Moore, OK",
    avatar: "/images/testimonials/jennifer-carlos.jpg",
    featured: true
  },
  {
    id: 5,
    name: "Robert Kim",
    location: "Yukon, OK",
    rating: 5,
    date: "2023-09-18",
    text: "As a military family, we've worked with many realtors across the country. Paula is by far the best we've encountered. She made our relocation to Oklahoma seamless and helped us find a home that checked all our boxes. Professional, knowledgeable, and genuinely caring.",
    propertyAddress: "7890 Sunset Boulevard, Yukon, OK",
    avatar: "/images/testimonials/robert.jpg",
    featured: false
  },
  {
    id: 6,
    name: "Lisa & James Wilson",
    location: "Mustang, OK",
    rating: 5,
    date: "2023-08-25",
    text: "Paula helped us navigate the competitive new construction market in Mustang. She was always one step ahead, keeping us informed about new developments and helping us secure our dream home before it even hit the market. Her expertise is unmatched!",
    propertyAddress: "2468 Heritage Lane, Mustang, OK",
    avatar: "/images/testimonials/lisa-james.jpg",
    featured: false
  },
  {
    id: 7,
    name: "Amanda Garcia",
    location: "Oklahoma City, OK",
    rating: 5,
    date: "2023-07-12",
    text: "Paula's attention to detail and commitment to her clients is remarkable. She helped me through a difficult divorce situation and made sure I got the best possible outcome. Her compassion and professionalism during a tough time meant everything to me.",
    avatar: "/images/testimonials/amanda.jpg",
    featured: false
  },
  {
    id: 8,
    name: "Michael & Susan Brown",
    location: "Edmond, OK",
    rating: 5,
    date: "2023-06-05",
    text: "We've bought and sold several homes over the years, but working with Paula was our best experience yet. She's incredibly responsive, always available when we needed her, and her market knowledge helped us make informed decisions. We'll definitely use her again!",
    avatar: "/images/testimonials/michael-susan.jpg",
    featured: true
  },
  {
    id: 9,
    name: "Patricia Hernandez",
    location: "Norman, OK",
    rating: 5,
    date: "2023-05-20",
    text: "Paula me ayudó a comprar mi primera casa y fue una experiencia maravillosa. She explained everything in both English and Spanish, making sure I understood every document. Her patience and expertise made what could have been overwhelming feel manageable.",
    avatar: "/images/testimonials/patricia.jpg",
    featured: false
  },
  {
    id: 10,
    name: "Kevin & Rachel Davis",
    location: "Moore, OK",
    rating: 5,
    date: "2023-04-15",
    text: "Paula sold our home in just 5 days! Her marketing strategy was incredible - professional photos, virtual tour, and strategic pricing. She kept us informed throughout the entire process and made sure we got top dollar for our property. Amazing service!",
    avatar: "/images/testimonials/kevin-rachel.jpg",
    featured: false
  }
];

export const getFeaturedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.featured);
};

export const getTestimonialById = (id) => {
  return testimonials.find(testimonial => testimonial.id === parseInt(id));
};

export const getRecentTestimonials = (limit = 6) => {
  return testimonials
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};
