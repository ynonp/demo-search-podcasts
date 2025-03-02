'use server';
import crypto from 'node:crypto';
import type {ApiResponse} from '../types/podcast_index';

function getHeaders() {
  const apiKey = process.env.PODCASTINDEX_API_KEY;
  const apiSecret = process.env.PODCASTINDEX_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("Missing PODCASTINDEX API Keys / Secret env variables");
  }

  const apiHeaderTime = Math.floor(Date.now()/1000);
  const sha1Algorithm = "sha1";
  const sha1Hash = crypto.createHash(sha1Algorithm);
  const data4Hash = apiKey + apiSecret + apiHeaderTime;
  sha1Hash.update(data4Hash);
  const hash4Header = sha1Hash.digest('hex');

  return { 
    "Content-Type": "application/json",
    "X-Auth-Date": ""+apiHeaderTime,
    "X-Auth-Key": apiKey,
    "Authorization": hash4Header,
    "User-Agent": "Lirepod"
  };
}

export async function searchByTerm(term: string): Promise<ApiResponse.Search> {
  const url = `https://api.podcastindex.org/api/1.0/search/byterm?q=${encodeURIComponent(term)}`
  return fetch(url, {
    method: "GET",
    headers: getHeaders(),
  })
  .then(res => res.json())  
}

