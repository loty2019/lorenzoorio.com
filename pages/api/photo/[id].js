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

    res.setHeader("Content-Type", "image/jpeg");
    result.data.pipe(res);
  } catch (error) {
    res.status(500).send("Image fetch failed");
  }
}
