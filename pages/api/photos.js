import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

// ID of the main folder that contains all gallery images and subfolders
const ROOT_FOLDER_ID = "1NR-DhALJiA7kPeafLSH5RgCVEKoeaV1l";

export default async function handler(req, res) {
  try {
    // Fetch subfolders within the root folder
    const folderRes = await drive.files.list({
      q: `'${ROOT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });

    const folders = folderRes.data.files || [];

    let photos = [];

    // Photos directly under the root folder
    const rootPhotoRes = await drive.files.list({
      q: `'${ROOT_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, parents)',
    });

    photos = photos.concat(
      (rootPhotoRes.data.files || []).map((file) => ({
        id: file.id,
        name: file.name,
        folderId: ROOT_FOLDER_ID,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
      }))
    );

    // Photos within each subfolder
    for (const folder of folders) {
      const imgRes = await drive.files.list({
        q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'files(id, name)',
      });

      photos = photos.concat(
        (imgRes.data.files || []).map((file) => ({
          id: file.id,
          name: file.name,
          folderId: folder.id,
          url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
        }))
      );
    }

    res.status(200).json({ folders, photos });
  } catch (error) {
    console.error('Failed to load photos', error);
    res.status(500).json({ error: 'Failed to load photos' });
  }
}
