import { BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function LeadsCRMLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row p-3 justify-center leading-none  text-white`}
    >
      <BoltIcon className="h-8 w-8" />
      <p className='text-xl'>LEADS CRM</p>
    </div>
  );
}
