-- Enable uuid-ossp extension in extensions schema
create extension if not exists "uuid-ossp" schema extensions;

-- Create our application schema
create schema if not exists propuestas;

-- Set the search path to include all necessary schemas
set search_path to propuestas, auth, public, extensions;

-- Create companies table
create table if not exists propuestas.companies (
    id uuid primary key default extensions.uuid_generate_v4(),
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create contacts table
create table if not exists propuestas.contacts (
    id uuid primary key default extensions.uuid_generate_v4(),
    company_id uuid references propuestas.companies(id) on delete cascade,
    first_name text not null,
    last_name text not null,
    email text not null,
    role text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create proposals table
create table if not exists propuestas.proposals (
    id uuid primary key default extensions.uuid_generate_v4(),
    company_id uuid references propuestas.companies(id) on delete cascade,
    contact_id uuid references propuestas.contacts(id) on delete set null,
    title text not null,
    google_doc_id text,
    status text not null check (status in ('pendiente', 'aceptada', 'rechazada')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table propuestas.companies enable row level security;
alter table propuestas.contacts enable row level security;
alter table propuestas.proposals enable row level security;

-- Create indexes
create index if not exists idx_contacts_company on propuestas.contacts(company_id);
create index if not exists idx_proposals_company on propuestas.proposals(company_id);
create index if not exists idx_proposals_contact on propuestas.proposals(contact_id);
create index if not exists idx_proposals_status on propuestas.proposals(status);

-- Create updated_at trigger function
create or replace function propuestas.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger set_timestamp before update on propuestas.companies
    for each row execute function propuestas.update_updated_at_column();
create trigger set_timestamp before update on propuestas.contacts
    for each row execute function propuestas.update_updated_at_column();
create trigger set_timestamp before update on propuestas.proposals
    for each row execute function propuestas.update_updated_at_column();

-- Add RLS policies for authenticated users
create policy "Users can view their own companies"
    on propuestas.companies for select
    using (auth.uid() = auth.uid());

create policy "Users can insert their own companies"
    on propuestas.companies for insert
    with check (auth.uid() = auth.uid());

create policy "Users can update their own companies"
    on propuestas.companies for update
    using (auth.uid() = auth.uid())
    with check (auth.uid() = auth.uid());

create policy "Users can delete their own companies"
    on propuestas.companies for delete
    using (auth.uid() = auth.uid()); 