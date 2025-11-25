import { Card } from "@/components/ui/card";

interface ProjectCardProps {
  id: string;
  name: string;
  client: string;
  thumbnail: string;
  onClick: () => void;
}

export const ProjectCard = ({ name, client, thumbnail, onClick }: ProjectCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden bg-card hover:shadow-large transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{client}</p>
      </div>
    </Card>
  );
};
