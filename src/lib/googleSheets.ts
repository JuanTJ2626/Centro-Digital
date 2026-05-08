import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), 'google-credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const getGoogleSheetsInstance = async () => {
  return google.sheets({ version: 'v4', auth });
};

export const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '';
