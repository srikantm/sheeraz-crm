import { query as executeQuery } from "@/app/lib/mysql";
import {
  CrmInvoicesTable,
  CrmProductsTable,
  CrmQuotesTable,
  CurriencyField,
  CustomerField,
  CustomersTable,
  DashboardCountData,
  EditInvoiceForm,
  EditQuoteForm,
  InvoiceItemForm,
  LeadForm,
  LeadsTable,
  PackageField,
  PackageRateField,
  PaymentModesField,
  PaymentsField,
  PaymentsTable,
  QuoteItemForm,
  TaxField,
} from './definitions';
import { formatCurrency } from './utils';
import { NextResponse } from "next/server";

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await executeQuery(`SELECT * FROM revenue`, []);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {

    const data = await executeQuery(`
      SELECT invoices.invoice_total_amount, invoices.invoice_number, customers.name, customers.image_url, customers.email, invoices.id
      FROM crm_invoices invoices
      JOIN crm_customers customers ON invoices.customer_id = customers.id
      ORDER BY invoices.created_at DESC
      LIMIT 5`, []);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const cardData = await executeQuery(`SELECT
     	 (SELECT COUNT(*) FROM crm_invoices where crm_invoices.is_active = '1') as invoice_count,
     	 (SELECT COUNT(*) FROM crm_customers where crm_customers.is_active = '1') as customer_count,
       (SELECT COUNT(*) FROM crm_leads where crm_leads.is_active = '1') as lead_count,
         SUM(CASE WHEN invoice_status = 'paid' THEN invoice_total_amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN invoice_status = 'pending' THEN invoice_total_amount ELSE 0 END) AS "pending",
         (select sum(lead_amount) from crm_leads where is_Active = '1') as total_lead_amount,
         (select sum(case when lead_status = 'won' then lead_amount else 0 end) from crm_leads where is_Active = '1') as total_lead_won
         FROM crm_invoices ci where ci.is_active = '1' `, []);

    const fetchedData = JSON.stringify(cardData);
    const resData: DashboardCountData[] = JSON.parse(fetchedData);
    const numberOfInvoices = Number(resData[0].invoice_count);
    const numberOfCustomers = Number(resData[0].customer_count);
    const totalPaidInvoices = formatCurrency(resData[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(resData[0].pending ?? '0');
    const totalLeadCount = (resData[0].lead_count ?? '0');
    const totalLeadAmount = formatCurrency(resData[0].total_lead_amount ?? '0');
    const totalLeadWon = formatCurrency(resData[0].total_lead_won ?? '0');
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
      totalLeadCount,
      totalLeadAmount,
      totalLeadWon
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    let sqlQuery = `
      select ci.id,
      ci.invoice_number,
      cc.name as customer_name,
      ci.invoice_total_amount,
      ci.invoice_status,
      ci.invoice_date 
      from crm_invoices ci 
      join crm_customers cc on cc.id = ci.customer_id 
      where true `;
    if (query !== '') {
      sqlQuery += ` and (ci.invoice_number like ${`'%${query}%'`}
      	   or cc.name like ${`'%${query}%'`}
      	   or ci.invoice_total_amount like ${`'%${query}%'`}
      	   or ci.invoice_status like ${`'%${query}%'`}
      	   or ci.invoice_date like ${`'%${query}%'`})
      	   `;
    }
    sqlQuery += ` order by ci.created_at desc 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const invoices = await executeQuery(sqlQuery, [])
    const fetchedData = JSON.stringify(invoices);
    const resData: CrmInvoicesTable[] = JSON.parse(fetchedData);
    return resData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    let sqlQuery = `
      select 
          p.id as package_id,
          p.package_name,
          GROUP_CONCAT(DISTINCT pt.package_type) as package_type,
          GROUP_CONCAT(DISTINCT pt2.theme_type) as theme_type,
          Max(pr.adult_rate) as adult_rate 
          from packages p
          join package_type_mappings ptm on ptm.package_id = p.id 
          join package_types pt on pt.id = ptm.package_type_id 
          join package_theme_mappings ptm2 on ptm2.package_id = p.id 
          join package_themes pt2 on pt2.id = ptm2.package_theme_id 
          join package_rates pr on pr.package_id = p.id 
          where p.status ='ACTIVE' `;
          if (query !== '') {
            sqlQuery += ` and p.id like ${`'%${query}%'`}
             or p.package_name like ${`'%${query}%'`}
             or pt.package_type like ${`'%${query}%'`}
             or pt2.theme_type like ${`'%${query}%'`}
             or pr.adult_rate like ${`'%${query}%'`} `
          }
          sqlQuery += ' GROUP by p.id '
    sqlQuery += ` order by p.created_at desc 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const invoices = await executeQuery(sqlQuery, [])
    const fetchedData = JSON.stringify(invoices);
    const resData: CrmProductsTable[] = JSON.parse(fetchedData);
    return resData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}



export async function fetchFilteredQuotes(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    let sqlQuery = `
      select ci.id,
      ci.quote_number,
      cc.name as customer_name,
      ci.quote_total_amount,
      ci.quote_status,
      ci.quote_date 
      from crm_quotes ci 
      join crm_customers cc on cc.id = ci.customer_id 
      where true `;
    if (query !== '') {
      sqlQuery += ` and (ci.quote_number like ${`'%${query}%'`}
      	   or cc.name like ${`'%${query}%'`}
      	   or ci.quote_total_amount like ${`'%${query}%'`}
      	   or ci.quote_status like ${`'%${query}%'`}
      	   or ci.quote_date like ${`'%${query}%'`})
      	   `;
    }
    sqlQuery += ` order by ci.created_at desc 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const invoices = await executeQuery(sqlQuery, [])
    const fetchedData = JSON.stringify(invoices);
    const resData: CrmQuotesTable[] = JSON.parse(fetchedData);
    return resData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredLeads(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    let sqlQuery =
      `select cl.id,cl.title,cc.id as customer_id ,cc.name as customer_name, cl.source, cl.lead_type, cl.lead_status,cl.lead_amount, cl.expected_close_date 
     from 
     crm_leads cl
     join crm_customers cc on cc.id = cl.customer_id 
     where true `;
    if (query !== '') {
      sqlQuery += ` and cl.title like ${`'%${query}%'`}
     or cl.source like ${`'%${query}%'`}
     or cl.lead_type like ${`'%${query}%'`}
     or cl.lead_status like ${`'%${query}%'`}
     or cl.lead_amount like ${`'%${query}%'`}
     or cl.expected_close_date like ${`'%${query}%'`}
     or cc.name like ${`'%${query}%'`}`
    }
    sqlQuery += `ORDER BY cl.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const invoices = await executeQuery(sqlQuery, []);

    const fetchedData = JSON.stringify(invoices);
    const resData: LeadsTable[] = JSON.parse(fetchedData);
    return resData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    let sqlQuery =
      `select id, name, type, email, contact_number  
        from crm_customers cc 
        where true `;
    if (query !== '') {
      sqlQuery += ` and 
      cc.name like ${`'%${query}%'`}
      cc.type like ${`'%${query}%'`}
      cc.email like ${`'%${query}%'`}
      cc.contact_number like ${`'%${query}%'`} `
    }
    sqlQuery += `ORDER BY cc.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const customers = await executeQuery(sqlQuery, []);

    const fetchedData = JSON.stringify(customers);
    const resData: CustomersTable[] = JSON.parse(fetchedData);
    return resData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    let sqlQuery = `SELECT COUNT(*) as count
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE true `;
    if (query !== '') {
      sqlQuery += ` and (customers.name LIKE ${`'%${query}%'`} 
        OR customers.email LIKE ${`'%${query}%'`} 
        OR invoices.amount LIKE ${`'%${query}%'`} 
        OR invoices.date LIKE ${`'%${query}%'`} 
        OR invoices.status LIKE ${`'%${query}%'`})`
    }
    const count = await executeQuery(sqlQuery, []);
    const fetchedData = JSON.stringify(count);
    const resData = JSON.parse(fetchedData);

    const totalPages = Math.ceil(Number(resData[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchLeadsPages(query: string) {
  try {
    let sqlQuery = `SELECT COUNT(*) as count
    FROM crm_leads leads
    join crm_customers cc on cc.id = leads.customer_id 
     where true `;
    if (query !== '') {
      sqlQuery += ` and cl.title like ${`'%${query}%'`}
     or cl.source like ${`'%${query}%'`}
     or cl.lead_type like ${`'%${query}%'`}
     or cl.lead_status like ${`'%${query}%'`}
     or cl.lead_amount like ${`'%${query}%'`}
     or cl.expected_close_date like ${`'%${query}%'`}
     or cc.name like ${`'%${query}%'`}`
    }
    const count= await executeQuery(sqlQuery, []);
    const fetchedData = JSON.stringify(count);
    const resData = JSON.parse(fetchedData);

    const totalPages = Math.ceil(Number(resData[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of leads.');
  }
}


export async function fetchPaymentsPageCount(query: string) {
  try {
    let sqlQuery = `SELECT COUNT(*) as count
    FROM crm_payments p
    join crm_invoices ci on ci.id = p.invoice_id 
    join crm_payment_modes cpm on cpm.id = p.payment_mode_id
     where true `;
    if (query !== '') {
      sqlQuery += ` and p.reference_number like ${`'%${query}%'`}
     or p.amount like ${`'%${query}%'`}
     or cpm.name like ${`'%${query}%'`}
     or ci.invoice_number like ${`'%${query}%'`}
     or p.payment_date like ${`'%${query}%'`} `
    }
    const count= await executeQuery(sqlQuery, []);
    const fetchedData = JSON.stringify(count);
    const resData = JSON.parse(fetchedData);

    const totalPages = Math.ceil(Number(resData[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of leads.');
  }
}

export async function fetchProductsPageCount(query: string) {
  try {
    let sqlQuery = `select 
count(*) as count
from packages p
join package_type_mappings ptm on ptm.package_id = p.id 
join package_types pt on pt.id = ptm.package_type_id 
join package_theme_mappings ptm2 on ptm2.package_id = p.id 
join package_themes pt2 on pt2.id = ptm2.package_theme_id 
join package_rates pr on pr.package_id = p.id 
where p.status ='ACTIVE' `;
    if (query !== '') {
      sqlQuery += ` and p.id like ${`'%${query}%'`}
     or p.package_name like ${`'%${query}%'`}
     or pt.package_type like ${`'%${query}%'`}
     or pt2.theme_type like ${`'%${query}%'`}
     or pr.adult_rate like ${`'%${query}%'`} `
    }
    sqlQuery += ' GROUP by p.id;'
    const count= await executeQuery(sqlQuery, []);
    const fetchedData = JSON.stringify(count);
    const resData = JSON.parse(fetchedData);

    const totalPages = Math.ceil(Number(resData[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of leads.');
  }
}

export async function fetchFilteredPayments(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    let sqlQuery = `SELECT p.id as payment_id, 
    ci.invoice_number,
    cpm.name as payment_mode,
    p.reference_number,
    p.amount,
    p.payment_date
    FROM crm_payments p
    join crm_invoices ci on ci.id = p.invoice_id 
    join crm_payment_modes cpm on cpm.id = p.payment_mode_id
     where true `;
    if (query !== '') {
      sqlQuery += ` and p.reference_number like ${`'%${query}%'`}
     or p.amount like ${`'%${query}%'`}
     or cpm.name like ${`'%${query}%'`}
     or ci.invoice_number like ${`'%${query}%'`}
     or p.payment_date like ${`'%${query}%'`} `
    }
    sqlQuery += `ORDER BY p.updated_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const customers = await executeQuery(sqlQuery, []);

    const fetchedData = JSON.stringify(customers);
    const resData: PaymentsTable[] = JSON.parse(fetchedData);
    return resData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch payments.');
  }
}

export async function fetchCustomersPages(query: string) {
  try {
    let sqlQuery = `SELECT COUNT(*) as count
    FROM crm_customers
    WHERE true `;
    if (query !== '') {
      sqlQuery += ` and (leads.lead_type LIKE ${`'%${query}%'`} 
        OR leads.customer_name LIKE ${`'%${query}%'`} 
        OR leads.customer_email LIKE ${`'%${query}%'`} 
        OR leads.customer_phone_number LIKE ${`'%${query}%'`} 
        OR leads.amount LIKE ${`'%${query}%'`})`
    }
    const count = await executeQuery(sqlQuery, []);
    const fetchedData = JSON.stringify(count);
    const resData = JSON.parse(fetchedData);

    const totalPages = Math.ceil(Number(resData[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await executeQuery(`
      SELECT
        ci.id as invoice_id,
      	  invoice_number ,
      	  customer_id ,
      	  currency_id ,
          c.symbol as currency_symbol,
      	  invoice_status ,
      	  invoice_date ,
      	  expiry_date ,
      	  note ,
      	  tax_id ,
          tax_slab,
      	  invoice_sub_amount ,
      	  tax_amount ,
      	  invoice_total_amount ,
          amount_paid
      	  from crm_invoices ci 
          join crm_currencies c on c.id = ci.currency_id
      	  where ci.id = ${id};
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: EditInvoiceForm[] = JSON.parse(fetchedData);
    return resData[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchQuoteById(id: string) {

  try {
    const data = await executeQuery(`
      SELECT
        ci.id as quote_id,
      	  quote_number ,
      	  customer_id ,
      	  currency_id ,
          c.symbol as currency_symbol,
      	  quote_status ,
      	  quote_date ,
      	  expiry_date ,
      	  note ,
      	  tax_id ,
          tax_slab,
      	  quote_sub_amount ,
      	  tax_amount ,
      	  quote_total_amount 
      	  from crm_quotes ci 
          join crm_currencies c on c.id = ci.currency_id
      	  where ci.id = ${id};
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: EditQuoteForm[] = JSON.parse(fetchedData);
    return resData[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchLeadById(id: string) {
  try {
    const data = await executeQuery(`
      select 
      	    cl.id as lead_id,
      	    cl.title,
      	    cl.description ,
      	    cl.source,
      	    cl.lead_type ,
      	    cl.customer_id ,
      	    cl.lead_status ,
      	    cl.lead_amount ,
      	    cl.expected_close_date 
      	 from crm_leads cl where cl.id = ${id};
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: LeadForm[] = JSON.parse(fetchedData);
    return resData[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomerById(id: string) {
  try {
    const data = await executeQuery(`
      select 
      	    id,name, type, email,contact_number from crm_customers where id = ${id};
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: CustomersTable[] = JSON.parse(fetchedData);
    return resData[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchLeads() {
  try {
    const data = await executeQuery(`
      select 
      	    cl.id as lead_id,
      	    cl.title,
      	    cl.description ,
      	    cl.source,
      	    cl.lead_type ,
      	    cl.customer_id ,
      	    cl.lead_status ,
      	    cl.lead_amount ,
      	    cl.expected_close_date 
      	 from crm_leads cl where is_active = '1' ;
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: LeadForm[] = JSON.parse(fetchedData);
    return resData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await executeQuery(`
      SELECT
        id,
        name
      FROM crm_customers
      where is_active = '1'
      ORDER BY name ASC
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: CustomerField[] = JSON.parse(fetchedData);
    return resData;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchPackagesWithRates() {
  try {
    const data = await executeQuery(`
      select 
        p.id,
        p.package_name,
        package_rate_type,
        guest_sharing_type,
        adult_rate,
        child_rate_with_bed,
        child_rate_without_bed,
        infant_rate 
        from packages p 
        join package_rates pr on pr.package_id  = p.id
        where p.status  = 'ACTIVE'
        order by p.id;
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: PackageRateField[] = JSON.parse(fetchedData);

    let packages: PackageField[] = [];
    let packageIds: string[] = [];
    resData.map((data, i) => {
      if (!packageIds.includes(data.id)) {
        packageIds.push(data.id);
        let obj: PackageField = {
          id: data.id,
          package_name: data.package_name
        }
        packages.push(obj);
      }
    });


    return resData;
  } catch (err) {
    console.log('Database Error:', err);
    throw new Error('Failed to fetch Package Rates.');
  }
}

export async function fetchCurrencies() {
  try {
    const data = await executeQuery(`
     select id,name,code,symbol,thousand_seperator 
      from crm_currencies cc where is_active  = '1'
      ORDER BY name ASC
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: CurriencyField[] = JSON.parse(fetchedData);
    return resData;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchTaxes() {
  try {
    const data = await executeQuery(`
     select id,name,value
      from crm_taxes where is_active  = '1'
      ORDER BY name ASC
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: TaxField[] = JSON.parse(fetchedData);
    return resData;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchPaymentsByInvoiceId(id:string) {
  try {
    const data = await executeQuery(`
     select  cp.id, cpm.name as payment_mode ,cp.reference_number , cp.amount 
     from crm_payments cp
     join crm_payment_modes cpm on cpm.id = cp.payment_mode_id
     where invoice_id =  ${id};`, []);

    const fetchedData = JSON.stringify(data);
    const resData: PaymentsField[] = JSON.parse(fetchedData);
    return resData;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch payments.');
  }
}

export async function fetchPaymentModes() {
  try {
    const data = await executeQuery(`select id, name, description from crm_payment_modes where is_active = '1' ;`, []);

    const fetchedData = JSON.stringify(data);
    const resData: PaymentModesField[] = JSON.parse(fetchedData);
    return resData;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch payment modes.');
  }
}

export async function fetchPackages() {
  try {
    const data = await executeQuery(`
    select id, package_name from packages where status = 'ACTIVE'
      ORDER BY package_name ASC
    `, []);

    const fetchedData = JSON.stringify(data);
    const resData: PackageField[] = JSON.parse(fetchedData);
    return resData;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchInvoiceItems(invoiceId: string) {
  try {
    const data = await executeQuery(`select 
                                      cipm.id,
                                      cipm.invoice_id,
                                      cipm.product_id ,
                                      cipm.description ,
                                      cipm.quantity ,
                                      cipm.price ,
                                      cipm.total_amount,
                                      p.package_name 
                                    from crm_invoice_product_mapping cipm 
                                    join packages p on p.id = cipm.product_id
                                    where invoice_id = ${invoiceId} ;`, [])

    const fetchedData = JSON.stringify(data);
    const resData: InvoiceItemForm[] = JSON.parse(fetchedData);
    return resData;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch invoice items.');
  }
}

export async function fetchQuotesItems(quoteId: string) {
  try {
    const data = await executeQuery(`select 
                                      cipm.id,
                                      cipm.quote_id,
                                      cipm.product_id ,
                                      cipm.description ,
                                      cipm.quantity ,
                                      cipm.price ,
                                      cipm.total_amount,
                                      p.package_name 
                                    from crm_quote_product_mapping cipm 
                                    join packages p on p.id = cipm.product_id
                                    where quote_id = ${quoteId} ;`, [])

    const fetchedData = JSON.stringify(data);
    const resData: QuoteItemForm[] = JSON.parse(fetchedData);
    return resData;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch quote items.');
  }
}
