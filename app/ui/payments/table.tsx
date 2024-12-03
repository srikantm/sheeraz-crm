import { fetchFilteredCustomers, fetchFilteredPayments } from '@/app/lib/data';
import { UpdateLead } from './buttons';

export default async function PaymentsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const payments = await fetchFilteredPayments(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {payments?.map((payment,i) => (
              <div
                key={payment.payment_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{payment.invoice_number}</p>
                    </div>
                    <p className="text-sm text-gray-500">{payment.payment_mode}</p>
                  </div>
                  {/* <InvoiceStatus status={lead.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {"Amount : " + payment.amount}
                    </p>
                    <p className="text-xl font-medium">
                      {'Ref Num : '}{payment.reference_number}
                    </p>
                    <p className="flex justify-end gap-2">
                      {payment.payment_date}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateLead id={customer.id} /> */}
                    {/* <DeleteInvoice id={lead.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Payment Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Invoice Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Payment Mode
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Reference Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments?.map((payment) => (
                <tr
                  key={payment.payment_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{payment.payment_id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <p>{payment.invoice_number}</p>
                  </td>
                
                  <td className="whitespace-nowrap px-3 py-3">
                    {payment.payment_mode}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {payment.reference_number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {Number(payment.amount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {payment.payment_date}
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
