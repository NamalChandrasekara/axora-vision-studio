import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectMedia {
  type: "image" | "video";
  url: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  request: string;
  difficulties: string;
  thumbnail: string;
  media: ProjectMedia[];
}

interface ProjectShowcaseProps {
  projects: Project[];
}

export const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex gap-6 h-screen p-6 bg-background">
        {/* Main Featured Project */}
        <div className="flex-1 relative rounded-lg overflow-hidden bg-card shadow-medium">
          {projects[0] && (
            <div
              onClick={() => handleProjectClick(projects[0])}
              className="w-full h-full cursor-pointer group relative"
            >
              <img
                src={projects[0].thumbnail}
                alt={projects[0].name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-8">
                <h2 className="text-4xl font-bold text-primary-foreground mb-2">
                  {projects[0].name}
                </h2>
                <p className="text-xl text-primary-foreground/90">{projects[0].client}</p>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Project List */}
        <div className="w-80">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {projects.slice(1).map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  client={project.client}
                  thumbnail={project.thumbnail}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        project={selectedProject}
      />
    </>
  );
};
