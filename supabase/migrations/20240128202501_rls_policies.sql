-- Add RLS policies for contacts
create policy "Users can view contacts from their companies"
    on propuestas.contacts for select
    using (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ));

create policy "Users can insert contacts to their companies"
    on propuestas.contacts for insert
    with check (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ));

create policy "Users can update contacts from their companies"
    on propuestas.contacts for update
    using (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ))
    with check (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ));

create policy "Users can delete contacts from their companies"
    on propuestas.contacts for delete
    using (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ));

-- Add RLS policies for proposals
create policy "Users can view proposals from their companies"
    on propuestas.proposals for select
    using (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ));

create policy "Users can insert proposals to their companies"
    on propuestas.proposals for insert
    with check (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ));

create policy "Users can update proposals from their companies"
    on propuestas.proposals for update
    using (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ))
    with check (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    ));

create policy "Users can delete proposals from their companies"
    on propuestas.proposals for delete
    using (company_id in (
        select id from propuestas.companies
        where auth.uid() = auth.uid()
    )); 