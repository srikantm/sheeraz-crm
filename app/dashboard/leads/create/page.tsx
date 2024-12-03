import Form from '@/app/ui/leads/create-form';
import Breadcrumbs from '@/app/ui/leads/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Lead',
};
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Leads', href: '/dashboard/leads' },
          {
            label: 'Create Lead',
            href: '/dashboard/leads/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers}/>
    </main>
  );
}