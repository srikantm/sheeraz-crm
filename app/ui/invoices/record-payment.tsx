'use client';

import {  CreatePaymentField,  EditInvoiceForm as EIF, PaymentModesField, PaymentsField } from '@/app/lib/definitions';
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  ClockIcon,
  HashtagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoicePayment } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Col, DatePicker, Divider, InputNumber, Row, Button as Btn } from 'antd';
import { lusitana } from '../fonts';

const iconMap = {
  invoice_total_amount: BanknotesIcon,
  amount_paid: BanknotesIcon,
  pending: ClockIcon,
  invoiceNumber: HashtagIcon,
  invoiceStatus:ChartBarSquareIcon
};

export default function EditInvoiceForm({ invoice, payments, paymentModes }:
  { invoice: EIF, payments: PaymentsField[], paymentModes: PaymentModesField[] }) {

  const [recordPayment, setRecordPayment] = useState<CreatePaymentField>({
    id: "",
    payment_mode: "",
    referenece_number: "",
    amount: 0,
    payment_date: "",
    invoice_id: invoice.invoice_id,
    description: "",
    total_amount_paid: invoice.amount_paid,
    total_invoice_amount: invoice.invoice_total_amount,
    invoice_status: invoice.invoice_status
  })

  const [error, setError] = useState('');

  console.log("recordPayment", recordPayment);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'paymentModeId') {
      setRecordPayment((prevData) => ({ ...prevData, payment_mode: value }));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'paymentReference') {
      setRecordPayment((prevData) => ({ ...prevData, referenece_number: value }));
    }
    if (name === 'amount') {

      const totalAmountPaid = Number(invoice.amount_paid) + Number(value);
      let invoiceStatus = invoice.invoice_status;
      if (Number(totalAmountPaid) === Number(invoice.invoice_total_amount)) {
        invoiceStatus = 'paid';
      } else {
        console.log("inside partially paid");
        invoiceStatus = 'partially paid';
      }
      setRecordPayment((prevData) => ({ ...prevData, amount: Number(value), invoice_status: invoiceStatus, total_amount_paid: totalAmountPaid }));
    }
    if (name === 'description') {
      setRecordPayment((prevData) => ({ ...prevData, description: value }));
    }
  }

  const handleDateChange = (paymentDate: Dayjs) => {
    const formatedDated = paymentDate.format('DD-MM-YYYY');
    setRecordPayment((prevData) => ({ ...prevData, payment_date: formatedDated }));
  }


  const savePayment = () => {
    if ((Number(invoice.invoice_total_amount) - Number(invoice.amount_paid)) >= Number(recordPayment.amount)) {
      updateInvoicePayment(recordPayment);
    } else {

    }
  }


  return (
    <>
      <div className='flex rounded-md gap-5 bg-gray-50 pl-10 pt-10 pb-10'>
        <Card title="Invoice Number" value={invoice.invoice_number} type="invoiceNumber" />
        <Card title="Invoice Total Amount" value={Number(invoice.invoice_total_amount!).toLocaleString("en-US", { style: "currency", currency: "INR" })} type="invoice_total_amount" />
        <Card title="Amount Paid" value={Number(invoice.amount_paid!).toLocaleString("en-US", { style: "currency", currency: "INR" })} type="amount_paid" />
        <Card title="Pending" value={Number(invoice.invoice_total_amount! - invoice.amount_paid!).toLocaleString("en-US", { style: "currency", currency: "INR" })} type="pending" />
        <Card title="Invoice Status" value={invoice.invoice_status} type="invoiceStatus" />
      </div>

      {invoice.invoice_total_amount !== invoice.amount_paid &&
        <>
          <div className='rounded-t-md gap-10 bg-gray-200 p-4 md:p-6'>
            <div className="flex flex-row">

              {/* Pament Mode */}
              <div className="p-2 mb-6 basis-1/4">
                <label htmlFor="paymentModeId" className="mb-2 block text-sm ">
                  Payment Mode
                </label>
                <div className="relative">
                  <select
                    id="paymentModeId"
                    name="paymentModeId"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2"
                    defaultValue={""}
                    onChange={(e) => handleSelectChange(e)}
                  >
                    <option value="" disabled>Select Payment Mode</option>
                    {paymentModes.map((paymentMode) => (
                      <option key={paymentMode.id} value={paymentMode.id}>{paymentMode.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reference Number */}
              <div className="p-2 mb-6 basis-1/4">
                <label htmlFor="paymentReference" className="mb-2 block text-sm ">
                  Reference Number
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="paymentReference"
                      name="paymentReference"
                      type='text'
                      placeholder='Reference Number'
                      onChange={(e) => handleChange(e)}
                      className="peer block w-full rounded-md border border-gray-100 text-sm outline-2 "
                    />
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="p-2 mb-6 basis-1/4">
                <label htmlFor="amount" className="mb-2 block text-sm">
                  Amount
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="amount"
                      name="amount"
                      type='number'
                      placeholder=' Amount'
                      onChange={(e) => handleChange(e)}
                      className="peer block w-full rounded-md border border-gray-100 text-sm outline-2"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2 mb-6 basis-1/4">
                <label htmlFor="paymentDate" className="mb-2 block text-sm">
                  Payment Date
                </label>
                <div className="relative">
                  <DatePicker className='h-10' style={{ width: '100%' }} format={'DD-MM-YYYY'} name="paymentDate" onChange={(e) => handleDateChange(e)} />
                </div>
              </div>

            </div>

          </div>

          <div className='rounded-b-md gap-10 bg-gray-200 p-4 md:p-6'>
            <div className="flex flex-row">



              {/* Description */}
              <div className="p-2 mb-4 basis-1/2">
                <label htmlFor="description" className="mb-2 block text-sm ">
                  Description
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="description"
                      name="description"
                      type='text'
                      placeholder='description'
                      onChange={(e) => handleChange(e)}
                      className="peer block w-full rounded-md border border-gray-100 text-sm outline-2 "
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end p-3">
                {/* <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link> */}
                <Button onClick={savePayment}>Record Payment</Button>
              </div>

            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </>
      }




      {payments.length > 0 && <div className="rounded-md bg-gray-50 p-3 sm:p-6">
        <div className="relative p-4 ">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Payments
          </label>
        </div>
        <div >
          <Row style={{ position: 'relative' }} className='border bg-gray-200 w-3/4 gap-2'>
            <Col className="p-2 w-1/4" span={4}>
              <p>{'Payment Id'}</p>
            </Col>
            <Col className="p-2 w-1/4 border-l" span={6}>
              <p>{'Payment Mode'}</p>
            </Col>
            <Col className="p-2 w-1/4 border-l" span={7}>
              <p>{'Reference Number'}</p>
            </Col>
            <Col className="p-2 w-1/4 border-l" span={5}>
              <p>{'Amount'}</p>
            </Col>
          </Row>
          {payments.map((data, i) => {
            return (
              <>
                <Row style={{ position: 'relative' }} className='border w-3/4 gap-2'>
                  <Col className="p-3 w-1/4" span={4}>
                    <p>{data.id}</p>
                  </Col>
                  <Col className="p-3 w-1/4 border-l" span={6}>
                    <p>{data.payment_mode}</p>
                  </Col>
                  <Col className="p-3 w-1/4 border-l" span={7}>
                    <p>{data.reference_number}</p>
                  </Col>
                  <Col className="p-3 w-1/4 border-l" span={5}>
                    <p>{Number(data.amount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}</p>
                  </Col>
                </Row>
              </>
            );
          })}
        </div>

      </div>}
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
  type: 'invoice_total_amount' | 'amount_paid' | 'pending' | 'invoiceNumber' | 'invoiceStatus';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-1 shadow-md  h-24">
      <div className="flex p-1">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h4 className="ml-2 text-sm font-medium">{title}</h4>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white pt-2 text-center w-44 text-md`}
      >
        {value}
      </p>
    </div>
  );
}