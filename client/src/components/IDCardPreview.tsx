import { useRef } from "react";
import { StudentData, CardTemplate } from "@/types";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import BlueTemplate from "./BlueTemplate";
import WhiteTemplate from "./WhiteTemplate";
import { useToast } from "@/hooks/use-toast";

interface IDCardPreviewProps {
  formData: StudentData;
  selectedTemplate: CardTemplate;
  hasSubmitted: boolean;
}

const IDCardPreview = ({
  formData,
  selectedTemplate,
  hasSubmitted,
}: IDCardPreviewProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Function to download card as PNG
  const handleDownloadCard = async () => {
    if (!hasSubmitted) {
      toast({
        variant: "destructive",
        title: "No card generated",
        description: "Please submit the form to generate an ID card first",
      });
      return;
    }

    if (cardRef.current === null) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate image. Please try again.",
      });
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        backgroundColor: "white",
      });
      
      // Create download link
      const link = document.createElement("a");
      link.download = `ID_Card_${formData.name.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Download successful",
        description: "ID card has been downloaded as PNG",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Failed to download the ID card. Please try again.",
      });
      console.error("Error generating image:", error);
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

  return (
    <div className="lg:w-1/2">
      <div className="bg-gray-100 p-5 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">ID Card Preview</h2>
          <Button 
            onClick={handleDownloadCard}
            variant="default"
            className="bg-secondary text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasSubmitted}
          >
            Download as PNG
          </Button>
        </div>

        <div ref={cardRef}>
          {selectedTemplate === "template1" ? (
            <BlueTemplate formData={formData} qrCode={<QRCodeSVG value={qrCodeData} size={64} />} />
          ) : (
            <WhiteTemplate formData={formData} qrCode={<QRCodeSVG value={qrCodeData} size={64} />} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IDCardPreview;
