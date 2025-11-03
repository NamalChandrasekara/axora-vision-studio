import { Zap, Shield, Users, Clock, Cpu, Award } from "lucide-react";

interface Advantage {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const advantages: Advantage[] = [
  {
    icon: Zap,
    title: "Rapid Development",
    description: "Fast prototyping and agile engineering processes to accelerate your time-to-market.",
    color: "from-cyan-400 to-blue-600"
  },
  {
    icon: Shield,
    title: "Expert Engineering Service",
    description: "Quality management systems certified to international standards for reliable delivery.",
    color: "from-blue-400 to-indigo-600"
  },
  {
    icon: Users,
    title: "Multidisciplinary Team",
    description: "Mechanical engineers, software developers, and IoT specialists working together.",
    color: "from-teal-400 to-cyan-600"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical support and monitoring for mission-critical systems.",
    color: "from-emerald-400 to-teal-600"
  },
  {
    icon: Cpu,
    title: "Smart Technology",
    description: "Cutting-edge IoT integration and automation for next-generation products.",
    color: "from-blue-400 to-cyan-600"
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Successfully delivered 200+ projects across manufacturing, automation, and IoT sectors.",
    color: "from-cyan-400 to-teal-600"
  }
];

const Advantages = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-accent">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            The Fonova Labs Advantage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by innovative companies and startups to bring breakthrough products to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-large transition-all duration-300 hover-lift border border-border"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} shadow-medium mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {advantage.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 h-1 w-0 bg-gradient-accent group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
