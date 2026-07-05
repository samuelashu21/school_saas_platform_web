export interface MessageThread {
  id: string;

  schoolId: string;

  subject: string;

  createdAt: string;

  messages?: Message[];
}

export interface Message {
  id: string;

  threadId: string;

  senderId: string;

  content: string;

  createdAt: string;
}

export interface CreateThreadDto {
  schoolId: string;

  subject: string;
}

export interface SendMessageDto {
  threadId: string;

  senderId: string;

  content: string;
}