import Joi from 'joi';
import {
  createTemplateBodySchema,
  updateTemplateParamsSchema,
  updateTemplateBodySchema,
} from './template';

describe('Template Schemas', () => {
  describe('createTemplateBodySchema', () => {
    it('should validate a valid object', () => {
      const validData = { name: 'Test Template', content: 'This is a test.' };
      const { error } = createTemplateBodySchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it('should invalidate an object missing required fields', () => {
      const invalidData = { name: 'Test Template' };
      const { error } = createTemplateBodySchema.validate(invalidData);
      expect(error).toBeDefined();
    });

    it('should invalidate an object with incorrect field types', () => {
      const invalidData = { name: 123, content: true };
      const { error } = createTemplateBodySchema.validate(invalidData);
      expect(error).toBeDefined();
    });
  });

  describe('updateTemplateParamsSchema', () => {
    it('should validate a valid object', () => {
      const validData = { id: '12345' };
      const { error } = updateTemplateParamsSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it('should invalidate an object missing the id field', () => {
      const invalidData = {};
      const { error } = updateTemplateParamsSchema.validate(invalidData);
      expect(error).toBeDefined();
    });

    it('should invalidate an object with incorrect id type', () => {
      const invalidData = { id: 12345 };
      const { error } = updateTemplateParamsSchema.validate(invalidData);
      expect(error).toBeDefined();
    });
  });

  describe('updateTemplateBodySchema', () => {
    it('should validate a valid object', () => {
      const validData = { data: { name: 'Updated Name', content: 'Updated Content' } };
      const { error } = updateTemplateBodySchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it('should validate an object with partial data', () => {
      const validData = { data: { name: 'Updated Name' } };
      const { error } = updateTemplateBodySchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it('should invalidate an object missing the data field', () => {
      const invalidData = {};
      const { error } = updateTemplateBodySchema.validate(invalidData);
      expect(error).toBeDefined();
    });

    it('should invalidate an object with incorrect data type', () => {
      const invalidData = { data: 'Invalid Data' };
      const { error } = updateTemplateBodySchema.validate(invalidData);
      expect(error).toBeDefined();
    });
  });
});
