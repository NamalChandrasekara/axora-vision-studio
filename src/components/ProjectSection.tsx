import { useState, useEffect } from "react";
import { ProjectShowcase } from "./ProjectShowcase";

interface ProjectMedia {
  type: "image" | "video";
  url: string;
}

interface APIProject {
  _id: string;
  name: string;
  client: string;
  request: string;
  difficulties: string;
  thumbnail: string;
  media: ProjectMedia[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
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

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects/published");
        
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          // Transform API data to match ProjectShowcase interface
          const transformedProjects: Project[] = result.data.map((project: APIProject) => ({
            id: project._id,
            name: project.name,
            client: project.client,
            request: project.request,
            difficulties: project.difficulties,
            thumbnail: project.thumbnail,
            media: project.media || []
          }));
          
          setProjects(transformedProjects);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">Error loading projects: {error}</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">No projects available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful projects and see how we've helped clients achieve their goals.
          </p>
        </div>
      </div>
      <ProjectShowcase projects={projects} />
    </section>
  );
};