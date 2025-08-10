import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Download, Share2 } from 'lucide-react';
import { ProjectMediumDto } from '@/types/api';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProjectMediumDto[];
  initialIndex: number;
  projectName?: string;
}

const ImageGalleryModal = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex, 
  projectName 
}: ImageGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') onClose();
  };

  if (!images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-7xl h-[90vh] p-0 bg-black/95 border-0"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white border-0"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={currentImage?.fileUrl || '/placeholder.svg'}
              alt={`${projectName} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 w-12 h-12"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 w-12 h-12"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              {/* Image Counter */}
              <div className="text-white text-sm font-medium">
                {currentIndex + 1} of {images.length}
                {projectName && (
                  <span className="block text-white/70 text-xs mt-1">
                    {projectName}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70 text-white border-0"
                  onClick={() => {
                    // Implement share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: `${projectName} - Image ${currentIndex + 1}`,
                        url: currentImage?.fileUrl || window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70 text-white border-0"
                  asChild
                >
                  <a 
                    href={currentImage?.fileUrl} 
                    download={`${projectName}-image-${currentIndex + 1}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="mt-4">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-full">
                  {images.map((image, index) => (
                    <button
                      key={image.mediaId}
                      onClick={() => setCurrentIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                        index === currentIndex 
                          ? 'border-primary ring-2 ring-primary/50' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={image.fileUrl || '/placeholder.svg'}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryModal;