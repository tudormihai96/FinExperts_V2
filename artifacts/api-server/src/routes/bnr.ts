import { Router } from "express";

const router = Router();

// Cache rate for 1 hour to avoid hammering BNR
let cached: { eurRate: number; publishingDate: string; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

router.get("/bnr-rate", async (req, res) => {
  try {
    const now = Date.now();
    if (cached && now - cached.fetchedAt < CACHE_TTL_MS) {
      res.json({ eurRate: cached.eurRate, publishingDate: cached.publishingDate, source: "BNR", cached: true });
      return;
    }

    const response = await fetch("https://www.bnr.ro/nbrfxrates.xml", {
      headers: { "Accept": "text/xml, application/xml" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`BNR responded with ${response.status}`);
    }

    const xml = await response.text();

    // Extract EUR rate — BNR XML: <Rate currency="EUR">5.1417</Rate>
    const eurMatch = xml.match(/currency="EUR">([0-9.]+)</);
    if (!eurMatch) {
      req.log.error({ xml: xml.slice(0, 500) }, "EUR rate not found in BNR XML");
      res.status(502).json({ error: "EUR rate not found in BNR response" });
      return;
    }

    const eurRate = parseFloat(eurMatch[1]);
    const dateMatch = xml.match(/PublishingDate>([^<]+)</);
    const publishingDate = dateMatch ? dateMatch[1].trim() : new Date().toISOString().split("T")[0];

    cached = { eurRate, publishingDate, fetchedAt: now };
    req.log.info({ eurRate, publishingDate }, "BNR EUR rate fetched");

    res.json({ eurRate, publishingDate, source: "BNR", cached: false });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch BNR rate");
    // Return fallback if cache exists (even stale)
    if (cached) {
      res.json({ eurRate: cached.eurRate, publishingDate: cached.publishingDate, source: "BNR", cached: true, stale: true });
      return;
    }
    res.status(502).json({ error: "Failed to fetch BNR rate", fallbackRate: 5.14 });
  }
});

export default router;
