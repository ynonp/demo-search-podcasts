'use client';
import { useState } from "react"
import { FormEvent } from "react";
import { searchByTerm } from "@/actions/podcast_index";
import type {ApiResponse} from '../../types/podcast_index';
import SearchResultItem from './SearchResultItem';

export default function Search() {
  const [results, setResults] = useState<ApiResponse.Search>();
  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();    
    const data = new FormData(e.target as HTMLFormElement);
    const term = data.get('search');    
    const results = await searchByTerm(term as string);        
    setResults(results);
  }
  const feed = results ? results.feeds : [];

  return (
    <div>
<form 
  onSubmit={handleSearch} 
  className="max-w-xl mx-auto p-6 space-y-4"
>
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Podcast Search
  </h2>
  
  <div className="flex gap-2">
    <input 
      type="search" 
      name="search" 
      placeholder="Search podcasts..."
      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 transition-colors"
    />
    
    <button 
      type="submit"
      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg
                hover:bg-blue-700 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-offset-2 
                active:bg-blue-800 transition-colors"
    >
      Search
    </button>
        </div>
      </form>
      <div>
        <ul>
          {feed.map(item => (
            <li key={item.id}>
              <SearchResultItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}