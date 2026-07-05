export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuditFields {
  createdBy?: string;
  updatedBy?: string;
}

export interface Option {
  label: string;
  value: string;
}

export type Nullable<T> = T | null;

export type UUID = string;  