import { fetchCustomers } from "@/app/lib/data";
import { CreatePackageFormData, DepartureCityDateData } from "@/app/lib/definitions";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Grid from "antd/es/card/Grid";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

export default function AddPackageInfo({ handleChange, values, departureCityDateData, updateCityDateComponent }
    : {
        handleChange: (e: React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            , i: number, n: string, ni: number, date: Dayjs) => void,
        values: CreatePackageFormData,
        departureCityDateData: DepartureCityDateData[],
        updateCityDateComponent: (index: number, type: string) => void
    }) {

    const [cityData, setCityData] = useState([]);
    useEffect(() => {
        const domain = 'http://212.38.94.139:8080';
        const url = `${domain}/v1/fetch/cities`;

        const postData = {
            countryIds: [101]
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };

        fetch(url, requestOptions)
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then(d => {
                // Handle the data returned from the server

                setCityData(d.response.cities);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
                <div className="rounded-md bg-gray-50 p-4 hidden md:block">
                    <div className="flex">
                        <div className="p-3 mb-5 basis-1/4">
                            <label htmlFor="packageName" className="mb-2 block text-sm font-medium">
                                Package Name
                            </label>
                            <input
                                type="text"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="packageName"
                                placeholder="Package Name"
                                value={values.packageName}
                                onInput={(e) => handleChange}
                            />
                        </div>
                        <div className="p-3 mb-5 basis-1/4">
                            <label htmlFor="packageCode" className="mb-2 block text-sm font-medium">
                                Package Code
                            </label>
                            <input
                                type="text"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                name="packageCode"
                                placeholder="Package Code"
                                value={values.packageCode}
                                onInput={(e) => handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex p-3 rounded-md w-full">
                        <label htmlFor="packageCode" className="mb-2 block text-sm font-medium">
                            Package Type : 
                        </label>
                        <div className="flex grow-row gap-2 pl-6">
                            <div className="flex items-center">
                                <input
                                    id="packageTypeDomesticTours"
                                    name="packageTypeDomesticTours"
                                    type="checkbox"
                                    value={values.packageTypeDomesticTours}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="packageTypeDomesticTours"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Domestic Tours 
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="packageTypeInternationalTours"
                                    name="packageTypeInternationalTours"
                                    type="checkbox"
                                    value={values.packageTypeInternationalTours}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="web"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    International Tours 
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="flex p-3 rounded-md w-full">
                        <label htmlFor="packageTheme" className="mb-2 block text-sm font-medium">
                            Package Theme : 
                        </label>
                        <div className="flex grow-row gap-2 pl-3">
                            <div className="flex items-center">
                                <input
                                    id="packageThemeFamily"
                                    name="packageThemeFamily"
                                    type="checkbox"
                                    value={values.packageThemeFamily}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="web"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Family 
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="packageTypeInternationalTours"
                                    name="packageTypeInternationalTours"
                                    type="checkbox"
                                    value={values.packageTypeInternationalTours}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="web"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Honeymoon Special 
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="packageThemeCustomizedHolidays"
                                    name="packageThemeCustomizedHolidays"
                                    type="checkbox"
                                    value={values.packageThemeCustomizedHolidays}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="packageThemeCustomizedHolidays"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Customized Holidays 
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="packageThemePopular"
                                    name="packageThemePopular"
                                    type="checkbox"
                                    value={values.packageThemePopular}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="web"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Popular 
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="packageThemeFamily"
                                    name="packageThemeFamily"
                                    type="checkbox"
                                    value={values.packageThemeFamily}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="web"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Special value FD 
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="packageThemeSpecialValueFD"
                                    name="packageThemeSpecialValueFD"
                                    type="checkbox"
                                    value={values.packageThemeSpecialValueFD}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="web"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Piligrimage 
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-3 rounded-md w-full">
                        <label htmlFor="packageTheme" className="mb-2 block text-sm font-medium">
                            Tour Includes :
                        </label>
                        <div className="flex grow-row gap-2 pl-8">
                            <div className="flex items-center">
                                <input
                                    id="packageIncludesMeals"
                                    name="packageIncludesMeals"
                                    type="checkbox"
                                    value={values.packageIncludesMeals}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="packageIncludesMeals"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Meals 
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="packageIncludesHotels"
                                    name="packageIncludesHotels"
                                    type="checkbox"
                                    value={values.packageIncludesHotels}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="packageIncludesHotels"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Hotels 
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="packageIncludesSightSeeing"
                                    name="packageIncludesSightSeeing"
                                    type="checkbox"
                                    value={values.packageIncludesSightSeeing}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="packageIncludesSightSeeing"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Sightseeing 
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="packageIncludesTransfers"
                                    name="packageIncludesTransfers"
                                    type="checkbox"
                                    value={values.packageIncludesTransfers}
                                    onInput={(e)=> handleChange}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="packageIncludesTransfers"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                                >
                                    Transfers 
                                </label>
                            </div>
                            
                        </div>
                    </div>
                    
            </div>

    );
}