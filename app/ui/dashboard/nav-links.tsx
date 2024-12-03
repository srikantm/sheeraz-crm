'use client'

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BanknotesIcon,
  InboxArrowDownIcon,
  InboxStackIcon,
  InboxIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { lusitana } from '../fonts';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: IdentificationIcon },
  { name: 'Leads', href: '/dashboard/leads', icon: InboxIcon },
  { name: 'Quotes', href: '/dashboard/quotes', icon: InboxStackIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: InboxArrowDownIcon,
  },
  {
    name: 'Payments',
    href: '/dashboard/payments',
    icon: BanknotesIcon,
  },
  {
    name: 'Products',
    href: '/dashboard/products',
    icon: BanknotesIcon,
  }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-blue-600 text-white': pathname === link.href,
              },
              {
                'bg-gray-50 text-blue-800': pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className={`text-sm hidden md:block`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
