import { DollarSign, Shield, Users, Clock, MapPin, Award } from "lucide-react";

interface Advantage {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const advantages: Advantage[] = [
  {
    icon: DollarSign,
    title: "Cost Savings",
    description: "Up to 50% lower cost compared to hiring locally — without compromising quality or precision.",
    color: "from-green-400 to-emerald-600"
  },
  {
    icon: Shield,
    title: "Australian Standards",
    description: "All drawings and models are fully compliant with Australian codes and industry regulations.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced drafters, modelers, and engineers dedicated to delivering exceptional results.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Quick delivery timelines to keep your projects on track — with zero sacrifice to accuracy.",
    color: "from-orange-400 to-red-600"
  },
  {
    icon: MapPin,
    title: "On-Site Availability",
    description: "Option for on-site engineers in Melbourne for seamless project coordination.",
    color: "from-pink-400 to-rose-600"
  },
  {
    icon: Award,
    title: "Uncompromised Quality",
    description: "Every project undergoes rigorous quality checks to ensure accuracy and excellence.",
    color: "from-yellow-400 to-amber-600"
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
            The Axora Engineering Advantage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Why leading architects, builders, and developers trust us with their most critical projects.
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
