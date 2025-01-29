-- Create the company_type enum
CREATE TYPE company_type AS ENUM (
    'startup',
    'pyme',
    'enterprise',
    'autonomo'
);

-- Add the type column to companies table
ALTER TABLE propuestas.companies
ADD COLUMN type company_type; 