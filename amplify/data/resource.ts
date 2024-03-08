// 'amplify/data/resource.ts'
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  ContactFormEntry: a
    .model({
      firstName: a.string(),
      lastName: a.string(),
      email: a.string(),
      telephone: a.string(),
      details: a.string(),
      status: a.string(),
    })
    .authorization([
      a.allow.public("iam").to(['create']), // Allow public to create entries with IAM
      a.allow.private("userPools").to(['create','read','delete','update']),// Allow authenticated users to create, read, update, and delete
    ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  }
});
