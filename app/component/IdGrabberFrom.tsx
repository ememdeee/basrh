"use client"
import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import clsx from "clsx";

export default function IdGrabberFrom() {
  const [inputOption, setInputOption] = useState('URL');
  const [links, setLinks] = useState('');

  const handleInputOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption(event.target.value);
  };  

  const handleLinksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLinks(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Input Option:", inputOption);
    console.log("Links:", links);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5 md:mb-0 spacer">
      <p className="text-3xl font-bold">Input Option:</p>
      <div className="flex flex-col md:flex-row justify-between gap-5 mt-3 mb-3">
        <div className="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input id="url-radio" type="radio" value="URL" name="inputOption" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={inputOption === 'URL'} onChange={handleInputOptionChange} />
          <label htmlFor="url-radio" className="prose prose-xl prose-invert mb-1 py-4 ms-2">URL Radio</label>
        </div>
        <div className="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input id="csv-radio" type="radio" value="CSV" name="inputOption" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={inputOption === 'CSV'} onChange={handleInputOptionChange} />
          <label htmlFor="csv-radio" className="prose prose-xl prose-invert mb-1 py-4 ms-2">CSV Radio</label>
        </div>
      </div>

      <div>
        <label className="text-3xl font-bold" htmlFor="links">Links:</label>
        <textarea id="links" placeholder="Links" value={links} onChange={handleLinksChange} className="w-full bg-transparent block border border-slate-100 pt-3 px-4 pb-0 mt-3 mb-3 text-slate-100 prose-xl prose-invert md:flex-row placeholder-slate-100" />
      </div>
      <button type="submit" className="group text-slate-800 relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50  px-4 py-2 font-bold transition-transform ease-out  hover:scale-105">
        <span
          className={clsx(
            "absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
          )}
        />
        <span className="relative flex items-center justify-center gap-2">Grab ID<MdArrowOutward className="inline-block" /></span>
      </button>
    </form>
  );
}