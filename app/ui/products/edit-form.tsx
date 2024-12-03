'use client';

import { CreateInvoiceForm, CurriencyField, CustomerField, EditInvoiceForm as EIF, InvoiceItem, InvoiceItemForm, LeadForm, PackageField, TaxField } from '@/app/lib/definitions';
import {
  CurrencyRupeeIcon,
  PlusIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice, updateInvoiceForm } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Col, DatePicker, Divider, InputNumber, Row, Button as Btn } from 'antd';

export default function EditInvoiceForm({ invoice, customers, currencies, taxes, packages, invoiceItemList, leads }:
   { invoice:EIF, customers: CustomerField[], currencies: CurriencyField[], taxes: TaxField[], packages: PackageField[], invoiceItemList:InvoiceItemForm[], leads:LeadForm[] }) {

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  useEffect(() => { 
    let list = [...invoiceItems];
    invoiceItemList.map((item, i)=>{
      let obj:InvoiceItem = {
        id:item.id,
        productId:item.product_id,
        productName:"",
        itemName: "",
        description: item.description,
        quantity: item.quantity,
        itemPrice: item.price,
        itemTotalAmount: item.total_amount
      };
      list[i] = obj;
    })
    setInvoiceItems(list);
  },[]);

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, {id:"", productId:'',itemName: '',productName:"", description: '', quantity: 0, itemPrice: 0, itemTotalAmount: 0 }]);
  }


  const [formData, setFormData] = useState<CreateInvoiceForm>({
    invoiceId: invoice.invoice_id,
    customerId: invoice.customer_id,
    leadId:invoice.lead_id,
    invoiceNumber: invoice.invoice_number,
    currencyId: invoice.currency_id,
    currencySymbol: invoice.currency_symbol,
    invoiceStatus: invoice.invoice_status,
    invoiceDate: invoice.invoice_date,
    invoiceExpiryDate: invoice.expiry_date,
    note: invoice.note,
    invoiceItems: invoiceItems,
    invoiceSubTotal: invoice.invoice_sub_amount,
    invoiceTaxId: invoice.tax_id,
    invoiceTaxValue: invoice.tax_slab,
    invoiceTaxAmount: invoice.tax_amount,
    invoiceTotalAmount: invoice.invoice_total_amount
  });


  const editInvoice = () => {
    setFormData((prevData) => ({ ...prevData, invoiceItems: invoiceItems }));
    updateInvoiceForm(formData);
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name == 'leadId') {
      let customerId = '';
      leads.map((data, i)=>{
        if(data.lead_id == value){
          customerId = data.customer_id;
        }
      })
      setFormData((prevData) => ({ ...prevData, leadId: value, customerId:customerId }));
      return;
    }

    if (name == 'customerId') {
      setFormData((prevData) => ({ ...prevData, customerId: value }));
      return;
    }
    if (name === 'currencyId') {
      let currencySymbol = '';
      currencies.map((d, i) => {
        if (value == d.id) {
          currencySymbol = d.symbol;
        }
      })
      setFormData((prevData) => ({ ...prevData, currencyId: value, currencySymbol: currencySymbol }));
      return;
    }
    if (name === 'invoiceStatus') {
      setFormData((prevData) => ({ ...prevData, invoiceStatus: value }));
      return;
    }

    if (name === 'taxRate') {

      let taxValue = 0;
      taxes.map((d, i) => {
        if (value == d.id) {
          taxValue = d.value;
        }
      })
      let subTotal = 0;
      invoiceItems.map((item, i) => {
        subTotal += item.quantity! * item.itemPrice!;
      });
      let invoiceTaxAmount = (taxValue / 100) * subTotal;
      let totalInvoiceAmount = subTotal + invoiceTaxAmount;
      setFormData((prevData) => ({
        ...prevData, invoiceTaxId: value,
        invoiceTaxValue: taxValue,
        invoiceSubTotal: subTotal,
        invoiceTaxAmount: invoiceTaxAmount,
        invoiceTotalAmount: totalInvoiceAmount
      }));
      return;
    }

  }

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>, index:number) => {
    const {name, value} = e.target;
    if(name === 'productId'){
      const list = [...invoiceItems];
      list[index].productId = value;
      setInvoiceItems(list);
      return;
    }
  }

  const handleDateChange = (date: Dayjs, name: string) => {
    const formatedDated = date.format('DD-MM-YYYY');
    if (name === 'invoiceDate') {
      setFormData((prevData) => ({ ...prevData, invoiceDate: formatedDated }));
      return;
    }
    if (name === 'invoiceExpiryDate') {
      setFormData((prevData) => ({ ...prevData, invoiceExpiryDate: formatedDated }));
      return;
    }
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'note') {
      setFormData((prevData) => ({ ...prevData, note: value }));
      return;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    if (name === 'itemName') {
      const list = [...invoiceItems];
      list[index].itemName = value;
      setInvoiceItems(list);
      return;
    }
    if (name === 'itemDescription') {
      const list = [...invoiceItems];
      list[index].description = value;
      setInvoiceItems(list);
      return;
    }
  }

  const handleInputNumberChange = (value: number | null, index: number, name: string) => {
    if (name === 'itemQuantity') {
      const list = [...invoiceItems];
      list[index].quantity = value;
      list[index].itemTotalAmount = (list[index].itemPrice! * value!)
      setInvoiceItems(list);
      return;
    }
    if (name === 'itemPrice') {
      const list = [...invoiceItems];
      list[index].itemPrice = value;
      list[index].itemTotalAmount = (list[index].quantity! * value!)
      setInvoiceItems(list);
      return;
    }
    if (name === 'itemTotalAmount') {
      const list = [...invoiceItems];
      list[index].itemTotalAmount = value;
      setInvoiceItems(list);
      return;
    }
  }

  useEffect(() => {
    let subTotal = 0;
    invoiceItems.map((item, i) => {
      subTotal += item.quantity! * item.itemPrice!;
    });
    let invoiceTaxAmount = (formData.invoiceTaxValue / 100) * subTotal;
    let totalInvoiceAmount = subTotal + invoiceTaxAmount;
    setFormData((prevData) => ({ ...prevData, invoiceSubTotal: subTotal, invoiceTaxAmount: invoiceTaxAmount, invoiceTotalAmount: totalInvoiceAmount, invoiceItems: invoiceItems }));
  }, [invoiceItems]);

  return (
    // <form action={createInvoice}>
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex flex-wrap">

          {/* Lead Title */}
          <div className="p-3 mb-5 basis-1/4">
            <label htmlFor="leadId" className="mb-2 block text-sm font-medium">
              Lead
            </label>
            <div className="relative">
              <select
                id="leadId"
                name="leadId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={formData.leadId}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="" disabled>Select Lead</option>
                {leads.map((lead) => (
                  <option key={lead.lead_id} value={lead.lead_id}>{lead.title}</option>
                ))}

              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Customer Name */}
          <div className="p-3 mb-5 basis-1/4">
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
              Customer
            </label>
            <div className="relative">
              <select
                id="customerId"
                name="customerId"
                className="peer block w-full cursor-pointer rounded-md border bg-gray-100 border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={formData.customerId}
                onChange={(e) => handleSelectChange(e)}
                disabled
              >
                <option value="" disabled>Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}

              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Invoice Number */}
          <div className="p-3 mb-5 basis-1/4">
            <label htmlFor="invoiceNumber" className="mb-2 block text-sm font-medium">
              Invoice Number
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  disabled
                  className="peer block w-full rounded-md border bg-gray-100 border-gray-100 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* </div>
          <div className="flex flex-row"> */}
          {/* Currency */}
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="currencyId" className="mb-2 block text-sm font-medium">
              Currency
            </label>
            <div className="relative">
              <select
                id="currencyId"
                name="currencyId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={formData.currencyId}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="" disabled>Select Currency</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>{currency.symbol + "(" + currency.name + ")"} </option>
                ))}
              </select>
              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>


          

        </div>

        <div className="flex flex-wrap">
          {/* Invoice Status */}
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="invoiceStatus" className="mb-2 block text-sm font-medium">
              Status
            </label>
            <div className="relative">
              <select
                id="invoiceStatus"
                name="invoiceStatus"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={formData.invoiceStatus}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="" disabled>Select a Status</option>
                {/* <option key="1" value="INR">₹-INR</option> */}
                <option key="1" value="pending">Pending</option>
                <option key="4" value="partially paid">Partially Paid</option>
                <option key="6" value="paid">Paid</option>
                <option key="5" value="rejected">Cancelled</option>

              </select>
            </div>
          </div>

          {/* InvoiceDate */}
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="invoiceDate" className="mb-2 block text-sm font-medium">
              Date
            </label>
            <div className="relative">
              <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} 
              value={dayjs(formData.invoiceDate, 'DD-MM-YYYY', 'es')}
              onChange={(e) => handleDateChange(e, 'invoiceDate')} />
            </div>
          </div>
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="invoiceExpiryDate" className="mb-2 block text-sm font-medium">
              Expiry Date
            </label>

            <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} 
            value={dayjs(formData.invoiceExpiryDate, 'DD-MM-YYYY', 'es')}
            onChange={(e) => handleDateChange(e, 'invoiceExpiryDate')} />

          </div>
          <div className="p-3 mb-4 basis-1/4">
            <label htmlFor="note" className="mb-2 block text-sm font-medium">
              Note
            </label>
            <div className="grow h-20" >
              <textarea
                id="note"
                name="note"
                placeholder="note ..."
                className="peer block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
                onChange={(e) => handleTextAreaChange(e)}
                value={formData.note}
              />
            </div>
          </div>
        </div>

        <Divider dashed style={{ borderColor: '#cccccc' }} />

        <div >
          <Row gutter={[12, 12]} style={{ position: 'relative' }}>
            <Col className="gutter-row" span={5}>
              <p>{'Item'}</p>
            </Col>
            <Col className="gutter-row" span={7}>
              <p>{'Description'}</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>{'Quantity'}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <p>{'Price'}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <p>{'Total'}</p>
            </Col>

          </Row>

          {invoiceItems.map((data, i) => {
            return (
              <Row key={i} gutter={[12, 12]} style={{ position: 'relative' }}>
                <Col className="gutter-row" span={5}>
                  <div className="relative mt-2 rounded-md">
                    {/* <div className="relative">
                      <input
                        id="itemName"
                        name="itemName"
                        type="text"
                        placeholder="Item Name"
                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                        onChange={(e) => handleInputChange(e, i)}
                        value={invoiceItems[i].itemName}
                      />
                    </div> */}
                    <div className="relative">
                      <select
                        id="productId"
                        name="productId"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
                        value={invoiceItems[i].productId}
                        onChange={(e) => handleProductChange(e, i)}
                        defaultValue={""}
                      >
                        <option value="" disabled>Select Product</option>
                        {packages.map((pckage) => (
                          <option key={pckage.id} value={pckage.id}>{pckage.package_name} </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Col>
                <Col className="gutter-row" span={7}>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <input
                        id="itemDescription"
                        name="itemDescription"
                        type="text"
                        placeholder="Discription"
                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                        onChange={(e) => handleInputChange(e, i)}
                        value={invoiceItems[i].description}
                      />
                    </div>
                  </div>
                </Col>
                <Col className="gutter-row" span={3}>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">

                      <InputNumber
                        min={0}
                        controls={false}
                        onChange={(e) => handleInputNumberChange(e, i, 'itemQuantity')}
                        value={invoiceItems[i].quantity}
                      />
                    </div>
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <InputNumber
                        min={0}
                        controls={false}
                        addonBefore={formData.currencySymbol}
                        onChange={(e) => handleInputNumberChange(e, i, 'itemPrice')}
                        value={invoiceItems[i].itemPrice}
                      />
                    </div>
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <InputNumber
                        min={0}
                        controls={false}
                        addonBefore={formData.currencySymbol}
                        onChange={(e) => handleInputNumberChange(e, i, 'itemTotalAmount')}
                        value={(invoiceItems[i].quantity! * invoiceItems[i].itemPrice!)}
                        disabled
                      />
                    </div>
                  </div>
                </Col>

                <div>
                  <button className="rounded-md border p-2 hover:bg-gray-100"
                    onClick={() => {
                      const newArr = [...invoiceItems];
                      newArr.splice(i, 1);
                      setInvoiceItems(newArr);
                    }}>
                    <TrashIcon className="w-5 h-4" />
                  </button>
                </div>
              </Row>
            );
          })}
          <div style={{ paddingTop: 15 }}>
            <Btn
              key={'addField'}
              type="dashed"
              onClick={() => addInvoiceItem()}
              block
              icon={<PlusIcon />}
              style={{ paddingTop: 5 }}
            >
              {'Add field'}
            </Btn>
          </div>

          <Row gutter={[12, 12]} style={{ position: 'relative', paddingTop: 15 }}>
            <Col className="gutter-row" span={5}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={7}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <label htmlFor="subTotal" className="mb-2 block text-sm font-medium" style={{ textAlign: "right", alignContent: "center", paddingTop: 5 }}>
                Sub Total :
              </label>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="relative">
                <InputNumber
                  min={0}
                  controls={false}
                  addonBefore={formData.currencySymbol}
                  value={formData.invoiceSubTotal}
                  disabled
                />
              </div>
            </Col>

          </Row>

          <Row gutter={[12, 12]} style={{ position: 'relative', paddingTop: 15 }}>
            <Col className="gutter-row" span={5}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={7}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <select
                id="taxRate"
                name="taxRate"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={(e) => handleSelectChange(e)}
                defaultValue={""}
                value={formData.invoiceTaxId}
              >
                <option value="" disabled>Select Tax</option>
                {taxes.map((tax) => (
                  <option key={tax.id} value={tax.id}>{tax.name + " - " + tax.value + "%"}</option>
                ))}
              </select>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="relative">
                <InputNumber
                  min={0}
                  controls={false}
                  addonBefore={formData.currencySymbol}
                  value={formData.invoiceTaxAmount}
                  disabled
                />
              </div>
            </Col>

          </Row>

          <Row gutter={[12, 12]} style={{ position: 'relative', paddingTop: 15 }}>
            <Col className="gutter-row" span={5}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={7}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>{' '}</p>
            </Col>
            <Col className="gutter-row" span={4}>
              <label htmlFor="totalAmount" className="mb-2 block text-sm font-medium" style={{ textAlign: "right", alignContent: "center", paddingTop: 5 }}>
                Total Amount :
              </label>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="relative">
                <InputNumber
                  min={0}
                  controls={false}
                  addonBefore={formData.currencySymbol}
                  value={formData.invoiceTotalAmount}
                  disabled
                />
              </div>
            </Col>

          </Row>
        </div>


        {/* <Divider dashed style={{ borderColor: '#9c9c9c' }} /> */}

        {/* ---------------- */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button onClick={editInvoice}>Update Invoice</Button>
      </div>
    </>
  );
}