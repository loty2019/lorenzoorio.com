import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

export default async function handler(req, res) {
    const folderId = "1NR-DhALJiA7kPeafLSH5RgCVEKoeaV1l";

  const response = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id, name)",
  });

  const files = response.data.files.map((file) => ({
    id: file.id,
    name: file.name,
    url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
  }));
  

  res.status(200).json(files);
}
