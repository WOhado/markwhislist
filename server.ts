import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import cors from "cors"; // 1. IMPORTÁLD A CORS-T

async function startServer() {
  const app = express();
  
  // 2. DINAMIKUS PORT (Rendernek kötelező)
  const PORT = process.env.PORT || 3000;

  // 3. CORS ENGEDÉLYEZÉSE (Hogy a GitHub Pages-ről átjöjjön az üzenet)
  app.use(cors());
  app.use(express.json());

  // 4. HEALTH CHECK (UptimeRobotnak, hogy ne aludjon el a szerver)
  app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });

  // API route a támogatási üzenetekhez
  app.post("/api/support", (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}] ${message}\n---\n`;

    // Renderen a process.cwd() jó, de konzolba is írjuk ki, hogy lásd a logban!
    console.log("ÚJ SUPPORT ÜZENET érkezett:", logEntry);

    fs.appendFile(path.join(process.cwd(), "support.txt"), logEntry, (err) => {
      if (err) {
        console.error("Hiba a fájlba íráskor:", err);
        return res.status(500).json({ error: "Szerver hiba" });
      }
      res.json({ success: true });
    });
  });

  // Vite middleware
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

  // 5. '0.0.0.0' HASZNÁLATA (Hogy a Render kívülről is lássa)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Szerver élesítve a ${PORT} porton.`);
  });
}

startServer();
