import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function QuoteStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'sent' ? (
        <>
          Sent
          <CheckIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'negotiation' ? (
        <>
          Negotiation
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'finalized' ? (
        <>
          Finalized
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'invoiced' ? (
        <>
          Invoiced
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
