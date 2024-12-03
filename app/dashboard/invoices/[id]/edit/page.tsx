import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCurrencies, fetchCustomers, fetchInvoiceById, fetchInvoiceItems, fetchLeads, fetchPackages, fetchTaxes } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  const currencies = await fetchCurrencies();
  const taxes = await fetchTaxes();
  const packages = await fetchPackages()
  const invoiceItems = await fetchInvoiceItems(id);
  const leads = await fetchLeads();
  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} currencies={currencies} taxes={taxes} packages={packages} invoiceItemList={invoiceItems} leads={leads}/>
    </main>
  );
}