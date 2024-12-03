'use client';

import { CreateInvoiceForm, CreateQuoteForm, CurriencyField, CustomerField, EditQuoteForm as EIQ, InvoiceItem, InvoiceItemForm, LeadForm, PackageField, QuoteItemForm, TaxField } from '@/app/lib/definitions';
import {
  ArrowUturnLeftIcon,
  CurrencyRupeeIcon,
  CursorArrowRaysIcon,
  EnvelopeIcon,
  PlusIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useEffect, useState } from 'react';
import { Col, Row} from 'antd';
import styles from '@/app/ui/invoice.module.css';
import Image from 'next/image';

export default function ViewQuoteForm({ quote, quoteItemList }:
  { quote: EIQ, quoteItemList: QuoteItemForm[] }) {

  const [quoteItems, setQuoteItems] = useState<InvoiceItem[]>([]);

  useEffect(() => {
    let list = [...quoteItems];
    quoteItemList.map((item, i) => {
      let obj: InvoiceItem = {
        id: item.id,
        productId: item.product_id,
        productName: item.package_name,
        itemName: "",
        description: item.description,
        quantity: item.quantity,
        itemPrice: item.price,
        itemTotalAmount: item.total_amount
      };
      list[i] = obj;
    })
    setQuoteItems(list);
  }, []);


  const [formData, setFormData] = useState<CreateQuoteForm>({
    quoteId: quote.quote_id,
    customerId: quote.customer_id,
    leadId: quote.lead_id,
    quoteNumber: quote.quote_number,
    currencyId: quote.currency_id,
    currencySymbol: quote.currency_symbol,
    quoteStatus: quote.quote_status,
    quoteDate: quote.quote_date,
    quoteExpiryDate: quote.expiry_date,
    note: quote.note,
    quoteItems: quoteItems,
    quoteSubTotal: quote.quote_sub_amount,
    quoteTaxId: quote.tax_id,
    quoteTaxValue: quote.tax_slab,
    quoteTaxAmount: quote.tax_amount,
    quoteTotalAmount: quote.quote_total_amount
  });


  const emailQuote = () => {
    setFormData((prevData) => ({ ...prevData, quoteItems: quoteItems }));
    //updateInvoiceForm(formData);
  }



  return (
    // <form action={createInvoice}>
    <>

      <div className="container mx-auto bg-gray-50 pt-10 pd-10 border-b">
        <div className='rounded-md-50 pt-5 pb-5 bg-blue-600 text-white text-lg'>
          <h1 className={styles.h1}>Quotation</h1>
        </div>
        <div className="float-right rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mt-6 flex justify-end gap-4">

            <Button onClick={emailQuote}><EnvelopeIcon className="h-5" /> {" Quotation"}</Button>
            <Link
              href="/dashboard/quotes"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300"
            >
              <ArrowUturnLeftIcon className="h-5" />
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/Logo.jpg"
            width={300}
            height={100}
            className="block pt-10 pb-10 pl-10"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>

        <Row className='bg-gray-50 rounded-md-50 pt-16 pb-16 min-w-fit'>

          <div className="w-1/5 pl-10 bg-gray-50">
            <p>From : </p>
            <p>Sheeraz Tours pvt ltd
              Locknow - 560098
              (800) 555-1234</p>
          </div>
          <div className="w-1/5 pl-10 bg-gray-10">
            <p>{'To :'} </p>
            <p>Jonathan Neal 101 E. Chapman Ave
              Orange, CA 92866
              (800) 555-1234</p>
          </div>
          <div className="w-1/4 bg-gray-50"><p>{'  '}</p></div>
          <table className="w-1/3 pr-5 text-sm border-separate">
            <tbody>
              <tr>
                <th className="border p-1 text-center relative rounded border-solid border-gray-300 bg-gray-200"><span >Quote #</span></th>
                <td className="border p-1 text-center relative rounded border-solid border-gray-300 "><span >{quote.quote_number}</span></td>
              </tr>
              <tr>
                <th className="border p-1 text-center relative rounded border-solid border-gray-300 bg-gray-200"><span >Date</span></th>
                <td className="border p-1 text-center relative rounded border-solid border-gray-300 "><span >{quote.quote_date}</span></td>
              </tr>
              <tr>
                <th className="border p-1 text-center relative rounded border-solid border-gray-300 bg-gray-200"><span >Expiry Date</span></th>
                <td className="border p-1 text-center relative rounded border-solid border-gray-300 "><span>{quote.expiry_date}</span></td>
              </tr>
              <tr>
                <th className="border p-1 text-center relative rounded border-solid border-gray-300 bg-gray-200"><span >Amount Due</span></th>
                <td className="border p-1 text-center relative rounded border-solid border-gray-300 "><span> {Number(formData.quoteTotalAmount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}</span></td>
              </tr>
            </tbody>
          </table>
        </Row>



        <Row gutter={[12, 12]} style={{ position: 'relative' }} className='bg-gray-200 rounded-md-50 pt-2 pb-2 text-center'>
          <Col className="gutter-row border-b" span={5}>
            <p>{'Item'}</p>
          </Col>
          <Col className="gutter-row border-b" span={7}>
            <p>{'Description'}</p>
          </Col>
          <Col className="gutter-row border-b" span={3}>
            <p>{'Quantity'}</p>
          </Col>
          <Col className="gutter-row border-b" span={4}>
            <p>{'Price'}</p>
          </Col>
          <Col className="gutter-row border-b" span={4}>
            <p>{'Total'}</p>
          </Col>

        </Row>

        {quoteItems.map((data, i) => {
          return (
            <Row key={i} gutter={[12, 12]} style={{ position: 'relative' }} className='bg-gray-50 rounded-md-50'>
              <Col className="gutter-row border-b border-l text-center" span={5}>
                <div className="relative mt-5 rounded-md">
                  <p>{data.productName}</p>
                </div>
              </Col>
              <Col className="gutter-row border-b border-l text-center" span={7}>
                <div className="relative mt-5 rounded-md">
                  <p>{data.description}</p>
                </div>
              </Col>
              <Col className="gutter-row border-b border-l text-center" span={4}>
                <div className="relative mt-5 rounded-md">
                  <p>{data.quantity}</p>
                </div>
              </Col>
              <Col className="gutter-row border-b border-l text-center" span={4}>
                <div className="relative mt-5 rounded-md">
                  <p>{Number(data.itemPrice!).toLocaleString("en-US", { style: "currency", currency: "INR" })}</p>
                </div>
              </Col>
              <Col className="gutter-row border-b border-l text-center" span={4}>
                <div className="relative mt-5 rounded-md">
                  <p>{Number(data.itemTotalAmount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}</p>
                </div>
              </Col>
            </Row>
          );
        })}

        <Row gutter={[12, 12]} className='bg-gray-50 rounded-md-50'>
          <Col className="gutter-row" span={5}>
            <p>{' '}</p>
          </Col>
          <Col className="gutter-row" span={7}>
            <p>{' '}</p>
          </Col>
          <Col className="gutter-row" span={4}>
            <p>{' '}</p>
          </Col>
          <Col className="bg-gray-100 p-2 gutter-row border-b border-l  text-center" span={4}>
            <label htmlFor="subTotal" className="mb-2 block text-sm font-medium">
              Sub Total :
            </label>
          </Col>
          <Col className="p-2 gutter-row border-b border-l  text-center" span={4}>
            <div className="relative mt-2 rounded-md">
              <p>{Number(quote.quote_sub_amount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}</p>
            </div>
          </Col>

        </Row>

        <Row gutter={[12, 12]} className='bg-gray-50 rounded-md-50'>
          <Col className="gutter-row" span={5}>
            <p>{' '}</p>
          </Col>
          <Col className="gutter-row" span={7}>
            <p>{' '}</p>
          </Col>
          <Col className="gutter-row" span={4}>
            <p>{' '}</p>
          </Col>
          <Col className=" bg-gray-100 p-2 gutter-row border-b border-l text-center" span={4}>
            <div className="  mb-2 block text-sm font-medium">
              <p>{"Tax " + quote.tax_slab + "% : "}</p>
            </div>
          </Col>
          <Col className="p-2 gutter-row border-b border-l text-center" span={4}>
            <div className="relative mt-2 rounded-md">
              <p>{Number(quote.tax_amount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}</p>
            </div>
          </Col>

        </Row>

        <Row gutter={[12, 12]} className='bg-gray-50 rounded-md-50'>
          <Col className="gutter-row" span={5}>
            <p>{' '}</p>
          </Col>
          <Col className="gutter-row" span={7}>
            <p>{' '}</p>
          </Col>
          <Col className="gutter-row" span={4}>
            <p>{' '}</p>
          </Col>
          <Col className="bg-gray-100 p-2 gutter-row  border-b border-l text-center" span={4}>
            <label htmlFor="totalAmount" className=" text-sm font-medium">
              Total Amount :
            </label>
          </Col>
          <Col className="p-2 gutter-row border-b p-2 border-l text-center" span={4}>
            <div className="relative mt-2 rounded-md">
              <p>{Number(quote.quote_total_amount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}</p>
            </div>
          </Col>

        </Row>
      </div>
    </>
  );
}