import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredLeads } from '@/app/lib/data';
import LeadStatus from './status';
import { UpdateLead } from './buttons';
import LeadType from './type';
import LeadSource from './source';

export default async function LeadsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const leads = await fetchFilteredLeads(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {leads?.map((lead) => (
              <div
                key={lead.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{lead.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{lead.customer_name}</p>
                  </div>
                  {/* <InvoiceStatus status={lead.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {lead.lead_amount}
                    </p>
                    <LeadStatus status={lead.lead_status} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateLead id={lead.id} />
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
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Source
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lead Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customer Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lead Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Lead Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Expected Close Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {leads?.map((lead) => (
                <tr
                  key={lead.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{lead.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p><LeadSource source={lead.source} /></p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <LeadType type={lead.lead_type} /> */}
                    {lead.lead_type === 'b2b' && 'B2B'}
                    {lead.lead_type === 'b2c' && 'B2C'}
                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lead.customer_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lead.lead_amount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <LeadStatus status={lead.lead_status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lead.expected_close_date} 
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLead id={lead.id} />
                      {/* <DeleteInvoice id={lead.id} /> */}
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
