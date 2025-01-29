# Abalun Proposals

A proposal management system with Google Docs integration.

## Deployment on Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel project settings:
   - Add all variables from `.env.example`
   - Ensure the `GOOGLE_PRIVATE_KEY` is properly formatted with newlines
   - Set the appropriate Supabase credentials

3. Deploy settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your credentials
   - These should match your Vercel environment variables

3. Start the application:
```bash
npm run preview
```

## Security Measures

This project includes several security measures:

### Pre-commit Hooks
- Prevents committing sensitive information
- Blocks .env files from being committed
- Prevents service account keys from being committed
- Scans for potential secrets in code

### GitHub Security
- Secret scanning enabled
- Push protection for sensitive data
- Automated security scanning with GitHub Actions
- Regular dependency updates with Dependabot

### Authentication & Authorization
- OAuth-based authentication with Supabase
- Secure session management
- Role-based access control
- Secure cookie handling

### API Security
- Environment variables for sensitive data
- Service account key protection
- OAuth-based authentication
- View-only sharing for proposals
- Rate limiting
- CORS configuration

## Environment Variables

Required environment variables (configure in Vercel):

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Google Cloud service account email
- `GOOGLE_PRIVATE_KEY`: Google Cloud service account private key

Optional:
- `PROPOSAL_TEMPLATE_ID`: Google Doc template ID for proposals

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure no secrets are included
4. Run security checks
5. Submit a pull request

## Security Reporting

If you discover a security vulnerability, please:

1. DO NOT create a public issue
2. Email security@yourdomain.com
3. Include detailed information about the vulnerability
4. Wait for a response before disclosing publicly
