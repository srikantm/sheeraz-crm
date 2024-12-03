import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchCurrencies, fetchTaxes, fetchPackages, fetchLeads, fetchPackagesWithRates } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();
  const currencies = await fetchCurrencies();
  const taxes = await fetchTaxes();
  const packages = await fetchPackages()
  const leads = await fetchLeads();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} currencies={currencies} taxes={taxes} packages={packages} leads={leads}/>
    </main>
  );
}