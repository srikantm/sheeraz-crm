import {ClipboardDocumentListIcon,
   ClipboardDocumentCheckIcon,
    HandThumbUpIcon,
     ClipboardDocumentIcon,
      HandThumbDownIcon,
    ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function LeadStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1.5 text-xs',
        {
          'bg-yellow-200 text-yellow-700': status === 'draft',
          'bg-blue-200 text-blue-600': status === 'new',
          'bg-purple-200 text-purple-600': status === 'negotiation',
          'bg-red-300 text-red-700': status === 'lost',
          'bg-gray-200 text-gray-700': status === 'cancelled',
          'bg-blue-100 text-white-500': status === 'assigned',
          'bg-yellow-100 text-white-500': status === 'onhold',
          'bg-green-200 text-green-700': status === 'won',
        },
      )}
    >
      {status === 'draft' ? (
        <>
          Draft
          <ClipboardDocumentIcon className="ml-1 w-4 text-yellow-700" />
        </>
      ) : null}
      {status === 'new' ? (
        <>
          New
          <ClipboardDocumentListIcon className="ml-1 w-4 text-blue-500" />
        </>
      ) : null}
      {status === 'negotiation' ? (
        <>
          Negotiation
          <ClipboardDocumentCheckIcon className="ml-1 w-4 text-purple-500" />
        </>
      ) : null}
      {status === 'lost' ? (
        <>
          Lost
          <HandThumbDownIcon className="ml-1 w-4 text-Red-700" />
        </>
      ) : null}
      {status === 'won' ? (
        <>
          Won
          <HandThumbUpIcon className="ml-1 w-4 text-green-700" />
        </>
      ) : null}
      {status === 'cancelled' ? (
        <>
          Cancelled
          <ArchiveBoxXMarkIcon className="ml-1 w-4 text-gray-700" />
        </>
      ) : null}
    </span>
  );
}
