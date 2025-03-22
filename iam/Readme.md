# IAM Configuration

## User Policy Setup (Manual)

The `userPolicyExample.json` file in this directory contains IAM permissions that should be manually applied to your AWS user through the AWS Management Console:

1. Log into the AWS Management Console
2. Navigate to IAM → Users → [Your User]
3. Select "Add permissions" → "Attach policies directly"
4. Choose "Create policy" → JSON tab
5. Copy and paste the contents of `userPolicyExample.json`
6. Review, name the policy (e.g., "AuctionServiceDevelopmentPolicy"), and create

This policy grants broad permissions for services used by the auction project and should be applied manually rather than deployed through serverless.

## Working with IAM in the Project

This directory contains IAM role statement definitions that are automatically included in the deployed serverless application.

### How it works:

1. Each `.ts` file exports an IAM role statement (e.g., `AuctionsTableIam.ts`, `MailQueueIam.ts`)
2. `index.ts` combines these statements and exports them as a single array
3. `serverless.ts` imports this array via `import iamRoleStatements from '@iam'`
4. The statements are applied to the Lambda execution role in `serverless.ts`:

```typescript
provider: {
  // ...
  iam: {
    role: {
      statements: iamRoleStatements
    },
  },
}
```

### Adding new IAM role statements:

1. Create a new TypeScript file in this directory (e.g., `NewServiceIam.ts`)
2. Export a statement object with Effect, Action, and Resource properties
3. Import and add it to the array in `index.ts`

This approach allows for modular management of IAM permissions while keeping the serverless configuration clean.
