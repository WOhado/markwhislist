import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route a támogatási üzenetekhez
  app.post("/api/support", (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n---\n`;

    // Hozzáfűzés a support.txt fájlhoz
    fs.appendFile(path.join(process.cwd(), "support.txt"), logEntry, (err) => {
      if (err) {
        console.error("Hiba a fájlba íráskor:", err);
        return res.status(500).json({ error: "Szerver hiba" });
      }
      console.log("Üzenet elmentve a support.txt-be.");
      res.json({ success: true });
    });
  });

  // Vite middleware fejlesztéshez
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
  });
}

startServer();
