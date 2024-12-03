import Form from '@/app/ui/invoices/view-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCurrencies, fetchCustomers, fetchInvoiceById, fetchInvoiceItems, fetchLeads, fetchPackages, fetchTaxes } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'View Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invoice, invoiceItems] = await Promise.all([
    fetchInvoiceById(id),
    fetchInvoiceItems(id)
  ]);
  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'View Invoice',
            href: `/dashboard/invoices/${id}/view`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} invoiceItemList={invoiceItems}/>
    </main>
  );
}