import { ChangeEvent, FormEvent } from "react";
import { StudentData, CardTemplate } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { saveCard } from "@/lib/localStorageUtils";
import { useToast } from "@/hooks/use-toast";

interface StudentFormProps {
  formData: StudentData;
  setFormData: (data: StudentData) => void;
  selectedTemplate: CardTemplate;
  setSelectedTemplate: (template: CardTemplate) => void;
  setHasSubmitted: (value: boolean) => void;
  savedCards: StudentData[];
  setSavedCards: (cards: StudentData[]) => void;
  showSavedCards: boolean;
  setShowSavedCards: (show: boolean) => void;
}

const allergies = [
  { id: "nuts", label: "Nuts" },
  { id: "dairy", label: "Dairy" },
  { id: "eggs", label: "Eggs" },
  { id: "gluten", label: "Gluten" },
  { id: "seafood", label: "Seafood" },
  { id: "soy", label: "Soy" },
  { id: "wheat", label: "Wheat" },
  { id: "shellfish", label: "Shellfish" },
  { id: "peanuts", label: "Peanuts" },
  { id: "treenuts", label: "Tree Nuts" },
  { id: "latex", label: "Latex" },
  { id: "medications", label: "Medications" },
];

const classOptions = [
  // Primary Classes (1-5)
  { value: "1A", label: "Class 1 - Section A" },
  { value: "1B", label: "Class 1 - Section B" },
  { value: "2A", label: "Class 2 - Section A" },
  { value: "2B", label: "Class 2 - Section B" },
  { value: "3A", label: "Class 3 - Section A" },
  { value: "3B", label: "Class 3 - Section B" },
  { value: "4A", label: "Class 4 - Section A" },
  { value: "4B", label: "Class 4 - Section B" },
  { value: "5A", label: "Class 5 - Section A" },
  { value: "5B", label: "Class 5 - Section B" },
  
  // Middle School (6-8)
  { value: "6A", label: "Class 6 - Section A" },
  { value: "6B", label: "Class 6 - Section B" },
  { value: "7A", label: "Class 7 - Section A" },
  { value: "7B", label: "Class 7 - Section B" },
  { value: "8A", label: "Class 8 - Section A" },
  { value: "8B", label: "Class 8 - Section B" },
  
  // High School (9-10)
  { value: "9A", label: "Class 9 - Section A" },
  { value: "9B", label: "Class 9 - Section B" },
  { value: "10A", label: "Class 10 - Section A" },
  { value: "10B", label: "Class 10 - Section B" },
  
  // Higher Secondary (11-12)
  { value: "11SC", label: "Class 11 - Science" },
  { value: "11COM", label: "Class 11 - Commerce" },
  { value: "11ARTS", label: "Class 11 - Arts" },
  { value: "12SC", label: "Class 12 - Science" },
  { value: "12COM", label: "Class 12 - Commerce" },
  { value: "12ARTS", label: "Class 12 - Arts" },
  
  // B.Tech Years
  { value: "BTECH1", label: "B.Tech - 1st Year" },
  { value: "BTECH2", label: "B.Tech - 2nd Year" },
  { value: "BTECH3", label: "B.Tech - 3rd Year" },
  { value: "BTECH4", label: "B.Tech - 4th Year" },
];

const busRoutes = [
  { value: "Route 1", label: "Route 1 - North City" },
  { value: "Route 2", label: "Route 2 - Downtown" },
  { value: "Route 3", label: "Route 3 - East District" },
  { value: "Route 4", label: "Route 4 - South Hills" },
  { value: "Route 5", label: "Route 5 - West Side" },
  { value: "None", label: "No Bus Required" },
];

const StudentForm = ({
  formData,
  setFormData,
  selectedTemplate,
  setSelectedTemplate,
  setHasSubmitted,
  savedCards,
  setSavedCards,
  showSavedCards,
  setShowSavedCards,
}: StudentFormProps) => {
  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (allergyValue: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, allergyValue],
      });
    } else {
      setFormData({
        ...formData,
        allergies: formData.allergies.filter((a) => a !== allergyValue),
      });
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size and type
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file",
        });
        return;
      }

      // Create object URL for preview
      const photoUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: file, photoUrl });
    }
  };

  const handleTemplateChange = (value: CardTemplate) => {
    setSelectedTemplate(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.rollNumber || !formData.classDiv || !formData.rackNumber || !formData.busRoute) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (!formData.photo) {
      toast({
        variant: "destructive",
        title: "Missing photo",
        description: "Please upload a student photo",
      });
      return;
    }

    // Add timestamp to record
    const updatedFormData = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // Save card to localStorage
    saveCard(updatedFormData);
    
    // Update saved cards list
    setSavedCards([updatedFormData, ...savedCards]);
    
    // Set submitted state to trigger card preview
    setHasSubmitted(true);
    
    toast({
      title: "ID Card Generated",
      description: "Student ID card has been successfully generated",
    });
  };

  const toggleSavedCards = () => {
    setShowSavedCards(!showSavedCards);
  };

  return (
    <div className="lg:w-1/2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Student Information</h2>
        <Button
          onClick={toggleSavedCards}
          variant="default"
          className="bg-primary text-white"
        >
          Saved Cards
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Student Name */}
        <div className="form-group">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
            Full Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g. John Smith"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Roll Number */}
        <div className="form-group">
          <Label htmlFor="rollNumber" className="text-sm font-medium text-gray-700 mb-1">
            Roll Number
          </Label>
          <Input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleInputChange}
            required
            placeholder="e.g. 2023001"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Class & Division */}
        <div className="form-group">
          <Label htmlFor="classDiv" className="text-sm font-medium text-gray-700 mb-1">
            Class & Division
          </Label>
          <Select
            value={formData.classDiv}
            onValueChange={(value) => handleSelectChange("classDiv", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Class & Division" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Allergies (Multi-select) */}
        <div className="form-group">
          <Label className="text-sm font-medium text-gray-700 mb-1">
            Allergies (if any)
          </Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {allergies.map((allergy) => (
              <div key={allergy.id} className="flex items-center">
                <Checkbox
                  id={`allergy-${allergy.id}`}
                  checked={formData.allergies.includes(allergy.label)}
                  onCheckedChange={(checked) => handleCheckboxChange(allergy.label, checked as boolean)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <Label
                  htmlFor={`allergy-${allergy.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {allergy.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="form-group">
          <Label className="text-sm font-medium text-gray-700 mb-1">
            Student Photo
          </Label>
          <div className="mt-1 flex items-center gap-4">
            <div className="w-24 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 overflow-hidden">
              {formData.photoUrl ? (
                <img
                  src={formData.photoUrl}
                  alt="Student preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center p-2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs">No photo</span>
                </div>
              )}
            </div>

            <label className="relative px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition cursor-pointer">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Please upload a passport-size photo (3:4 ratio)
          </p>
        </div>

        {/* Rack Number */}
        <div className="form-group">
          <Label htmlFor="rackNumber" className="text-sm font-medium text-gray-700 mb-1">
            Rack Number
          </Label>
          <Input
            type="text"
            id="rackNumber"
            name="rackNumber"
            value={formData.rackNumber}
            onChange={handleInputChange}
            required
            placeholder="e.g. R42"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Bus Route Number */}
        <div className="form-group">
          <Label htmlFor="busRoute" className="text-sm font-medium text-gray-700 mb-1">
            Bus Route Number
          </Label>
          <Select
            value={formData.busRoute}
            onValueChange={(value) => handleSelectChange("busRoute", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Bus Route" />
            </SelectTrigger>
            <SelectContent>
              {busRoutes.map((route) => (
                <SelectItem key={route.value} value={route.value}>
                  {route.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Template Selection */}
        <div className="form-group">
          <Label className="text-sm font-medium text-gray-700 mb-1">
            ID Card Template
          </Label>
          <RadioGroup
            value={selectedTemplate}
            onValueChange={handleTemplateChange}
            className="flex gap-4"
          >
            <div className="flex items-center">
              <RadioGroupItem value="template1" id="template1" />
              <Label htmlFor="template1" className="ml-2 text-sm text-gray-700">
                Blue Template
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="template2" id="template2" />
              <Label htmlFor="template2" className="ml-2 text-sm text-gray-700">
                White Template
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
          >
            Generate ID Card
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
