import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MacbookPro } from "@/components/ui/macbook-pro";
import { MobileFrame } from "@/components/ui/mobile-frame";
import { Button } from "@/components/ui/button";

type ProjectGalleryProps = {
  images?: string[];
  mobileImages?: string[];
  imagesAlt?: string[];
  onImageClick?: ((imageSrc: string) => void) | null;
};

const ProjectGallery = ({ images = [], mobileImages = [], imagesAlt = [], onImageClick = null }: ProjectGalleryProps) => {
  const desktopImages = images || [];
  const phoneImages = mobileImages || [];
  const galleryImages = desktopImages.length > 0 ? desktopImages : phoneImages;
  const isMobileOnlyProject = desktopImages.length === 0 && phoneImages.length > 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDesktopImage, setSelectedDesktopImage] = useState(galleryImages.length > 0 ? galleryImages[0] : null);
  const [screenTitle, setScreenTitle] = useState(imagesAlt?.length > 0 ? imagesAlt[0] : "Project Screen 1");
  const [selectedMobileImage, setSelectedMobileImage] = useState(phoneImages.length > 0 ? phoneImages[0] : galleryImages[0] || null);
  const [isPaused, setIsPaused] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
    setRotation(0);
    setSelectedDesktopImage(galleryImages.length > 0 ? galleryImages[0] : null);
    setSelectedMobileImage(phoneImages.length > 0 ? phoneImages[0] : galleryImages[0] || null);
    setScreenTitle(imagesAlt.length > 0 ? imagesAlt[0] : "Project Screen 1");
  }, [galleryImages, phoneImages, imagesAlt]);

  // Responsive states
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Throttled rotate function for performance
  const throttledRotate = useRef(null);
  useEffect(() => {
    if (carouselRef.current) {
      const handleMouseMove = (e) => {
        if (isPaused || isAnimating) return;
        
        if (!throttledRotate.current) {
          throttledRotate.current = setTimeout(() => {
            const rect = carouselRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const mouseX = e.clientX;
            const distanceFromCenter = mouseX - centerX;
            
            // Subtle rotation based on mouse position
            const rotationOffset = distanceFromCenter / 50;
            setRotation((currentIndex * 360) / galleryImages.length - rotationOffset);
            
            throttledRotate.current = null;
          }, 30);
        }
      };
      
      carouselRef.current.addEventListener('mousemove', handleMouseMove);
      return () => {
        if (carouselRef.current) {
          carouselRef.current.removeEventListener('mousemove', handleMouseMove);
        }
        if (throttledRotate.current) {
          clearTimeout(throttledRotate.current);
        }
      };
    }
  }, [currentIndex, isPaused, isAnimating, galleryImages.length]);

  // Auto rotate carousel every 4 seconds
  useEffect(() => {
    if (!isPaused && galleryImages.length > 0) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % galleryImages.length;
          setRotation((newIndex * 360) / galleryImages.length);
          setSelectedDesktopImage(galleryImages[newIndex]);
          setSelectedMobileImage(phoneImages[newIndex] || galleryImages[newIndex]);
          setScreenTitle(imagesAlt[newIndex] || `Project Screen ${newIndex + 1}`);
          return newIndex;
        });
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [galleryImages, phoneImages, imagesAlt, isPaused]);

  const handlePrev = () => {
    if (galleryImages.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setRotation((newIndex * 360) / galleryImages.length);
    setSelectedDesktopImage(galleryImages[newIndex]);
    setSelectedMobileImage(phoneImages[newIndex] || galleryImages[newIndex]);
    setScreenTitle(imagesAlt[newIndex] || `Project Screen ${newIndex + 1}`);
    setIsPaused(true);
    
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setIsPaused(false), 4000);
    }, 500);
  };

  const handleNext = () => {
    if (galleryImages.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
    setRotation((newIndex * 360) / galleryImages.length);
    setSelectedDesktopImage(galleryImages[newIndex]);
    setSelectedMobileImage(phoneImages[newIndex] || galleryImages[newIndex]);
    setScreenTitle(imagesAlt[newIndex] || `Project Screen ${newIndex + 1}`);
    setIsPaused(true);
    
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setIsPaused(false), 4000);
    }, 500);
  };

  const handleThumbnailClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    setRotation((index * 360) / galleryImages.length);
    setSelectedDesktopImage(galleryImages[index]);
    setSelectedMobileImage(phoneImages[index] || galleryImages[index]);
    setScreenTitle(imagesAlt[index] || `Project Screen ${index + 1}`);
    setIsPaused(true);
    
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setIsPaused(false), 4000);
    }, 500);

    if (onImageClick && typeof onImageClick === 'function') {
      onImageClick(galleryImages[index]);
    }
  };

  // Calculate radius based on screen size
  const getRadius = () => {
    if (isMobile) return 300;
    if (isTablet) return 400;
    return 515;
  };

  // Calculate device sizes based on screen size
  const getDeviceSizes = () => {
    if (isMobile) {
      return {
        macbook: { maxWidth: "100%", width: "100%" },
        android: { maxWidth: "56px", width: "100%", top: "-80px", right: "-8px" }
      };
    }
    if (isTablet) {
      return {
        macbook: { maxWidth: "500px", width: "100%" },
        android: { maxWidth: "160px", width: "100%", top: "-6px", right: "-10px" }
      };
    }
    return {
      macbook: { maxWidth: "850px", width: "100%" },
      android: { maxWidth: "200px", width: "100%", top: "-80px", right: "-36px" }
    };
  };

  const deviceSizes = getDeviceSizes();

  const getThumbnailSize = () => {
    if (isMobileOnlyProject) {
      if (isMobile) return { width: 48, height: 96 };
      if (isTablet) return { width: 62, height: 124 };
      return { width: 78, height: 156 };
    }

    if (isMobile) return { width: "60px", height: "65px" };
    if (isTablet) return { width: "80px", height: "90px" };
    return { width: "120px", height: "130px" };
  };

  const thumbnailSize = getThumbnailSize();

  // Calculate opacity based on proximity to currentIndex
  const getOpacityForIndex = (index) => {
    const length = galleryImages.length;
    // Calculate the shortest distance between indices in a circular manner
    const distance = Math.min(
      Math.abs(index - currentIndex),
      length - Math.abs(index - currentIndex)
    );

    // Current image should be hidden (opacity: 0)
    if (distance === 0) return 0;

    // Images immediately next to the current index (distance 1) get higher opacity
    if (distance === 1) return 0.7;

    // Images further away get progressively lower opacity
    const maxDistance = Math.floor(length / 2);
    const opacityStep = 0.7 / maxDistance; // Gradually decrease from 0.7 to 0
    return Math.max(0, 0.5 - (distance - 1) * opacityStep);
  };

  return (
    <div className="w-full max-w-full text-white">
      <h3 className="text-3xl font-semibold md-12 text-yellow-400 border-b border-yellow-400/30 pb-4">
        Project Gallery
      </h3>

      {galleryImages.length === 0 ? (
        <p className="text-gray-400 italic my-8">No gallery images available for this project.</p>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 md:mt-0">        
          
          {/* 3D Carousel Container */}
          <div 
            ref={carouselRef}
            className="relative w-full max-w-7xl h-auto md:h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000 py-8 md:py-0"
          >
            {/* MacbookPro and Android in the Center */}
            <div className={`absolute z-10 mr-0 md:mr-10 transition-all duration-100 transform ${isAnimating ? 'scale-100 opacity-100' : 'scale-100 opacity-100'}`}>
              {isMobileOnlyProject ? (
                <div className="relative flex items-center justify-center">
                  <MobileFrame
                    src={selectedMobileImage}
                    style={{
                      maxWidth: isMobile ? "180px" : isTablet ? "210px" : "260px",
                      width: "100%",
                    }}
                  />
                </div>
              ) : (
                <div className="relative">
                  <MacbookPro
                    src={selectedDesktopImage}
                    style={deviceSizes.macbook}
                  />
                  <div className="absolute" style={{ 
                    top: deviceSizes.android.top, 
                    right: deviceSizes.android.right,
                    zIndex: 20,
                  }}>
                    <MobileFrame
                      src={selectedMobileImage}
                      style={deviceSizes.android}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3D Carousel for Images */}
            <div
              className="relative w-full h-full mx-4 md:mx-16"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(-${rotation}deg)`,
                transition: isAnimating ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.8s ease',
              }}
            >
              {galleryImages.map((image, index) => {
                const angle = (360 / galleryImages.length) * index;
                const radius = getRadius();
                const isHovered = index === hoverIndex;
                const baseOpacity = getOpacityForIndex(index);
                
                return (
                  <div
                    key={index}
                    className={`absolute cursor-pointer transition-all duration-500`}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px) ${isHovered ? 'scale(1.1)' : ''}`,
                      transformStyle: 'preserve-3d',
                      width: typeof thumbnailSize.width === "number" ? `${thumbnailSize.width}px` : thumbnailSize.width,
                      height: typeof thumbnailSize.height === "number" ? `${thumbnailSize.height}px` : thumbnailSize.height,
                      top: '51%',
                      left: '49%',
                      marginLeft: typeof thumbnailSize.width === "number" ? `-${thumbnailSize.width / 2}px` : isMobile ? '-30px' : isTablet ? '-40px' : '-70px',
                      marginTop: typeof thumbnailSize.height === "number" ? `-${thumbnailSize.height / 2}px` : isMobile ? '-32px' : isTablet ? '-45px' : '-75px',
                      opacity: isHovered ? 1 : baseOpacity,
                    }}
                    onClick={() => handleThumbnailClick(index)}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <img
                      src={image}
                      alt={imagesAlt[index] || `Project Image ${index + 1}`}
                      className={`w-full h-full object-cover rounded-lg shadow-xl transition-all duration-300 ${
                        isHovered ? 'shadow-yellow-400/50' : 'shadow-black/70'
                      }`}
                      loading="lazy"
                      style={{
                        transform: 'rotateY(0deg)',
                        backfaceVisibility: 'hidden',
                        border: isHovered ? '2px solid #FBBF24' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    {isHovered && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 text-xs font-bold">
                          {imagesAlt[index]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="primary"
              size="icon"
              onClick={handlePrev}
              disabled={isAnimating}
              className={`absolute top-1/2 -left-10 md:left-4 transform -translate-y-1/2 z-20 
                h-10 w-10 md:h-12 md:w-12 rounded-full ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} 
                hover:shadow-lg hover:shadow-yellow-500/30`}
            >
              <ChevronLeft size={isMobile ? 18 : 24} />
            </Button>
            <Button
              variant="primary"
              size="icon"
              onClick={handleNext}
              disabled={isAnimating}
              className={`absolute top-1/2 -right-10 md:right-4 transform -translate-y-1/2 z-20 
                h-10 w-10 md:h-12 md:w-12 rounded-full ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} 
                hover:shadow-lg hover:shadow-yellow-500/30`}
            >
              <ChevronRight size={isMobile ? 18 : 24} />
            </Button>
          </div>

            {/* Screen Title */}
            <div className={`flex flex-row items-center justify-center mb-16 md:mb-4 py-12 md:py-0 transition-opacity duration-100 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <p>
              <span className="font-bold text-xl md:text-3xl lg:text-4xl -top-4 md:top-0 font-primary text-yellow-400">
                {screenTitle}
              </span>
            </p>
          </div>        
          
        </div>
      )}

      {/* Custom CSS for Perspective */}
      <style>{`
        .perspective-1000 {
          perspective: 1200px;
        }
        
        @media (max-width: 768px) {
          .perspective-1000 {
            perspective: 800px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectGallery;
