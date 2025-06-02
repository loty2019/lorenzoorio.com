import { google } from "googleapis";
import path from "path";
import sharp from "sharp";

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
      const fullBuffer = Buffer.concat(buffers);

      // Resize and compress with sharp NOTE: sharp incompatible with vercel
      // const optimizedBuffer = await sharp(fullBuffer)
      //   .resize({ width: 1600 }) // or smaller if needed
      //   .jpeg({ quality: 80 }) // adjust quality as desired
      //   .toBuffer();

      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Content-Disposition", "inline");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.send(optimizedBuffer);
      return;
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
