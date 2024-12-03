import Form from '@/app/ui/invoices/record-payment';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchPaymentModes, fetchPaymentsByInvoiceId } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Record Payment',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [payments, paymentModes, invoice] = await Promise.all([
    fetchPaymentsByInvoiceId(id),
    fetchPaymentModes(),
    fetchInvoiceById(id)
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
            label: 'Record Payment',
            href: `/dashboard/invoices/${id}/record-payment`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} payments={payments} paymentModes={paymentModes}/>
    </main>
  );
}