export interface Transcript {
  id: string;

  studentId: string;

  schoolId: string;

  semesterId?: string | null;

  gpa: number;

  cgpa: number;

  verificationCode: string;

  isRevoked: boolean;

  generatedAt: string;

  issuedBy?: string | null;

  student?: {
    id: string;
    firstName: string;
    lastName: string;
  };

  semester?: {
    id: string;
    type: string;
  };

  audits?: TranscriptAudit[];

  versions?: TranscriptVersion[];
}

export interface TranscriptAudit {
  id: string;

  transcriptId: string;

  action: string;

  actorId?: string | null;

  ipAddress?: string | null;

  userAgent?: string | null;

  meta?: Record<string, unknown>;

  createdAt: string;
}

export interface TranscriptVersion {
  id: string;

  transcriptId: string;

  gpa: number;

  cgpa: number;

  snapshot: Record<string, unknown>;

  createdAt: string;
}

export interface VerifyTranscriptResponse {
  valid: boolean;

  message?: string;

  student?: {
    name: string;

    grade: number;
  };

  issuedAt?: string;
} 