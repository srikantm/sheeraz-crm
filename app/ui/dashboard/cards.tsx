import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  leads:InboxIcon,
  totalLeadsAmount : BanknotesIcon,
  totalAmountLeadsWon:HandThumbUpIcon
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
    totalLeadCount,
    totalLeadAmount,
    totalLeadWon
  } = await fetchCardData();
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}


      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Invoice Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Invoice Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers"/>
      <Card title="Total Leads" value={totalLeadCount} type="leads"/>
      <Card title="Total Leads Amount" value={totalLeadAmount} type="totalLeadsAmount"/>
      <Card title="Total Amount Leads Won" value={totalLeadWon} type="totalAmountLeadsWon"/>
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'leads' | 'totalLeadsAmount' | 'totalAmountLeadsWon';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-3 shadow-sm w-60">
      <div className="flex p-1 justify-center">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h4 className={`${lusitana.className} ml-2 text-base text-gray-700`}>{title}</h4>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white text-gray-700 px-4 py-4 text-center text-md`}
      >
        {value}
      </p>
    </div>
  );
}
