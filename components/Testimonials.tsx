import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Kanishk Kumar",
      designation: "Product Manager at TechFlow",
      src: "/images/LoginPage.png",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Sarvad Dandge",
      designation: "CTO at InnovateSphere",
      src: "/images/Hero.png",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Satyajit Borade",
      designation: "Operations Director at CloudScale",
      src: "/images/Logo.png",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
