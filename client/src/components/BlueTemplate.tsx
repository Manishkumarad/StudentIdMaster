import { ReactNode } from "react";
import { StudentData } from "@/types";

interface BlueTemplateProps {
  formData: StudentData;
  qrCode: ReactNode;
}

const BlueTemplate = ({ formData, qrCode }: BlueTemplateProps) => {
  return (
    <div className="card-template-1 w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 to-blue-700">
      {/* Card Header */}
      <div className="p-4 bg-blue-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">Unity School</h3>
            <p className="text-xs text-blue-200">Student Identification Card</p>
          </div>
          <div className="bg-white p-1 rounded">
            <svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="128" height="128" rx="6" fill="#3B82F6"/>
              <path d="M28 64C28 44.1177 44.1177 28 64 28C83.8823 28 100 44.1177 100 64C100 83.8823 83.8823 100 64 100C44.1177 100 28 83.8823 28 64Z" fill="white"/>
              <path d="M56 48L56 80L72 80L72 48L56 48Z" fill="#3B82F6"/>
              <rect x="42" y="60" width="16" height="20" fill="#3B82F6"/>
              <rect x="70" y="60" width="16" height="20" fill="#3B82F6"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="flex p-4 bg-white">
        {/* Student Photo */}
        <div className="w-1/3">
          <div className="w-full aspect-[3/4] bg-gray-200 rounded overflow-hidden border-2 border-blue-500">
            {formData.photoUrl ? (
              <img 
                src={formData.photoUrl} 
                alt={`Photo of ${formData.name}`} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* Student Details */}
        <div className="w-2/3 pl-4">
          <h3 className="font-bold text-gray-800 text-lg">{formData.name}</h3>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex">
              <span className="text-gray-600 w-24">Roll Number:</span>
              <span className="font-medium text-gray-800">{formData.rollNumber}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-24">Class:</span>
              <span className="font-medium text-gray-800">{formData.classDiv}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-24">Rack Number:</span>
              <span className="font-medium text-gray-800">{formData.rackNumber}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-24">Bus Route:</span>
              <span className="font-medium text-gray-800">{formData.busRoute}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Allergies Section - Only show if allergies exist */}
      {formData.allergies.length > 0 && (
        <div className="px-4 py-2 bg-red-100 border-t border-b border-red-200">
          <div className="flex items-center">
            <span className="text-red-600 font-medium text-sm mr-2">Allergies:</span>
            <span className="text-red-800 text-sm">{formData.allergies.join(', ')}</span>
          </div>
        </div>
      )}
      
      {/* Card Footer */}
      <div className="p-4 bg-blue-600 flex items-center justify-between">
        <div className="text-xs text-white">
          <p>Valid for Academic Year {new Date().getFullYear()}-{new Date().getFullYear() + 1}</p>
          <p>ID: UNITY-{formData.rollNumber}</p>
        </div>
        <div className="bg-white p-1 rounded">
          {qrCode}
        </div>
      </div>
    </div>
  );
};

export default BlueTemplate;
