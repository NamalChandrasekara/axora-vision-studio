import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "David Kumar",
    role: "CTO",
    company: "TechFlow Manufacturing",
    content: "Fonova Labs developed our IoT-enabled production monitoring system from scratch. Their mechanical engineering and software integration expertise is unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Lisa Zhang",
    role: "Product Manager",
    company: "InnovateMed Devices",
    content: "The rapid prototyping service accelerated our medical device development by months. Their precision and quality control are exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Marcus Rodriguez",
    role: "Operations Director",
    company: "AutoParts Global",
    content: "Their ERP implementation and automation solutions transformed our manufacturing efficiency. Professional team that delivers real results.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Sarah Williams",
    role: "Founder & CEO",
    company: "SmartHome Innovations",
    content: "The IoT solutions from Fonova Labs brought our smart home products to market faster than we thought possible. Their technical expertise is outstanding.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    name: "James Chen",
    role: "Engineering Manager",
    company: "RoboTech Systems",
    content: "From mechanical design to embedded systems, Fonova Labs handled our robotics project end-to-end. The quality and attention to detail exceeded our expectations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Emma Thompson",
    role: "Product Director",
    company: "GreenEnergy Solutions",
    content: "Their automation systems improved our production efficiency by 40%. The team's expertise in both hardware and software integration is remarkable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-gradient-subtle overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear what our clients have to say about their experience working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-large transition-all duration-300 hover-lift border border-border group"
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-accent/20 group-hover:text-accent/40 transition-colors duration-300" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all duration-300">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
