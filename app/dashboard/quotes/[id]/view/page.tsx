import Form from '@/app/ui/quotes/view-form';
import Breadcrumbs from '@/app/ui/quotes/breadcrumbs';
import { fetchCurrencies, fetchCustomers, fetchInvoiceById, fetchInvoiceItems, fetchLeads, fetchPackages, fetchQuoteById, fetchQuotesItems, fetchTaxes } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'View Quote',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [quote, quoteItems] = await Promise.all([
    fetchQuoteById(id),
    fetchQuotesItems(id)
  ]);
  if (!quote) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Quotes', href: '/dashboard/quotes' },
          {
            label: 'View Quote',
            href: `/dashboard/quotes/${id}/view`,
            active: true,
          },
        ]}
      />
      <Form quote={quote} quoteItemList={quoteItems}/>
    </main>
  );
}