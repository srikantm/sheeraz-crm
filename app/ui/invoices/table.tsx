import { UpdateInvoice, DeleteInvoice, DownloadInvoice, RecordPayment } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{invoice.invoice_number}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.customer_name}</p>
                  </div>
                  <InvoiceStatus status={invoice.invoice_status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {invoice.invoice_total_amount}
                    </p>
                    <p>{invoice.invoice_date}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-sm sm:pl-5">
                  Invoice Number
                </th>
                <th scope="col" className="px-3 py-5 font-sm">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-sm">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-sm">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-sm">
                  Status
                </th>
                <th scope="col" className="relative px-3 py-5">
                  <span className="sr-only">Edit</span>
      
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-5 pr-3">
                      <p>{invoice.invoice_number}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.customer_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.invoice_total_amount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.invoice_date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.invoice_status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-5 pr-3">
                    <div className="flex justify-center gap-3">
                      <RecordPayment id={invoice.id}/>
                      <DownloadInvoice id={invoice.id}/>
                      <UpdateInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
