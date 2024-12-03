import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { fetchCustomers, fetchCurrencies, fetchTaxes, fetchPackages, fetchLeads, fetchPackagesWithRates } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Product',
};

export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Create Product',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}