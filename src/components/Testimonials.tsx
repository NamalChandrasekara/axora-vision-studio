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
    name: "Sarah Mitchell",
    role: "Principal Architect",
    company: "Mitchell & Associates",
    content: "Axora Engineering transformed our workflow completely. Their attention to detail and compliance with Australian standards gave us complete confidence in every deliverable. The 50% cost savings didn't hurt either!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "David Chen",
    role: "Construction Manager",
    company: "BuildPro Constructions",
    content: "The turnaround time is exceptional. What used to take weeks now takes days, and the quality is consistently outstanding. Their structural analysis using ETABS saved us from potential issues on our last project.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Emma Robertson",
    role: "Development Director",
    company: "Urban Developments Ltd",
    content: "The 3D renderings and walkthroughs helped us secure investor buy-in faster than ever. The visual quality is photorealistic, and the team was incredibly responsive to our feedback throughout the process.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    name: "Michael Thompson",
    role: "Senior Engineer",
    company: "Thompson Engineering Group",
    content: "Working with Axora has been a game-changer. Their expertise with STAAD.Pro and comprehensive BOQ services streamlined our entire project planning phase. Highly professional and technically excellent.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Lisa Anderson",
    role: "Project Manager",
    company: "Anderson Property Group",
    content: "The on-site engineering support in Melbourne was invaluable. Having experts who understand both international best practices and local Australian requirements made coordination seamless.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
  },
  {
    name: "James Wilson",
    role: "Design Principal",
    company: "Wilson Architecture Studio",
    content: "From initial CAD drafts to final Revit models, every deliverable exceeded expectations. The team's dedication to quality and their rigorous checking process gives us peace of mind on every project.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
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
