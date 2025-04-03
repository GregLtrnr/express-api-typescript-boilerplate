import request from 'supertest';
import express, { Application } from 'express';
import * as templateController from './template';
import templateService from '@services/template';

jest.mock('@services/template'); // Mock the correct service

const app: Application = express();
app.use(express.json());
app.get('/templates', templateController.getTemplates);
app.get('/templates/:id', templateController.getTemplateById);
app.post('/templates', templateController.createTemplate);
app.put('/templates/:id', templateController.updateTemplate);
app.delete('/templates/:id', templateController.deleteTemplate);

describe('Template Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /templates', () => {
    it('should return templates with status 200', async () => {
      (templateService.getTemplates as jest.Mock).mockResolvedValue([
        { id: '1', name: 'Template 1' },
      ]);

      const response = await request(app).get('/templates');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: '1', name: 'Template 1' }]);
    });

    it('should return 404 if no templates are found', async () => {
      (templateService.getTemplates as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/templates');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Templates not found' });
    });
  });

  describe('GET /templates/:id', () => {
    it('should return a template with status 200', async () => {
      (templateService.getTemplateById as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'Template 1',
      });

      const response = await request(app).get('/templates/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: '1', name: 'Template 1' });
    });

    it('should return 404 if template is not found', async () => {
      (templateService.getTemplateById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/templates/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Template not found' });
    });
  });

  describe('POST /templates', () => {
    it('should create a template and return it with status 201', async () => {
      (templateService.createTemplate as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'New Template',
      });

      const response = await request(app).post('/templates').send({ name: 'New Template' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: '1', name: 'New Template' });
    });

    it('should return 400 if template data is invalid', async () => {
      (templateService.createTemplate as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post('/templates').send({ name: '' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid template data' });
    });
  });

  describe('PUT /templates/:id', () => {
    it('should update a template and return it with status 200', async () => {
      (templateService.updateTemplate as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'Updated Template',
      });

      const response = await request(app).put('/templates/1').send({ name: 'Updated Template' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: '1', name: 'Updated Template' });
    });

    it('should return 404 if template is not found', async () => {
      (templateService.updateTemplate as jest.Mock).mockResolvedValue(null);

      const response = await request(app).put('/templates/1').send({ name: 'Updated Template' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Template not found' });
    });
  });

  describe('DELETE /templates/:id', () => {
    it('should delete a template and return status 204', async () => {
      (templateService.deleteTemplate as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete('/templates/1');

      expect(response.status).toBe(204);
    });

    it('should return 404 if template is not found', async () => {
      (templateService.deleteTemplate as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/templates/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Template not found' });
    });
  });
});
