import { useState, useEffect } from "react";
import StudentForm from "@/components/StudentForm";
import IDCardPreview from "@/components/IDCardPreview";
import SavedCards from "@/components/SavedCards";
import { StudentData, CardTemplate } from "@/types";
import { getSavedCards } from "@/lib/localStorageUtils";

const Home = () => {
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    rollNumber: "",
    classDiv: "",
    allergies: [],
    photo: null,
    photoUrl: "",
    rackNumber: "",
    busRoute: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>("template1");
  const [showSavedCards, setShowSavedCards] = useState(false);
  const [savedCards, setSavedCards] = useState<StudentData[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Debug logs to track state changes
  useEffect(() => {
    console.log("Home component - hasSubmitted changed:", hasSubmitted);
  }, [hasSubmitted]);

  // Reset hasSubmitted when formData changes significantly
  useEffect(() => {
    // If name or roll number changes after submission, reset the hasSubmitted flag
    if (hasSubmitted && (formData.name === "" || formData.rollNumber === "")) {
      console.log("Resetting hasSubmitted due to major form data change");
      setHasSubmitted(false);
    }
  }, [formData, hasSubmitted]);

  useEffect(() => {
    // Load saved cards from localStorage
    setSavedCards(getSavedCards());
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Smart Student ID Generator</h1>
        <p className="text-gray-600 text-center mt-2">Create professional student ID cards with just a few clicks</p>
      </header>

      <main className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <StudentForm 
            formData={formData}
            setFormData={setFormData}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            setHasSubmitted={setHasSubmitted}
            savedCards={savedCards}
            setSavedCards={setSavedCards}
            showSavedCards={showSavedCards}
            setShowSavedCards={setShowSavedCards}
          />

          <IDCardPreview 
            formData={formData}
            selectedTemplate={selectedTemplate}
            hasSubmitted={hasSubmitted}
          />
        </div>

        <SavedCards 
          visible={showSavedCards}
          savedCards={savedCards}
          setSavedCards={setSavedCards}
          setFormData={setFormData}
          setHasSubmitted={setHasSubmitted}
        />
      </main>

      <footer className="max-w-6xl mx-auto mt-8 text-center text-gray-600 text-sm p-4">
        <p>© {new Date().getFullYear()} Smart Student ID Generator | Unity School</p>
      </footer>
    </div>
  );
};

export default Home;
