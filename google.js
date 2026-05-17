import fs from "fs";
import { google } from "googleapis";
import readline from "node:readline";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = "token.json";

const credentials = JSON.parse(fs.readFileSync("credentials.json"));

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

export async function authorize() {
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Открой ссылку:", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Вставь код сюда: ", (code) => {
      oAuth2Client.getToken(code, (err, token) => {
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        rl.close();
        resolve(oAuth2Client);
      });
    });
  });
}
export async function writeToSheet(auth, spreadsheetId, question, answer) {
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "RAW",
    requestBody: {
      values: [[question, answer]],
    },
  });
}

//Google Sheets в проекте:

//1. authorize() — подключение к Google API
//2. token.json — хранит доступ
//3. SPREADSHEET_ID — ID таблицы
//4. writeToSheet() — запись данных
//5. range "Sheet1!A:B":
  // A — question
   //B — answer
//6. values: [[question, answer]] — строка таблицы

//Ошибки:
//- access_denied → нет доступа
//- access_token null → нет токена
//- invalid range → ошибка в названии листа