export type CardTemplate = 'template1' | 'template2' | 'template4' | 'template3';

export interface StudentData {
  name: string;
  rollNumber: string;
  classDiv: string;
  allergies: string[];
  photo: File | null;
  photoUrl: string;
  rackNumber: string;
  busRoute: string;
  timestamp?: string;
}
