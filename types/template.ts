import { Template } from '@prisma/client';

export type CreateTemplateServicePayload = Pick<Template, 'name' | 'content'>;

export type UpdateTemplateServicePayload = {
  id: string;
  data: Partial<CreateTemplateServicePayload>;
};

export type GetTemplateByIdServicePayload = {
  id: string;
};

export type DeleteTemplateServicePayload = {
  id: string;
};

export type GetTemplatesServicePayload = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
};
