import { BanknotesIcon, CheckIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-blue-100 text-blue-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
          'bg-red-500 text-white': status === 'cancelled',
          'bg-green-200 text-white': status === 'partially paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <BanknotesIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'partially paid' ? (
        <>
          Partially Paid
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'cancelled' ? (
        <>
          Cancelled
          <XCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}


    </span>
  );
}
