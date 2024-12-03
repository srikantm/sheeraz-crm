import Form from '@/app/ui/quotes/create-form';
import Breadcrumbs from '@/app/ui/quotes/breadcrumbs';
import { fetchCustomers, fetchCurrencies, fetchTaxes, fetchPackages, fetchLeads, fetchPackagesWithRates } from '@/app/lib/data';
import { Metadata } from 'next';
 

export const metadata: Metadata = {
  title: 'Create Quote',
};


export default async function Page() {
  const customers = await fetchCustomers();
  const currencies = await fetchCurrencies();
  const taxes = await fetchTaxes();
  const packages = await fetchPackages()
  const leads = await fetchLeads();

  const packageRates = await fetchPackagesWithRates();

 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Quotes', href: '/dashboard/quotes' },
          {
            label: 'Create Quote',
            href: '/dashboard/quote/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} currencies={currencies} taxes={taxes} packages={packages} leads={leads}/>
    </main>
  );
}