import { exec } from "child_process";
import process from "process";

console.log("Building app...");

exec("vite build", (err) => {
  if (err) {
    console.error("Build error:", err);
    process.exit(1);
  }

  console.log("Starting server...");

  const server = exec("npx serve dist -l 4173");

  server.stdout.on("data", (data) => {
    console.log("serve:", data);
  });

  server.stderr.on("data", (data) => {
    console.error("serve error:", data);
  });

  setTimeout(async () => {
    console.log("Running prerender...");

    try {
      await import("./prerender.js");
      console.log("Prerender done ✅");
    } catch (e) {
      console.error("Prerender error:", e);
      process.exit(1);
    }

    server.kill();
  }, 5000);
});
