import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
import { fetchLatestInvoices } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
export default async function LatestInvoices() {
  
  const latestInvoicesData = await fetchLatestInvoices();
    const fetchedData = JSON.stringify(latestInvoicesData);
    const invoices: LatestInvoice[] = JSON.parse(fetchedData);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-lg text-blue-500 md:text-lg`}>
        Last 5 Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-4">
          {invoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between h-14',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className={`${lusitana.className} truncate text-xs font-normal md:text-base`}>
                      {invoice.name}
                    </p>
                    <p className={`${lusitana.className} hidden text-xs text-blue-500 sm:block`}>
                      {invoice.invoice_number}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-normal md:text-base`}
                >
                  {formatCurrency(invoice.invoice_total_amount)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pt-2">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
