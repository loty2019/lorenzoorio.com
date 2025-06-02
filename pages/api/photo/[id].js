import { google } from "googleapis";
import path from "path";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

export default async function handler(req, res) {
  const { id } = req.query;
  const drive = google.drive({ version: "v3", auth });

  try {
    const result = await drive.files.get(
      { fileId: id, alt: "media" },
      { responseType: "stream" }
    );

    // Collect stream into a buffer
    const buffers = [];
    result.data.on("data", (chunk) => buffers.push(chunk));

    result.data.on("end", async () => {
      try {
        const fullBuffer = Buffer.concat(buffers);

        let exif = {};
        try {
          const exifr = await import("exifr");
          exif = await exifr.parse(fullBuffer);
        } catch (err) {
          console.warn("EXIF parse failed:", err.message);
        }

        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Content-Disposition", "inline");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.setHeader("x-photo-meta", JSON.stringify(exif));
        res.send(fullBuffer);
      } catch (err) {
        console.error("Response error:", err.message);
        res.status(500).send("Server error processing image");
      }
    });

    result.data.on("error", (err) => {
      console.error(err);
      res.status(500).send("Image stream error");
      return;
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Image fetch failed");
    return;
  }
}
