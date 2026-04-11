import { memo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Project } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageGrid = memo(({ images, title }: { images: string[]; title: string }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.slice(1, 10).map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${title} screenshot ${index + 2}`}
          className="w-full h-24 object-cover rounded-md"
          loading="lazy"
        />
      ))}
    </div>
  );
});

const ProjectModal = memo(({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-brand-black border-brand-yellow text-brand-white max-w-5xl w-[90vw] max-h-[80vh] overflow-y-auto transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-brand-yellow">{project.title}</h3>          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            

            {project.images?.length > 0 && (
              <div className="mb-6 overflow-hidden rounded-md">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-auto object-cover rounded-md"
                  loading="lazy"
                />
              </div>
            )}

            <ImageGrid images={project.images} title={project.title} />
          </div>

          <div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-brand-yellow">Project Link</h4>
              {project?.url && (
              <Button variant="secondary" className="w-full">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit Project
                </a>
              </Button>
            )}
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-brand-yellow">Description</h4>
              <p className="text-gray-300">{project.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-brand-yellow">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {project.features?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-brand-yellow">Features and Functions</h4>
              <div className="flex flex-wrap gap-2">
                {project.features?.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            )}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-brand-yellow">Client</h4>
              <p className="text-gray-300">
                <span className="font-medium">{project.client.name}</span>
                <br />
                <span className="text-base text-gray-200">
                  Industry: {project.client.industry}
                </span>
                <br />
                <span className="text-base text-gray-200">
                  Location: {project.client?.country}
                </span>
                <br />
              </p>
            </div>
         
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-brand-yellow">Project Journey</h4>
              <p className="text-gray-300 text-sm">{project.journey}</p>
            </div>

           
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default ProjectModal;
