import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const BASE_URL = "http://localhost:4173"; // Vite preview

console.log("Starting prerender...");

// Fetch all artists from backend
async function getArtistRoutes() {
  try {
    const res = await fetch("https://phenixdeals-back.onrender.com/allArtists");
    const data = await res.json();

    return data.map(
      (artist) => `/pageArtist/${encodeURIComponent(artist.auteur)}`,
    );
  } catch (error) {
    console.error("Error fetching artist routes:", error);
    return [];
  }
}

async function prerender() {
  const staticRoutes = ["/"];
  const dynamicRoutes = await getArtistRoutes();
  const routes = [...staticRoutes, ...dynamicRoutes];

  // IMPORTANT FIX FOR VERCEL
  // Vercel runs in a restricted environment (no sandbox, no GUI)
  const browser = await puppeteer.launch({
    headless: "new", // ensures headless mode works properly
    args: [
      "--no-sandbox", // REQUIRED on Vercel
      "--disable-setuid-sandbox", // REQUIRED on Vercel
    ],
  });

  const page = await browser.newPage();

  for (const route of routes) {
    const url = BASE_URL + route;

    console.log("Rendering:", url);

    try {
      await page.goto(url, { waitUntil: "networkidle0" });

      // Wait for your React content (important for SEO)
      await page.waitForSelector(".grid");

      // Small delay to ensure API data is fully loaded (Render cold start)
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
