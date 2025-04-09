import { useRef, useEffect } from 'react';
import { StudentData, CardTemplate } from '@/types';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import BlueTemplate from './BlueTemplate';
import WhiteTemplate from './WhiteTemplate';
import GreenTemplate from './GreenTemplate';
import PurpleTemplate from './PurpleTemplate';
import { useToast } from '@/hooks/use-toast';

interface IDCardPreviewProps {
  formData: StudentData;
  selectedTemplate: CardTemplate;
  hasSubmitted: boolean;
}

const IDCardPreview = ({ formData, selectedTemplate, hasSubmitted }: IDCardPreviewProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Log status for debugging
  useEffect(() => {
    console.log('Preview render - hasSubmitted:', hasSubmitted);
    console.log('Current form data:', formData);
  }, [hasSubmitted, formData]);

  // Function to download card as PNG
  const handleDownloadCard = async () => {
    if (!hasSubmitted) {
      toast({
        variant: 'destructive',
        title: 'No card generated',
        description: 'Please submit the form to generate an ID card first',
      });
      return;
    }

    if (cardRef.current === null) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate image. Please try again.',
      });
      return;
    }

    try {
      // Apply temporary styling to ensure text is visible in PNG
      const tempStyleElement = document.createElement('style');
      tempStyleElement.textContent = `
        /* Change all text to black for better visibility */
        .card-template-1 *, .card-template-2 * {
          color: #000000 !important;
        }
        
        /* Set all backgrounds to white */
        .card-template-1, 
        .card-template-2,
        .card-template-1 div,
        .card-template-2 div {
          background-color: white !important;
          background-image: none !important;
        }
        
        /* Keep special colored text like allergies */
        .text-purple-700, .text-purple-800, .text-indigo-600, .text-indigo-700 {
          color: #5b21b6 !important;
        }
        
        /* Maintain border visibility */
        .border-blue-500, .border-blue-300, .border-purple-200 {
          border-color: #3b82f6 !important;
        }
        
        /* Style background of medical alert sections */
        .bg-purple-100, .bg-indigo-100 {
          background-color: #f5f3ff !important;
          border-color: #c4b5fd !important;
        }
      `;
      document.head.appendChild(tempStyleElement);

      // Generate PNG with the fixed text colors
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        backgroundColor: 'white',
        style: {
          color: 'yellow',
        },
      });

      // Remove the temporary styling
      document.head.removeChild(tempStyleElement);

      // Create download link
      const link = document.createElement('a');
      link.download = `ID_Card_${formData.name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: 'Download successful',
        description: 'ID card has been downloaded as PNG with improved text visibility',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Download failed',
        description: 'Failed to download the ID card. Please try again.',
      });
      console.error('Error generating image:', error);
    }
  };

  // Prepare student data in JSON format for QR code
  const qrCodeData = JSON.stringify({
    name: formData.name,
    rollNumber: formData.rollNumber,
    classDiv: formData.classDiv,
    allergies: formData.allergies,
    rackNumber: formData.rackNumber,
    busRoute: formData.busRoute,
  });

  // Don't show the card if not submitted or if form is empty
  if (!hasSubmitted && !formData.name) {
    return (
      <div className="lg:w-1/2">
        <div className="bg-gray-100 p-5 rounded-lg h-full flex flex-col justify-center items-center">
          <div className="text-center p-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">ID Card Preview</h2>
            <p className="text-gray-500 mb-4">
              Fill out the form and click "Generate ID Card" to see your ID card preview here.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-1/2">
      <div className="bg-gray-100 p-5 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">ID Card Preview</h2>
          <Button
            onClick={handleDownloadCard}
            variant="default"
            className="bg-secondary text-black hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasSubmitted}
          >
            Download as PNG
          </Button>
        </div>

        <div ref={cardRef}>
          {selectedTemplate === 'template1' && (
            <BlueTemplate formData={formData} qrCode={<QRCodeSVG value={qrCodeData} size={64} />} />
          )}
          {selectedTemplate === 'template2' && (
            <WhiteTemplate
              formData={formData}
              qrCode={<QRCodeSVG value={qrCodeData} size={64} />}
            />
          )}
          {selectedTemplate === 'template3' && (
            <GreenTemplate
              formData={formData}
              qrCode={<QRCodeSVG value={qrCodeData} size={64} />}
            />
          )}
          {selectedTemplate === 'template4' && (
            <PurpleTemplate
              formData={formData}
              qrCode={<QRCodeSVG value={qrCodeData} size={64} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IDCardPreview;
