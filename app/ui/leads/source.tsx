import {ArrowDownCircleIcon,
  GlobeAltIcon,
  PhoneIcon,} from '@heroicons/react/24/outline';
 import clsx from 'clsx';
 
 export default function LeadSource({ source }: { source: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1.5 text-xs',
        {
          'bg-white text-yellow-600': source === 'direct',
          'bg-white text-purple-600': source === 'phone',
          'bg-white text-blue-600': source === 'web',
        },
      )}
    >
      {source === 'direct' ? (
        <>
          Direct
          <ArrowDownCircleIcon className="ml-1 w-4 text-yellow-700" />
        </>
      ) : null}
      {source === 'phone' ? (
        <>
          Phone
          <PhoneIcon className="ml-1 w-4 text-purple-600" />
        </>
      ) : null}
      {source === 'web' ? (
        <>
          Web
          <GlobeAltIcon className="ml-1 w-4 text-blue-600" />
        </>
      ) : null}
    </span>
  );
}
