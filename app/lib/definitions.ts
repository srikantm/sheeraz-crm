// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import exp from "constants";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
  status: string;
  created_at:string;
  updated_at:string;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  invoice_number:string;
  invoice_total_amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CrmInvoicesTable = {
  id: string;
  invoice_number: string;
  customer_name: string;
  invoice_total_amount: number;
  invoice_date: string;
  invoice_status: string;
};

export type CreatePackageFormData = {
  packageName:string;
  packageCode:string;
  packageTypeDomesticTours:string;
  packageTypeInternationalTours:string;
  packageThemeFamily:string;
  packageThemeHoneymoonSpecial:string;
  packageThemeCustomizedHolidays:string;
  packageThemePopular:string;
  packageThemeSpecialValueFD:string;
  packageThemePiligrimage:string;
  packageIncludesMeals:string;
  packageIncludesHotels:string;
  packageIncludesSightSeeing:string;
  packageIncludesTransfers:string;
}

export type DepartureCityDateData = {
  cityId:string;
  departureDate:string;
}

export type CrmProductsTable = {
  package_id: string;
  package_name: string;
  package_type: string;
  theme_type: string;
  adult_rate: number;
};

export type DashboardCountData = {
  invoice_count:number;
  customer_count:number;
  paid:number;
  pending:number;
  lead_count:number;
  total_lead_amount:number;
  total_lead_won:number;
}

export type CrmQuotesTable = {
  id: string;
  quote_number: string;
  customer_name: string;
  quote_total_amount: number;
  quote_date: string;
  quote_status: string;
};

export type LeadsTable = {
  id: string;
  title: string;
  customer_id: string;
  customer_name: string;
  source: string;
  lead_type: string;
  lead_status:string;
  lead_amount : string;
  expected_close_date : string;
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  contact_number: string;
  type: string;
};

export type PaymentsTable = {
  payment_id: number;
  invoice_number: string;
  payment_mode: string;
  reference_number: string;
  amount: number;
  payment_date : string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};


export type PackageRateField = {
  id :string;
  package_name :string;
  package_rate_type:string;
  guest_sharing_type:string;
  adult_rate:number;
  child_rate_with_bed:number|null;
  child_rate_without_bed:number|null;
  infant_rate:number|null;

}

export type CurriencyField = {
  id : string,
  name : string;
  symbol : string;
  code : string;
  thousand_seperator : string;
}

export type TaxField = {
  id: string;
  name: string;
  value:number;
}; 

export type PaymentsField = {
  id: string;
  payment_mode:string;
  reference_number:string;
  amount:number;
  payment_date:string;
}; 

export type CreatePaymentField = {
  id: string;
  payment_mode:string;
  referenece_number:string;
  amount:number;
  payment_date:string;
  invoice_id:string;
  description:string;
  total_amount_paid:number;
  invoice_status:string;
  total_invoice_amount:number;
}; 

export type PaymentModesField = {
  id: string;
  name:string;
  description:string;
}; 



export type PackageField = {
  id: string;
  package_name: string;
}; 

export type PackageRateTypeField = {
  packageId: string;
  packageRateType: string;
}; 

export type PackageGuestTypeField = {
  packageId: string;
  packageRateType: string;
  packageGuestSharingType:string;
}; 

export type PackageRatesField = {
  packageId: string;
  packageRateType: string;
  packageGuestSharingType:string;
  adult_rate:number;
  child_rate_with_bed:number | null;
  child_rate_without_bed: number | null;
  infant_rate:number | null;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type EditInvoiceForm = {
  invoice_id: string;
  lead_id:string;
  invoice_number : string;
  customer_id: string;
  currency_id:string;
  currency_symbol:string;
  invoice_status:string;
  invoice_date:string;
  expiry_date:string;
  note:string;
  tax_id:string;
  tax_slab:number;
  invoice_sub_amount:number;
  tax_amount:number;
  invoice_total_amount:number;
  amount_paid:number;
};

export type EditQuoteForm = {
  quote_id: string;
  lead_id:string;
  quote_number : string;
  customer_id: string;
  currency_id:string;
  currency_symbol:string;
  quote_status:string;
  quote_date:string;
  expiry_date:string;
  note:string;
  tax_id:string;
  tax_slab:number;
  quote_sub_amount:number;
  tax_amount:number;
  quote_total_amount:number;
};

export type LeadForm = {
  lead_id: string;
  customer_id :string;
  title: string;
  description: string;
  source: string;
  lead_type: string;
  lead_amount: number;
  expected_close_date: string;
  lead_status: string;
};

export type CreateInvoiceForm = {
  invoiceId:string;
  customerId:string;
  leadId:string;
  invoiceNumber:string;
  currencyId:string;
  currencySymbol:string;
  invoiceStatus:string;
  invoiceDate:string;
  invoiceExpiryDate:string;
  note:string;
  invoiceItems:InvoiceItem[];
  invoiceSubTotal:number|null;
  invoiceTaxId:string;
  invoiceTaxValue:number;
  invoiceTaxAmount:number|null;
  invoiceTotalAmount:number|null;
}

export type CreateQuoteForm = {
  quoteId:string;
  customerId:string;
  leadId:string;
  quoteNumber:string;
  currencyId:string;
  currencySymbol:string;
  quoteStatus:string;
  quoteDate:string;
  quoteExpiryDate:string;
  note:string;
  quoteItems:InvoiceItem[];
  quoteSubTotal:number|null;
  quoteTaxId:string;
  quoteTaxValue:number;
  quoteTaxAmount:number|null;
  quoteTotalAmount:number|null;
}

export type InvoiceItem = {
  id:string;
  productId:string;
  productName:string;
  itemName:string;
  description:string;
  quantity:number|null;
  itemPrice:number|null;
  itemTotalAmount:number|null;
}

export type InvoiceItemForm = {
  id:string;
  invoice_id:string;
  product_id:string;
  package_name:string;
  description:string;
  quantity:number|null;
  price:number|null;
  total_amount:number|null;
}

export type QuoteItemForm = {
  id:string;
  quote_id:string;
  product_id:string;
  package_name:string;
  description:string;
  quantity:number|null;
  price:number|null;
  total_amount:number|null;
}

