// components/cards/PurpleTemplate.tsx
import { ReactNode } from 'react';
import { StudentData } from '@/types';
import defaultProfileImage from '@/assets/default-profile.svg';

interface PurpleTemplateProps {
  formData: StudentData;
  qrCode: ReactNode;
}

const PurpleTemplate = ({ formData, qrCode }: PurpleTemplateProps) => {
  return (
    <div className="w-60 mx-auto bg-gradient-to-b from-purple-600 to-purple-800 text-white rounded-xl overflow-hidden shadow-lg">
      <div className="p-3 text-center">
        <h3 className="text-lg font-bold">Unity School</h3>
        <p className="text-xs">Student ID</p>
      </div>

      <div className="flex flex-col items-center p-3 bg-white text-black">
        <div className="w-24 h-32 rounded border border-purple-400 overflow-hidden mb-2">
          <img
            src={formData.photoUrl || defaultProfileImage}
            alt="Student"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-sm font-medium text-center">
          <p>{formData.name}</p>
          <p className="text-xs">{formData.classDiv}</p>
        </div>

        <div className="mt-2 text-xs text-left w-full space-y-1">
          <p>
            <strong>Roll:</strong> {formData.rollNumber}
          </p>
          <p>
            <strong>Rack:</strong> {formData.rackNumber}
          </p>
          <p>
            <strong>Bus:</strong> {formData.busRoute}
          </p>
        </div>
      </div>

      {formData.allergies.length > 0 && (
        <div className="bg-red-100 text-red-800 text-xs p-2">
          <strong>Allergies:</strong> {formData.allergies.join(', ')}
        </div>
      )}

      <div className="p-3 bg-purple-700 flex justify-between items-center text-xs">
        <span>ID: UNITY-{formData.rollNumber}</span>
        <div className="bg-white p-1 rounded">{qrCode}</div>
      </div>
    </div>
  );
};

export default PurpleTemplate;
