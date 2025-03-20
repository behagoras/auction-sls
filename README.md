# Auction Service

This Serverless application provides a complete auction service with bidding capabilities, utilizing an external Auth0 authorizer for authentication and authorization.

## Dependencies

- **Auction Authorizer**: This project depends on the `auction-sls-authorizer` project for API authentication. Make sure to deploy the authorizer first.

## Features

- Create new auctions
- List all active auctions
- View auction details
- Place bids on auctions
- Automated processing of ended auctions
- Secured with Auth0 authentication

## Prerequisites

- Node.js 18.x or later
- Serverless Framework 3.x
- AWS CLI configured with appropriate credentials
- The `auction-sls-authorizer` project deployed to the same AWS region

## Installation/deployment instructions

```bash
# Install dependencies
npm install

# Deploy to AWS (default stage: dev)
serverless deploy

# Deploy to a specific stage
serverless deploy --stage production
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | /auction | Create a new auction | Yes |
| GET | /auctions | Get all auctions | Yes |
| GET | /auction/{id} | Get auction by ID | Yes |
| PATCH | /auction/{id}/bid | Place a bid on an auction | Yes |

## Authentication

This service uses the externally deployed `auction-sls-authorizer` for authentication, which is based on Auth0 JWT tokens. To make authenticated requests:

1. Obtain a valid JWT token from Auth0
2. Include the token in your requests with the `Authorization: Bearer YOUR_TOKEN` header

## Project Structure

```
.
├── serverless.ts          # Serverless configuration
├── src/
│   ├── functions/
│   │   └── auction/       # Auction service functions
│   │       ├── create/    # Create auction endpoint
│   │       ├── getAll/    # Get all auctions endpoint
│   │       ├── getAuction/# Get single auction endpoint
│   │       ├── bid/       # Place bid endpoint
│   │       └── processAuctions/ # Process ended auctions
│   └── libs/              # Shared utility functions
├── resources/             # CloudFormation resources
└── iam/                   # IAM role definitions
```

## Local Development

```bash
# Start offline mode for local testing
serverless offline
```

## License

MIT
