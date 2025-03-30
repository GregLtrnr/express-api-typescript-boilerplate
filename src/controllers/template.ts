import { Request, Response } from 'express';
import { TemplateService } from '@services/template';
import { GetTemplatesServicePayload } from '@/types/template';

const templateService = new TemplateService();

// Get all templates
export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: GetTemplatesServicePayload = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      orderBy: (req.query.orderBy as 'asc' | 'desc') || 'asc',
    };
    // Validate payload
    const templates = await templateService.getTemplates(payload);
    if (!templates) {
      res.status(404).json({ error: 'Templates not found' });
      return;
    }
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
};

// Get a single template by ID
export const getTemplateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const template = await templateService.getTemplateById({ id });
    if (!template) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch template' });
  }
};

// Create a new template
export const createTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = templateService.createTemplate(req.body);

    if (!template) {
      res.status(400).json({ error: 'Invalid template data' });
      return;
    }

    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create template' });
  }
};

// Update a template by ID
export const updateTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTemplate = await templateService.updateTemplate({
      id,
      data: req.body,
    });

    if (!updatedTemplate) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }

    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update template' });
  }
};

// Delete a template by ID
export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTemplate = await templateService.deleteTemplate({ id });

    if (!deletedTemplate) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete template' });
  }
};
