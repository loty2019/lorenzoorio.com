import { google } from "googleapis";

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
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    result.data.on("error", (err) => {
      console.error("Drive stream error", err);
      res.status(500).end("stream error");
    });

    result.data.pipe(res);
  } catch (error) {
    console.error("Drive request failed", error);
    res.status(500).end("image fetch failed");
  }
}
