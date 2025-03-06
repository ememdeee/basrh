import { NextRequest, NextResponse } from 'next/server'
import { parse } from "node-html-parser"

export async function POST(req: NextRequest) {
  console.log("POST request to /api/idgrabber");

  const body = await req.json();
  // const urls = ["https://isikado.com/", "https://mesincnc.co.id/", "https://detailedvehiclehistory.com/", "https://smartcarcheck.uk/","https://deskteam360.com/", "https://cloudteamize.com/"];
  const urls: string[] = body.links;
  console.log("URLs Input:", urls);

  let counter = 1;
  let result = [];

  for (let url of urls) {
    try {
      // console.log("No: ", counter, "Processing URL:", url);
      const res = await fetch(url);
      const html = await res.text();
      const root = parse(html);
      const htmlBody = root.querySelector("body")
      const classes = htmlBody?.getAttribute("class")?.split(" ") || [];
      const pageIdClass = classes.find(className => className.startsWith("page-id-") || className.startsWith("postid-"));
      const pageId = pageIdClass ? pageIdClass.replace(/^page-id-|^postid-/, "") : null;
      
      console.log("Page ID:", pageId);
      counter++;
      // Save the result
      result.push({
        url,
        status: res.status,
        id: pageId || 'Not Found',
      });
    } catch (error) {
      console.error('Error processing URL:', url, error);

      result.push({
        url,
        status: "Invalid URL / Timeout",
        id: 'Not Found',
      });
    }
  }

  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({ message: "Welcome to the ID Grabber API. Use POST to send URLs." });
}