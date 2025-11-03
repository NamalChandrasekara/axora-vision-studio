import { useState } from "react";
import { Cog, Wrench, Cpu, Database, Workflow } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Mechanical Engineering",
    description: "Complete mechanical design, CAD modeling, and engineering analysis for innovative product development. From concept to manufacturing-ready designs.",
    icon: Cog,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Rapid Prototyping",
    description: "Fast-track your product development with 3D printing, CNC machining, and prototype fabrication services. From initial concept to functional prototype in days.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "IoT Solutions",
    description: "Smart device integration, sensor networks, and connected systems for Industry 4.0 applications. Real-time monitoring and data-driven decision making.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "ERP Systems",
    description: "Custom ERP implementation and integration to streamline manufacturing and business operations. Optimize workflow and boost productivity.",
    icon: Database,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Automation & Controls",
    description: "Industrial automation, PLC programming, and process control systems for manufacturing efficiency. Reduce costs and increase output quality.",
    icon: Workflow,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
  }
];

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Advanced Engineering & Technology Solutions
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            From mechanical prototypes to smart IoT systems, we deliver cutting-edge engineering excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredService === service.id;

            return (
              <div
                key={service.id}
                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover-lift cursor-pointer"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Background image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isHovered ? 'scale-110 opacity-30' : 'scale-100 opacity-20'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-accent shadow-glow mb-6 transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className={`text-white/70 leading-relaxed transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0 max-h-0'
                  }`}>
                    {service.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
