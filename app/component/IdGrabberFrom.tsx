"use client"
import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import clsx from "clsx";
import Table from "./Table";
import ShapesMini from "@/slices/IdGrabberForm/ShapesMini";

export default function IdGrabberFrom() {
  const [inputOption, setInputOption] = useState('url');
  const [links, setLinks] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption(event.target.value);
  };  

  const handleLinksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLinks(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Loading set")
    // change the button text to Loading
    console.log("Input Option:", inputOption);
    console.log("Links:", links);
    // do api call
    
    const apiUrl = 'https://app.basrh.com/id-grabber';
    
    const formData = new FormData();
    // formData.append('useOption', 'url'); //for testing i set the data manually
    // formData.append('links', 'https://detailedvehiclehistory.com/ford https://detailedvehiclehistory.com/vin-decoder https://detailedvehiclehistory.com/vin-decoder/ford'); //data manual
    formData.append('useOption', inputOption);
    formData.append('links', links);
    
    // Creating an empty file if use option url
    const emptyFile = new File([], 'empty.csv', { type: 'text/csv' });
    formData.append('csv', emptyFile);
    
    const requestOptions = {
      method: 'POST',
      body: formData
    };
    
    console.log("Do Api Call...");
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setIsLoading(false);
        return response.json();
      })
      .then(data => {
        // Handle the response data here
        console.log('Response from server:', data);
        
        // Split the links and output into arrays
        const linksArray = data.links;
        const outputArray = data.output;
    
        // Combine links and output into an array of objects
        const tableData = linksArray.map((link: string, index: number) => ({
            url: link,
            id: outputArray[index]
        }));
        setIsLoading(false);
        setTableData(tableData);
        console.log(tableData);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    // end api call
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      <form onSubmit={handleSubmit} className="mb-5 md:mb-0 spacer">
        <p className="text-3xl font-bold">Input Option:</p>
        <div className="flex flex-col md:flex-row justify-between gap-5 mt-3 mb-3">
          <div className="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input id="url-radio" type="radio" value="URL" name="inputOption" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={inputOption === 'url'} onChange={handleInputOptionChange} />
            <label htmlFor="url-radio" className="prose prose-xl prose-invert mb-1 py-4 ms-2">URL</label>
          </div>
          <div className="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input id="csv-radio" type="radio" value="CSV" name="inputOption" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={inputOption === 'csv'} onChange={handleInputOptionChange} disabled />
            <label htmlFor="csv-radio" className="prose prose-xl prose-invert mb-1 py-4 ms-2">CSV (Coming Soon)</label>
          </div>
        </div>

        <div>
          <label className="text-3xl font-bold" htmlFor="links">Links:</label>
          <textarea id="links" placeholder="Links" value={links} onChange={handleLinksChange} className="w-full bg-transparent block border border-slate-100 pt-3 px-4 pb-0 mt-3 mb-3 text-slate-100 prose-xl prose-invert md:flex-row placeholder-slate-100" />
        </div>
        <button type="submit" className="group text-slate-800 relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50  px-4 py-2 font-bold transition-transform ease-out  hover:scale-105" disabled={isLoading}>
          <span
            className={clsx(
              "absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
            )}
          />
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? "Loading" : "Grab ID"}
            <MdArrowOutward className="inline-block" /></span>
        </button>
      </form>
      <ShapesMini/>
    </div>
    <Table data={tableData}/>
    </>
  );
}