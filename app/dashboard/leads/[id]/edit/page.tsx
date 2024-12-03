import Form from '@/app/ui/leads/edit-form';
import Breadcrumbs from '@/app/ui/leads/breadcrumbs';
import { fetchCustomers, fetchLeadById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Lead',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [lead, customers] = await Promise.all([
    fetchLeadById(id),
    fetchCustomers()
  ]);
  if (!lead) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Leads', href: '/dashboard/leads' },
          {
            label: 'Edit Lead',
            href: `/dashboard/leads/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form lead={lead} customers={customers}/>
    </main>
  );
}