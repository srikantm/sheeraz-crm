import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CurrencyRupeeIcon,
  ArrowDownCircleIcon,
  GlobeAltIcon,
  PhoneIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,ClipboardDocumentListIcon, ClipboardDocumentCheckIcon, HandThumbUpIcon, ClipboardDocumentIcon, HandThumbDownIcon,
  ArchiveBoxXMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createLead } from '@/app/lib/actions';
import { DatePicker } from 'antd';
import { CreateCustomer } from './buttons';


export default function Form({ customers }: { customers: CustomerField[] }) {
  return (
    <form action={createLead}>

      {/* Desktop Version*/}
      <div className="rounded-md bg-gray-50 p-4 hidden md:block">
      <div className="flex">
        {/* Lead Title */}
        <div className="p-3 mb-4 basis-1/4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter Lead Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Lead Description */}
        <div className=" p-3 mb-4 basis-3/4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter Lead Description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        </div>

        {/* Customer Name */}
        <div className="flex p-3">
        <div className="p-3 mb-4 basis-1/3.9">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="flex relative gap-4">
           
            <select
              id="customerId"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" href=''/>
            <CreateCustomer/>
          </div>
          
        </div>

        {/* Lead Source */}
        <div className='md-4 basis1/4 p-3'>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Lead Source
          </legend>
          <div className="p-3 rounded-md border border-gray-200 bg-white">
            <div className="flex gap-2">
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  value="web"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="web"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                >
                  Web <GlobeAltIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  value="phone"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="source"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-purple-600"
                >
                  Phone <PhoneIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  value="direct"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="source"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-yellow-600"
                >
                  Direct <ArrowDownCircleIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        </div>

        {/* Lead Type */}
        <div className='md-4 basis1/4 p-3'>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Lead Type
          </legend>
            <div className="flex gap-2 p-3 rounded-md border border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  id="leadType"
                  name="leadType"
                  type="radio"
                  value="b2b"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2B <UserGroupIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadType"
                  name="leadType"
                  type="radio"
                  value="b2c"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2C <UserIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
        </fieldset>
        </div>
        </div>

        <div className="flex">
        {/* Lead Expiry Date */}
        <div className="mb-4 basis-1/4 p-3">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Expected Close Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} name='expectedCloseDate' />
            </div>
          </div>
        </div>



        {/* Sales Owner */}
        {/* <div className="mb-4">
          <label htmlFor="assignedUser" className="mb-2 block text-sm font-medium">
            Sales Owner
          </label>
          <div className="relative">
            <select
              id="assignedUser"
              name="assignedUser"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Assign User
              </option>
              <option key="1" value="admin">
                  Admin
                </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div> */}


        {/* Lead Amount */}
        <div className="mb-4 basis-1/4 p-3">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lead Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="leadAmount"
                name="leadAmount"
                type="number"
                placeholder="Lead Value"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />

              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        </div>

        {/* Lead Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Lead status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="draft"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-3 py-1.5 text-xs font-medium text-yellow-700"
                >
                  Draft <ClipboardDocumentIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="new"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700"
                >
                  New <ClipboardDocumentListIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="negotiation"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-purple-200 px-3 py-1.5 text-xs font-medium text-purple-700"
                >
                  Negotiation <ClipboardDocumentCheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="won"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-200 px-3 py-1.5 text-xs font-medium text-green-700"
                >
                  Won <HandThumbUpIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="lost"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-200 px-3 py-1.5 text-xs font-medium text-red-700"
                >
                  Lost <HandThumbDownIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="cancelled"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  Cancelled <ArchiveBoxXMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Mobile Version */}
      <div className="rounded-md bg-gray-50 p-4 block md:hidden">
        {/* Lead Title */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter Lead Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Lead Description */}
        <div className=" p-3 mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter Lead Description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Customer Name */}
        <div className="mb-4 p-3">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customerId"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Lead Source */}
        <fieldset className='p-3'>
          <legend className="mb-2 block text-sm font-medium">
            Lead Source
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] p-3">
            <div className="flex gap-1">
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  value="web"
                  className="h-3 w-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="web"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                >
                  Web <GlobeAltIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  value="phone"
                  className="h-3 w-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="source"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-purple-600"
                >
                  Phone <PhoneIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  value="direct"
                  className="h-3 w-3 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="source"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-yellow-600"
                >
                  Direct <ArrowDownCircleIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Lead Type */}
        <fieldset className='p-3'>
          <legend className="mb-2 block text-sm font-medium">
            Lead Type
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] p-3">
            <div className="flex gap-2">
              <div className="flex items-center">
                <input
                  id="leadType"
                  name="leadType"
                  type="radio"
                  value="b2b"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2B <UserGroupIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadType"
                  name="leadType"
                  type="radio"
                  value="b2c"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2C <UserIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Lead Expiry Date */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Expected Close Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} name='expectedCloseDate' />
            </div>
          </div>
        </div>



        {/* Sales Owner */}
        {/* <div className="mb-4">
          <label htmlFor="assignedUser" className="mb-2 block text-sm font-medium">
            Sales Owner
          </label>
          <div className="relative">
            <select
              id="assignedUser"
              name="assignedUser"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Assign User
              </option>
              <option key="1" value="admin">
                  Admin
                </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div> */}


        {/* Lead Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lead Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="leadAmount"
                name="leadAmount"
                type="number"
                placeholder="Lead Value"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />

              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lead Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Lead status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="draft"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-3 py-1.5 text-xs font-medium text-yellow-700"
                >
                  Draft <ClipboardDocumentIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center pl-10">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="new"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700"
                >
                  New <ClipboardDocumentListIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="negotiation"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-purple-200 px-3 py-1.5 text-xs font-medium text-purple-700"
                >
                  Negotiation <ClipboardDocumentCheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="won"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-200 px-3 py-1.5 text-xs font-medium text-green-700"
                >
                  Won <HandThumbUpIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="lost"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-200 px-3 py-1.5 text-xs font-medium text-red-700"
                >
                  Lost <HandThumbDownIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center pl-10">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  value="cancelled"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  Cancelled <ArchiveBoxXMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/leads"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Lead</Button>
      </div>
    </form>
  );
}
