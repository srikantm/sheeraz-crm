import Form from '@/app/ui/quotes/edit-form';
import Breadcrumbs from '@/app/ui/quotes/breadcrumbs';
import { fetchCurrencies, fetchCustomers, fetchInvoiceItems, fetchLeads, fetchPackages, fetchQuoteById, fetchQuotesItems, fetchTaxes } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Quote',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [quote, customers] = await Promise.all([
    fetchQuoteById(id),
    fetchCustomers(),
  ]);
  const currencies = await fetchCurrencies();
  const taxes = await fetchTaxes();
  const packages = await fetchPackages()
  const quoteItems = await fetchQuotesItems(id);
  const leads = await fetchLeads();
  if (!quote) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Quotes', href: '/dashboard/quotes' },
          {
            label: 'Edit quotes',
            href: `/dashboard/quotes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form quote={quote} customers={customers} currencies={currencies} taxes={taxes} packages={packages} quoteItemList={quoteItems} leads={leads}/>
    </main>
  );
}