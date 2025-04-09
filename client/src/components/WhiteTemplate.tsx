import { ReactNode } from "react";
import { StudentData } from "@/types";

interface WhiteTemplateProps {
  formData: StudentData;
  qrCode: ReactNode;
}

const WhiteTemplate = ({ formData, qrCode }: WhiteTemplateProps) => {
  return (
    <div className="card-template-2 w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white border-2 border-blue-500">
      {/* Card Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-500">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-blue-800 text-lg font-bold tracking-wider">UNITY SCHOOL</h3>
            <p className="text-xs text-blue-600">Student ID Card • {new Date().getFullYear()}-{new Date().getFullYear() + 1}</p>
          </div>
          <div>
            <svg width="40" height="40" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div className="p-6 pt-8">
        <div className="flex flex-col items-center">
          {/* Student Photo */}
          <div className="w-28 h-36 rounded-lg overflow-hidden border-2 border-blue-300 shadow mb-4">
            {formData.photoUrl ? (
              <img 
                src={formData.photoUrl} 
                alt={`Photo of ${formData.name}`} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Student Name */}
          <h3 className="font-bold text-lg text-gray-900 text-center">{formData.name}</h3>
          <div className="text-sm text-blue-600 mb-4">Class {formData.classDiv}</div>
        </div>
        
        {/* Student Details */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mt-2">
          <div className="flex flex-col">
            <span className="text-gray-500">Roll Number</span>
            <span className="font-medium">{formData.rollNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Rack Number</span>
            <span className="font-medium">{formData.rackNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Bus Route</span>
            <span className="font-medium">{formData.busRoute}</span>
          </div>
          {formData.allergies.length > 0 && (
            <div className="flex flex-col">
              <span className="text-indigo-600 font-bold">Medical Alert</span>
              <span className="font-medium text-indigo-700">{formData.allergies.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-t-2 border-blue-500 flex items-center justify-between">
        <div>
          <p className="text-xs text-blue-800">ID: UNITY-{formData.rollNumber}</p>
          <p className="text-xs text-blue-600">If found, please return to Unity School</p>
        </div>
        <div className="bg-white p-1 rounded-md border border-blue-200">
          {qrCode}
        </div>
      </div>
    </div>
  );
};

export default WhiteTemplate;
