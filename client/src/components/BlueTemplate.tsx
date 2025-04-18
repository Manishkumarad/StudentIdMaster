import { ReactNode } from "react";
import { StudentData } from "@/types";
import defaultProfileImage from "@/assets/default-profile.svg";

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
              <img 
                src={defaultProfileImage} 
                alt="Student placeholder" 
                className="h-full w-full object-cover"
              />
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
        <div className="px-4 py-2 bg-purple-100 border-t border-b border-purple-200">
          <div className="flex items-center">
            <span className="text-purple-700 font-bold text-sm mr-2">Allergies:</span>
            <span className="text-purple-800 text-sm">{formData.allergies.join(', ')}</span>
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
