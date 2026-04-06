import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const BASE_URL = "http://localhost:4173"; // Vite preview

//Fetch all artist from the backend and generate /pageArtist/:auteur URLs
async function getArtistRoutes() {
  try {
    const res = await fetch(
      "https://phenixdeals-back.onrender.com/allArtists"
    );
    const data = await res.json();

    return data.map(
      (artist) => `/pageArtist/${encodeURIComponent(artist.auteur)}`
    );
  } catch (error) {
    console.error("Error fetching artist routes:", error);
    return [];
  }
}

//npm puppeteer open each page in the browser / wait for React + API to add JS / Save full HTML for each page into /dist
async function prerender() {
  // Static pages
  const staticRoutes = ["/"];

  // Dynamic pages
  const dynamicRoutes = await getArtistRoutes();

  const routes = [...staticRoutes, ...dynamicRoutes];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const route of routes) {
    const url = BASE_URL + route;

    console.log("Rendering:", url);

    try {
      await page.goto(url, { waitUntil: "networkidle0" });

      // Wait for your content (RangeGrid → grid)
      await page.waitForSelector(".grid");

      // Small delay for Render (API cold start safety)
      await new Promise((r) => setTimeout(r, 2000));

      const html = await page.content();

      const filePath =
        route === "/"
          ? path.join("dist", "index.html")
          : path.join("dist", route, "index.html");

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, html);

      console.log("Saved:", filePath);
    } catch (error) {
      console.error("Error rendering route:", route, error);
    }
  }

  await browser.close();
}

prerender();