# Abalun Proposals

A proposal management system with Google Docs integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Supabase and Google Cloud credentials

3. Set up Google Cloud:
   - Create a project in Google Cloud Console
   - Enable Google Docs and Drive APIs
   - Create a service account with appropriate permissions
   - Download the service account key
   - Add the service account email and private key to your `.env`

4. Set up Supabase:
   - Create a project in Supabase
   - Enable Google OAuth
   - Add your Supabase URL and anon key to your `.env`

## Development

Start the development server:

```bash
npm run dev
```

## Security

This project includes several security measures:

- Environment variables for sensitive data
- Service account key protection
- OAuth-based authentication
- View-only sharing for proposals

## File Structure

```
src/
  ├── components/         # React components
  │   ├── proposals/     # Proposal-related components
  │   └── ui/           # Shared UI components
  ├── lib/
  │   ├── api/          # API endpoints
  │   ├── hooks/        # React hooks
  │   └── services/     # Service integrations
  └── pages/            # Application pages
```

## Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Google Cloud service account email
- `GOOGLE_PRIVATE_KEY`: Google Cloud service account private key

Optional environment variables:

- `PROPOSAL_TEMPLATE_ID`: Google Doc template ID for proposals

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Security Notes

- Never commit the `.env` file
- Never commit the service account key
- Keep the `service-account-key.json` file secure
- Regularly rotate credentials
