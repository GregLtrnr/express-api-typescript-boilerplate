//import prisma client
import { PrismaClient } from '@prisma/client';
import {
  type CreateTemplateServicePayload,
  type GetTemplatesServicePayload,
  type GetTemplateByIdServicePayload,
  type UpdateTemplateServicePayload,
  type DeleteTemplateServicePayload,
} from '@/types/template';

const prisma = new PrismaClient();

class TemplateService {
  async createTemplate(payload: CreateTemplateServicePayload) {
    try {
      const template = await prisma.template.create({
        data: payload,
      });
      return template;
    } catch (error) {
      throw new Error('Failed to create template');
    }
  }

  async getTemplateById(payload: GetTemplateByIdServicePayload) {
    try {
      const template = await prisma.template.findUnique({
        where: { id: payload.id },
      });
      if (!template) {
        throw new Error('Template not found');
      }
      return template;
    } catch (error) {
      throw new Error('Failed to fetch template');
    }
  }

  async getTemplates(payload: GetTemplatesServicePayload) {
    try {
      const { page = 1, limit = 10, search, sortBy, orderBy } = payload;

      const templates = await prisma.template.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          name: {
            contains: search,
          },
        },
        orderBy: {
          [sortBy || 'createdAt']: orderBy || 'asc',
        },
      });

      return templates;
    } catch (error) {
      throw new Error('Failed to fetch templates');
    }
  }

  async updateTemplate(payload: UpdateTemplateServicePayload) {
    try {
      const updatedTemplate = await prisma.template.update({
        where: { id: payload.id },
        data: payload.data,
      });
      if (!updatedTemplate) {
        throw new Error('Template not found');
      }
      return updatedTemplate;
    } catch (error) {
      throw new Error('Failed to update template');
    }
  }

  async deleteTemplate(payload: DeleteTemplateServicePayload) {
    try {
      const deletedTemplate = await prisma.template.delete({
        where: { id: payload.id },
      });
      if (!deletedTemplate) {
        throw new Error('Template not found');
      }
      return deletedTemplate;
    } catch (error) {
      throw new Error('Failed to delete template');
    }
  }
}

export default new TemplateService();
