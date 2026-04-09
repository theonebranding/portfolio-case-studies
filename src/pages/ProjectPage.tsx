import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects, Project } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink, Share2, ZoomIn, ZoomOut, X } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Android } from "@/components/ui/android";
import ProjectGallery from "@/components/ProjectGallery"; 

const ProjectPage = () => {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // Find project by slug (which would be project.id or a formatted version of project.title)
    const foundProject = projects.find(p => 
      p.id.toString() === projectSlug || 
      p.title.toLowerCase().replace(/\s+/g, "-") === projectSlug
    );
    
    setProject(foundProject || null);
    setIsLoading(false);
  }, [projectSlug]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: `Check out this amazing project: ${project?.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Image viewer functions
  const openImageViewer = (imageSrc) => {
    setSelectedImage(imageSrc);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    document.body.style.overflow = 'auto';
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-yellow"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-brand-yellow mb-4">Project Not Found</h1>
        <p className="text-gray-300 mb-8">The project you're looking for doesn't exist or has been moved.</p>
        <Button onClick={handleGoBack} className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90">
          Return to Portfolio
        </Button>
      </div>
    );
  }

  const hasDesktopImages = (project.desktopImages?.length || 0) > 0;
  const hasMobileImages = (project.mobileImages?.length || 0) > 0;
  const isMobileOnlyProject = !hasDesktopImages && hasMobileImages;
  const heroImage = project.thumbnail || project.desktopImages?.[0] || project.mobileImages?.[0];

  return (
    <div className="min-h-screen bg-brand-black/95 min-w-full text-brand-white overflow-hidden">
      {/* Hero Section with Featured Image - Kept as is */}
      <div className="relative">
        <Button 
          onClick={handleGoBack}
          className="absolute top-8 left-8 z-20 bg-brand-black/80 hover:bg-brand-black border border-brand-yellow/90 text-brand-yellow rounded-full px-6 py-8"
        >
          <ChevronLeft size={40}/>
        </Button>
        
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-white">
                <span className="text-brand-white font-secondary">Featured Project</span> <br />
                <span className="text-4xl md:text-6xl font-bold mt-1 leading-none text-brand-yellow font-primary">
                  {project.title}
                </span>
              </h1>
            </>
          }
        >
          {isMobileOnlyProject ? (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black rounded-2xl">
              <Android
                src={project.mobileImages?.[0] || heroImage}
                style={{
                  maxWidth: "260px",
                  width: "70%",
                }}
              />
            </div>
          ) : (
            <img
              src={heroImage}
              alt={project.title}
              className="mx-auto rounded-2xl object-cover h-full w-full"
              draggable={false}
              loading="lazy"
            />
          )}
        </ContainerScroll>
      </div>
      
      {/* Case Study Content */}
      <div className="container mx-auto px-6 md:px-0 relative z-20 mt-12">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-2xl">
          {/* Title and Project Link Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <AnimatedText
                text={project.title}
                textClassName="text-4xl md:text-5xl font-bold mb-2 text-brand-yellow"
                underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
                underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
                underlineDuration={2}
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 flex items-center gap-2"
                onClick={handleShare}
              >
                <Share2 size={16} />
                Share
              </Button>
              
              {project?.url && (
                <Button 
                  className="bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 flex items-center gap-2"
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink size={16} />
                    Visit Project
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          {/* Case Study Layout */}
          <div className="space-y-12">
            {/* Description and Client Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Description */}
              <div className="lg:col-span-2">
                <h3 className="text-3xl font-semibold mb-3 text-brand-yellow border-b border-brand-yellow/30 pb-2 font-primary">
                  Project Description
                </h3>
                <p className="text-gray-300 leading-relaxed font-secondary">{project.description}</p>
              </div>
                
              {/* Client Details */}
              <div className="lg:col-span-1">
                <h3 className="text-3xl font-semibold mb-3 text-brand-yellow border-b border-brand-yellow/30 pb-2 font-primary">
                  Client Details
                </h3>
                <div className="space-y-2 text-gray-300 font-secondary">
                  <p><span className="font-medium font-tertiary">Client:</span> {project.client.name}</p>
                  <p><span className="font-medium font-tertiary">Industry:</span> {project.client.industry}</p>
                  <p><span className="font-medium font-tertiary">Location:</span> {project.client.country}</p>
                </div>
              </div>
            </div>
            
            {/* Problem Statement Section */}
            <div>
              <h3 className="text-3xl font-primary font-semibold mb-3 text-brand-yellow border-b border-brand-yellow/30 pb-2">
                Problem Statement
              </h3>
              <p className="text-gray-300 leading-relaxed font-secondary">
                {project.problem_statement || 
                "The client faced challenges with their existing systems that were affecting efficiency and growth. They needed a modern solution that would streamline their operations while providing a better experience for their users."}
              </p>
            </div>
            
            {/* Project Build - Features and Functions */}
            <div>
              <h3 className="text-3xl font-primary font-semibold mb-3 text-brand-yellow border-b border-brand-yellow/30 pb-2">
                Project Build
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Features */}
                <div>
                  <h4 className="text-lg font-medium mb-2 text-brand-yellow/90 font-primary">Key Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 font-secondary">
                    {project.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-medium mb-2 text-brand-yellow/90 font-primary">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 font-tertiary">
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
              </div>
            </div>
            
            {/* Project Results */}
            <div>
              <h3 className="text-3xl font-primary font-semibold mb-3 text-brand-yellow border-b border-brand-yellow/30 pb-2">
                Project Results
              </h3>
              <p className="text-gray-300 leading-relaxed font-secondary">
                {project.results || project.journey || 
                "The implemented solution successfully addressed the client's challenges, resulting in improved efficiency, better user experience, and positive business outcomes. The project helped streamline operations while providing a scalable platform for future growth."}
              </p>
            </div>
            
            {/* Project Gallery - Replaced with ProjectGallery component */}
            <div className="w-full">
              <ProjectGallery 
                images={project?.desktopImages || []} 
                mobileImages={project?.mobileImages || []}
                imagesAlt ={project?.imagesAlt || []}
                onImageClick={openImageViewer}
              />
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-brand-black/90 max-w-full mt-16 py-10 text-center">
          <h3 className="text-3xl font-bold text-brand-yellow mb-4 font-primary">Ready to start your own project?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-secondary">
            Let's collaborate to bring your vision to life with our expertise and creative approach.
          </p>
          <Button className="font-secondary bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 px-8 py-6 text-lg">
          <a href="/" onClick={(e) => {
              e.preventDefault();
              window.location.href = "/#contact";
            }}>
              Get in Touch
        </a>
          </Button>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            {/* Close button */}
            <button 
              onClick={closeImageViewer}
              className="absolute top-4 right-4 bg-brand-black/60 hover:bg-brand-black text-white p-2 rounded-full"
            >
              <X size={24} />
            </button>
            
            {/* Zoom controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button 
                onClick={handleZoomOut}
                className="bg-brand-black/60 hover:bg-brand-black text-white p-2 rounded-full disabled:opacity-50"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut size={24} />
              </button>
              <button 
                onClick={handleZoomIn}
                className="bg-brand-black/60 hover:bg-brand-black text-white p-2 rounded-full disabled:opacity-50"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn size={24} />
              </button>
            </div>
            
            {/* Image container with zoom */}
            <div 
              className="w-full h-full overflow-auto flex items-center justify-center"
              onClick={(e) => {
                // Close on click outside the image
                if (e.target === e.currentTarget) {
                  closeImageViewer();
                }
              }}
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.3s ease',
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain'
                }}
                className="cursor-move"

              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;