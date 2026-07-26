import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  const searchQuery = `${query} motorcycle`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    searchQuery,
  )}&gsrlimit=8&gsrnamespace=6&prop=imageinfo&iiprop=url|size&iiurlwidth=400&format=json&origin=*`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "MotoMatrix/1.0 (educational project)",
    },
  });
  const data = await res.json();

  const pages = data.query?.pages;

  if (!pages) {
    return NextResponse.json({ images: [] });
  }

  const images = Object.values(pages)
    .map((page: any) => {
      const info = page.imageinfo?.[0];
      if (!info) return null;
      return {
        url: info.url,
        thumbnail: info.thumburl || info.url,
        title: page.title
          ?.replace("File:", "")
          .replace(/\.(jpg|jpeg|png|webp)$/i, ""),
        source: "Wikimedia Commons",
      };
    })
    .filter((img) => img !== null)
    .filter((img: any) => /\.(jpg|jpeg|png|webp)$/i.test(img.url));

  return NextResponse.json({ images: images.slice(0, 6) });
}
