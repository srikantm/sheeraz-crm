'use client';

import { CreateInvoiceForm, CreatePackageFormData, CurriencyField, CustomerField, DepartureCityDateData, InvoiceItem, LeadForm, PackageField, TaxField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CurrencyRupeeIcon,
  PlusIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, createInvoiceForm } from '@/app/lib/actions';
import { Col, Divider, Row, Form as Frm, Input, InputNumber, Button as Btn, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { Dayjs } from "dayjs";
import { lusitana } from '../fonts';
import AddPackageInfo from './package-form/packageinfo';
// import { fetchPackageRates } from '@/app/lib/data';



export default function Form() {

  const saveProduct = () => {

  }

  return (
    // <form action={createInvoice}>
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <h1 className={`${lusitana.className} mb-4 text-xl justify-center text-center text-blue-500 md:text-xl`}>
        Create Product
      </h1>
      <Stepper/>
      </div>




      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button onClick={saveProduct}>Create Product</Button>
      </div>
    </>
  );
}


const steps = [
  {
    title: 'Package ',
    type: "package_info",
  },
  {
    title: 'Tour Details',
    type: "tour_details",
  },
  {
    title: 'Tour Information',
    type: "tour_info",
  },
  {
    title: 'Tour Itinerary',
    type: "tour_itinerary",
  },
  {
    title: 'Package Pricing',
    type: "package_pricing",
  },
  {
    title: 'Images',
    type: "package_images",
  },
];

export function Stepper(){

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  
  const [formData, setFormData] = useState<CreatePackageFormData>({
    packageName: '',
    packageCode: '',
    packageTypeDomesticTours: '',
    packageTypeInternationalTours: '',
    packageThemeFamily: '',
    packageThemeHoneymoonSpecial: '',
    packageThemeCustomizedHolidays: '',
    packageThemePopular: '',
    packageThemeSpecialValueFD: '',
    packageThemePiligrimage: '',
    packageIncludesMeals: '',
    packageIncludesHotels: '',
    packageIncludesSightSeeing: '',
    packageIncludesTransfers: '',
});

const checkBoxIds = ["packageTypeDomesticTours",
    "packageTypeInternationalTours",
    "packageThemeFamily",
    "packageThemeHoneymoonSpecial",
    "packageThemeCustomizedHolidays",
    "packageThemePopular",
    "packageThemeSpecialValueFD",
    "packageThemePiligrimage",
    "packageIncludesMeals",
    "packageIncludesHotels",
    "packageIncludesSightSeeing",
    "packageIncludesTransfers"
];

    const newCityDepDateData : DepartureCityDateData[] = [{
      cityId : "",
      departureDate : ""
    }]
    const [departureCityDateData, setDepartureCityDateData] = useState<DepartureCityDateData[]>(newCityDepDateData);
    const [accomodationDetailsData, setAccomodationDetailsData] = useState([{ countryId: '', cityId: '', hotelName: "", checkInDate: "", checkOutDate: "" }]);
    const [reportingAndDroppingData, setReportingAndDroppingData] = useState([{ guestType: "", reportingPoint: "", droppingPoint: "" }]);
    const [tourInformation, setTourInformation] = useState({
        tourInclusion: "",
        tourExclusion: "",
        advancePreparation: "",
        tourRating: "",
        tourTotalReviews: ""
    });
    const [flightDetails, setFlightDetails] = useState(
        {
            source: "",
            destination: "",
            airline: "",
            depatureDateTime: "",
            arrivalDateTime: ""

        }
    );

    type ItinerayDetails = {
        countryIds:string[];
        cityIds:string[];
        durationDays:string;
        durationNights:string;
        itineraryStartDate:string;
    }; 
    const [itineraryDetails, setItineraryDetails] = useState<ItinerayDetails>({
      countryIds:[],
      cityIds:[],
      durationDays:"",
      durationNights:"",
      itineraryStartDate:""
    });

    const [itineraries, setItineraries] = useState([
        {
            itineraryTitle: "",
            cityIds: [],
            description: "",
            note: "",
            itineraryDate: null,
            itineraryAddons: [{
                itineraryAddonType: "",
                description: ""
            }]
        }
    ]);

    const [tourPricing, setTourPricing] = useState([
        {
            hotelStarRating: "",
            singleSharingPrice: "",
            doubleSharingPrice: "",
            threeSharingPrice: "",
            childWithoutBedPrice: "",
            childWithBedPrice: "",
            infantPrice: ""
        }
    ]);

    // const handleChange = (e, i, n, ni) => {
      
      const handleChange = (e:React.ChangeEvent<HTMLInputElement> 
        | React.ChangeEvent<HTMLSelectElement> 
        | React.ChangeEvent<HTMLTextAreaElement>
      ,i:number, n:string, ni:number, date:Dayjs) => {


        if (n === 'departureDate') {
          const list = [...departureCityDateData];
          const formatedDated = date.format('DD-MM-YYYY');
          list[i].departureDate = formatedDated;
          setDepartureCityDateData(list);
          return;
      }
      if (n === 'accomodationCheckInDate') {
          const formatedDated = date.format('DD-MM-YYYY');
          const list = [...accomodationDetailsData];
          list[i].checkInDate = formatedDated;
          setAccomodationDetailsData(list);
          return;
      }
      if (n === 'accomodationCheckOutDate') {
        const formatedDated = date.format('DD-MM-YYYY');
          const list = [...accomodationDetailsData];
          list[i].checkOutDate = formatedDated;
          setAccomodationDetailsData(list);
          return;
      }
      if (n === 'flightDepatureDateTime') {
          const formatedDated = date.format('DD-MM-YYYY');
          setFlightDetails((prevData) => ({ ...prevData, depatureDateTime: formatedDated }));
          return;
      }
      if (n === 'flightArrivalDateTime') {
          const formatedDated = date.format('DD-MM-YYYY');
          setFlightDetails((prevData) => ({ ...prevData, arrivalDateTime: formatedDated }));
          return;
      }

      if (n === 'itineraryStartDate') {
          const formatedDated = date.format('DD-MM-YYYY');
          setItineraryDetails((prevData) => ({ ...prevData, itineraryStartDate: formatedDated }));
          return;
      }

      const { name, value} = e.target;

      if (n === 'hotelStarRating') {
          const list = [...tourPricing];
          list[i].hotelStarRating = value;
          setTourPricing(list);
          return;
      }
      if (n === 'singleSharingPrice') {
          const list = [...tourPricing];
          list[i].singleSharingPrice = value;
          setTourPricing(list);
          return;
      }
      if (n === 'doubleSharingPrice') {
          const list = [...tourPricing];
          list[i].doubleSharingPrice = value;
          setTourPricing(list);
          return;
      }
      if (n === 'threeSharingPrice') {
          const list = [...tourPricing];
          list[i].threeSharingPrice = value;
          setTourPricing(list);
          return;
      }
      if (n === 'childWithoutBedPrice') {
          const list = [...tourPricing];
          list[i].childWithoutBedPrice = value;
          setTourPricing(list);
          return;
      }
      if (n === 'childWithBedPrice') {
          const list = [...tourPricing];
          list[i].childWithBedPrice = value;
          setTourPricing(list);
          return;
      }
      if (n === 'infantPrice') {
          const list = [...tourPricing];
          list[i].infantPrice = value;
          setTourPricing(list);
          return;
      }
      
      if (n === 'addOnDescription') {
          const list = [...itineraries];
          list[i].itineraryAddons[ni].description = value
          setItineraries(list);
          return;
      }
      if (n === 'addOnType') {
          const list = [...itineraries];
          list[i].itineraryAddons[ni].itineraryAddonType = value
          setItineraries(list);
          return;
      }
      if (n === 'itineraryNote') {
          const list = [...itineraries];
          list[i].note = value;
          setItineraries(list);
          return;
      }
      if (n === 'itineraryDescription') {
          const list = [...itineraries];
          list[i].description = value;
          setItineraries(list);
          return;
      }
      if (n === 'itineraryTitle') {
          const list = [...itineraries];
          list[i].itineraryTitle = value;
          setItineraries(list);
          return;
      }
      if (n === 'itineraryCountrySelect') {
          let cityIds:string[] = [];
          setItineraryDetails((prevData) => ({ ...prevData, countryIds:commaSeparatedStringToList(value), cityIds:[] }));
          itineraries.map((data, i)=>{
              data.cityIds = [];
          })
          setItineraries(itineraries);
          return;
      }
      if (n === 'itineraryCitySelect') {
          setItineraryDetails((prevData) => ({ ...prevData, cityIds: commaSeparatedStringToList(value) }));
          return;
      }
      if (n === 'durationDays') {
          setItineraryDetails((prevData) => ({ ...prevData, durationDays: value }));
          return;
      }
      if (n === 'durationNights') {
          setItineraryDetails((prevData) => ({ ...prevData, durationNights: value }));
          return;
      }
      if (n === 'tourInclusion') {
          setTourInformation((prevData) => ({ ...prevData, tourInclusion: value }));
          return;
      }
      if (n === 'tourExclusion') {
          setTourInformation((prevData) => ({ ...prevData, tourExclusion: value }));
          return;
      }
      if (n === 'advancePreparation') {
          setTourInformation((prevData) => ({ ...prevData, advancePreparation: value }));
          return;
      }
      if (n === 'tourRating') {
          setTourInformation((prevData) => ({ ...prevData, tourRating: value }));
          return;
      }
      if (n === 'tourTotalReviews') {
          setTourInformation((prevData) => ({ ...prevData, tourTotalReviews: value }));
          return;
      }
      if (n === 'flightSource') {
          setFlightDetails((prevData) => ({ ...prevData, source: value }));
          return;
      }
      if (n === 'flightDestination') {
          setFlightDetails((prevData) => ({ ...prevData, destination: value }));
          return;
      }
      if (n === 'flightName') {
          setFlightDetails((prevData) => ({ ...prevData, airline: value }));
          return;
      }
      if (n === 'departureCity') {
          const list = [...departureCityDateData];
          list[i].cityId = value;
          setDepartureCityDateData(list);
          return;
      }
      if (checkBoxIds.some(v => { return v === name })) {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
          return;
      }
      if (n === "accomodationCountry") {
          const list = [...accomodationDetailsData];
          list[i].countryId = value;
          setAccomodationDetailsData(list);
          return;
      }
      if (n === "accomodationCity") {
          const list = [...accomodationDetailsData];
          list[i].cityId = value;
          setAccomodationDetailsData(list);
          return;
      }
      if (n === "accomodationHotelName") {
          const list = [...accomodationDetailsData];
          list[i].hotelName = value;
          setAccomodationDetailsData(list);
          return;
      }
      if (n === "guestType") {
          const list = [...reportingAndDroppingData];
          list[i].guestType = value;
          setReportingAndDroppingData(list);
          return;
      }
      if (n === "reportingPoint") {
          const list = [...reportingAndDroppingData];
          list[i].reportingPoint = value;
          setReportingAndDroppingData(list);
          return;
      }
      if (n === "droppingPoint") {
          const list = [...reportingAndDroppingData];
          list[i].droppingPoint = value;
          setReportingAndDroppingData(list);
          return;
      }

      setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function commaSeparatedStringToList(input: string): string[] {
    return input.split(',').map(item => item.trim());
  }

//   const updateTourPriceComponent = (index, type) => {

//     if (type === "add") {
//         const newArr = [...tourPricing,
//         {
//             hotelStarRating: "",
//             singleSharingPrice: "",
//             doubleSharingPrice: "",
//             threeSharingPrice: "",
//             childWithoutBedPrice: "",
//             childWithBedPrice: "",
//             infantPrice: ""
//         }];
//         setTourPricing(newArr);
//     }
//     if (type === "delete") {
//         const newArr = [...tourPricing];
//         newArr.splice(index, 1);
//         setTourPricing(newArr);
//     }
// }

// const updateItineraryComponent = (index, type, nIndex) => {

//     if (type === "add") {
//         const newArr = [...itineraries, {
//             itineraryTitle: "",
//             cityIds: [],
//             description: "",
//             itineraryAddons: [{
//             itineraryAddonType: "",
//             description: ""
//             }]
//         }];
//         setItineraries(newArr);
//     }
//     if (type === "addAddOn") {
//         const newArr = [...itineraries];
//         newArr[index].itineraryAddons.push({
//             itineraryAddonType: "",
//             description: ""
//         });
//         setItineraries(newArr);
//     }
//     if (type === "deleteAddOn") {
//         const newArr = [...itineraries];
//         newArr[index].itineraryAddons.splice(nIndex, 1);
//         setItineraries(newArr);
//     }
//     if (type === "delete") {
//         const newArr = [...itineraries];
//         newArr.splice(index, 1);
//         setItineraries(newArr);
//     }
// }

// const updateReportingAndDroppingComponent = (index, type) => {

//     if (type === "add") {
//         const newArr = [...reportingAndDroppingData, { guestType: "", reportingPoint: "", droppingPoint: "" }];
//         setReportingAndDroppingData(newArr);
//     }
//     if (type === "delete") {
//         const newArr = [...reportingAndDroppingData];
//         newArr.splice(index, 1);
//         setReportingAndDroppingData(newArr);
//     }
// }

const updateCityDateComponent = (index:number, type:string) => {

    if (type === "add") {
        const newArr = [...departureCityDateData, { cityId: "", departureDate: "" }];
        setDepartureCityDateData(newArr);
    }
    if (type === "delete") {
        const newArr = [...departureCityDateData];
        newArr.splice(index, 1);
        setDepartureCityDateData(newArr);
    }
}

// const updateAccomodationDetailsComponent = (index, type) => {

//     if (type === "add") {
//         const newArr = [...accomodationDetailsData, { countryId: "", cityId: "", hotelName: "", checkInDate: null, checkOutDate: null }];
//         setAccomodationDetailsData(newArr);
//     }
//     if (type === "delete") {
//         const newArr = [...accomodationDetailsData];
//         newArr.splice(index, 1);
//         setAccomodationDetailsData(newArr);
//     }

// }

  const handleSteps = (step:string) => {
    switch (step) {
        case 'package_info':
            return <AddPackageInfo 
            handleChange={handleChange}
            values={formData}
            departureCityDateData={departureCityDateData}
            updateCityDateComponent={updateCityDateComponent} />;
        // case 'tour_details':
        //     return <TourDetailsForm
        //         handleChange={handleChange}
        //         flightDetails={flightDetails}
        //         accomodationDetailsData={accomodationDetailsData}
        //         updateAccomodationDetailsComponent={updateAccomodationDetailsComponent}
        //         reportingAndDroppingData={reportingAndDroppingData}
        //         updateReportingAndDroppingComponent={updateReportingAndDroppingComponent}
        //     />;
        // case 'tour_info':
        //     return <TourInformationForm handleChange={handleChange} tourInformation={tourInformation} />;
        // case 'tour_itinerary':
        //     return <TourItineraryForm handleChange={handleChange}
        //         itineraryDetails={itineraryDetails}
        //         itineraries={itineraries}
        //         updateItineraryComponent={updateItineraryComponent} />;
        // case 'package_pricing':
        //     return <TourPricing handleChange={handleChange}
        //         tourPricing={tourPricing}
        //         update={updateTourPriceComponent} />
        case 'package_images':
          return (<></>);  
        default:
            return (<></>);          

       
    }
};

  return (
    <>
    <Steps className='text-sm' current={current} items={items} />
    <div className='text-sm'>
      {handleSteps(steps[current].type)}
    </div>
    <div className='flex flex-grow justify-end'>
      {current < steps.length - 1 && (
        <Button onClick={() => next()}>
          Next
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button>
          Done
        </Button>
      )}
      {current > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
      )}
    </div>
  </>
  );
}