import { CustomerField, CustomersTable } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateCustomer } from '@/app/lib/actions';


export default function Form({customer} : {customer:CustomersTable}) {
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  return (
    <form action={updateCustomerWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">


        {/* Name */}
        <div className="mb-4">
          <label htmlFor="customerName" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerName"
                name="customerName"
                type="text"
                placeholder="Enter Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={customer.name}
              />
            </div>
          </div>
        </div>

        {/* Customer Type */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
          Customer Type
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="customerType"
                  name="customerType"
                  type="radio"
                  value="b2b"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  checked={customer.type === 'b2b'}
                />
                <label
                  htmlFor="customerType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2B <UserGroupIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="customerType"
                  name="customerType"
                  type="radio"
                  value="b2c"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  checked={customer.type === 'b2c'}
                />
                <label
                  htmlFor="customerType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2C <UserIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>


        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="customerEmail" className="mb-2 block text-sm font-medium">
            Customer Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerEmail"
                name="customerEmail"
                type="text"
                placeholder="Enter Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={customer.email}
              />
            </div>
          </div>
        </div>

        {/* Customer Contact Number */}
        <div className="mb-4">
          <label htmlFor="customerNumber" className="mb-2 block text-sm font-medium">
            Customer Contact Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerNumber"
                name="customerNumber"
                type="text"
                placeholder="Enter Contact Number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={customer.contact_number}
              />
            </div>
          </div>
        </div>

        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Customer</Button>
      </div>
    </form>
  );
}
