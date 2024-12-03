import {
    ArrowDownCircleIcon,
    GlobeAltIcon,
    PhoneIcon,} from '@heroicons/react/24/outline';
 import clsx from 'clsx';
 
 export default function LeadType({ type }: { type: string }) {
   return (
     <span
       className={clsx(
         'inline-flex items-center rounded-full px-3 py-1.5 text-xs',
         {
           'bg-gray-200 text-yellow-600': type === 'direct',
           'bg-gray-200 text-purple-600': type === 'phone',
           'bg-gray-200 text-blue-600': type === 'web',
         },
       )}
     >
       {type === 'direct' ? (
         <>
           Direct
           <ArrowDownCircleIcon className="ml-1 w-4 text-yellow-700" />
         </>
       ) : null}
       {type === 'phone' ? (
         <>
           Phone
           <PhoneIcon className="ml-1 w-4 text-blue-500" />
         </>
       ) : null}
       {type === 'negotiation' ? (
         <>
           Web
           <GlobeAltIcon className="ml-1 w-4 text-purple-500" />
         </>
       ) : null}
     </span>
   );
 }
 