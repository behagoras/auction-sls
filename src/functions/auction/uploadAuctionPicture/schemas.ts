import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const uploadPictureInputSchema: JSONSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'string'
    },
    pathParameters: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      required: ['id']
    }
  },
  required: ['body', 'pathParameters']
};

export type UploadPictureInputSchema = FromSchema<typeof uploadPictureInputSchema>;
