// components/cards/GreenTemplate.tsx
import { ReactNode } from 'react';
import { StudentData } from '@/types';
import defaultProfileImage from '@/assets/default-profile.svg';

interface GreenTemplateProps {
  formData: StudentData;
  qrCode: ReactNode;
}

const GreenTemplate = ({ formData, qrCode }: GreenTemplateProps) => {
  return (
    <div className="max-w-sm mx-auto border border-green-600 rounded-lg overflow-hidden shadow-md bg-white">
      <div className="bg-green-600 p-4 text-white">
        <h3 className="text-xl font-bold uppercase">Unity School</h3>
        <p className="text-xs">Student ID Card - {new Date().getFullYear()}</p>
      </div>

      <div className="p-4 flex items-start gap-4">
        <div className="w-24 h-32 rounded border border-green-300 overflow-hidden">
          <img
            src={formData.photoUrl || defaultProfileImage}
            alt="Student"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-sm space-y-1">
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Roll No:</strong> {formData.rollNumber}
          </p>
          <p>
            <strong>Class:</strong> {formData.classDiv}
          </p>
          <p>
            <strong>Rack No:</strong> {formData.rackNumber}
          </p>
          <p>
            <strong>Bus:</strong> {formData.busRoute}
          </p>
        </div>
      </div>

      {formData.allergies.length > 0 && (
        <div className="px-4 pb-2 text-sm text-red-600 font-semibold">
          Allergies: {formData.allergies.join(', ')}
        </div>
      )}

      <div className="p-4 bg-green-50 flex justify-between items-center text-xs">
        <span>ID: UNITY-{formData.rollNumber}</span>
        <div className="bg-white p-1 rounded">{qrCode}</div>
      </div>
    </div>
  );
};

export default GreenTemplate;
