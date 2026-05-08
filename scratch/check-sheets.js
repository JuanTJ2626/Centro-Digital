const { google } = require('googleapis');
const path = require('path');

async function checkSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'google-credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1qMud5g2lAN1eKyu3frhEQNX3Zo3YCfkMLT6YPYO1a0s';
  
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    console.log('Sheet names found:');
    response.data.sheets.forEach(s => {
      console.log(`- ${s.properties.title}`);
    });
  } catch (error) {
    console.error('Error fetching spreadsheet:', error.message);
  }
}

checkSheets();
