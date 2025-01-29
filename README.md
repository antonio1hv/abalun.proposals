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
   - NEVER commit the `.env` file

3. Set up Google Cloud:
   - Create a project in Google Cloud Console
   - Enable Google Docs and Drive APIs
   - Create a service account with appropriate permissions
   - Download the service account key
   - Store the key securely and NEVER commit it
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

### Best Practices
1. Never commit sensitive information:
   - `.env` files
   - Service account keys
   - Private keys
   - Access tokens
   - Passwords

2. Rotate credentials regularly:
   - Service account keys
   - API keys
   - Access tokens

3. Use secure storage:
   - Use environment variables for secrets
   - Use secure credential storage
   - Encrypt sensitive data at rest

4. Monitor security:
   - Review GitHub security alerts
   - Monitor access logs
   - Check for unauthorized access
   - Review API usage

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
3. Ensure no secrets are included
4. Run security checks
5. Submit a pull request

## Security Reporting

If you discover a security vulnerability, please:

1. DO NOT create a public issue
2. Email security@yourdomain.com
3. Include detailed information about the vulnerability
4. Wait for a response before disclosing publicly
