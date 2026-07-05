export interface CourseOffering {
  id: string;

  semesterId: string;

  classId: string;

  subjectId: string;

  semester?: { 
    id: string;

    type: string;
  };

  class?: {
    id: string;

    name: string;
  };

  subject?: {
    id: string;

    name: string;

    code?: string;
  };
}