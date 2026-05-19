import cors from "cors"
import express from "express" ;// инструмент для создания сервера
import OpenAI from "openai" ; // инструмент для общения с ии
import {authorize, writeToSheet} from "./google.js";
const SPREADSHEET_ID = "1yn4Z_FjLeXhmESOuulncIMKiwiPNzxLTTp1psoj0UfQ";
const app = express () ; // express () создание сервера
app.use(cors());
app.use (express.json () ) ; //  позволяет считывать
const openai = new OpenAI ({ // создание клиента openai 
    apiKey : process.env.OPENAI_API_KEY
} ) ;

// функция запроса к ии
async function askAI (messages) {  //async функция работает через интернет ( не мгновенно)
    const response = await openai.chat.completions.create({ //await ждет пока ии ответит
        model: "gpt-4o-mini",
        messages: messages  // input и messages текст который я отправляю ии
    }) ;
    return response.choices[0].message.content;
    
}
//Маршрут
app.post ("/chat", async (req, res) =>{ // если кто то оправлет Post запрос на /chat сервер выполняет код и отвечает
    try{
        const messages =req.body.messages; // сервер берет текст из запроса . Получение текста от пользователя 
        if(!messages) {
            return res.status(400).json({error:"Нет вопроса"}); // если вопрос пустой сервер выдает ошибку 400
        }
        const answer = await askAI (messages); // передача вопроса , ожидаие ответа от ии
        //const auth = await authorize();
      // await writeToSheet(
       // auth,
        //SPREADSHEET_ID,
        //messages[messages.length - 1].content,
       // answer
       //);
       console.log("ANSWER:", answer);
        res.json ({ answer }); // ответ пользователю
    } catch (error) {
        console.error (error) ;
        res.status (500).json ({error : "Ошибка сервера"}) ;
    }
});
//Запуск сервераё
app.listen (3000 , () => {
    console.log ("Сервер запущен : http://localhost:3000") ;
}) ;// ии слушает порт 3000 и ждет запросы 
const SPREADSHEET_id = "1yn4Z_FjLeXhmESOuulncIMKiwiPNzxLTTp1psoj0UfQ/edit?pli=1&gid=0#gid=0"


//express coздает серер
//app.post создает маршрут
// req входяшие данные
// res ответ сервера
// async/await ожидание ответа от ии
// askAI функция для общения с OpenAI
//listen запуск сервера
// try зашита от краша
// catch если сервер упадет попробуй поймать ошибку
// ошибка 500 это сервер сломался 
//response.output_text; // возвращение только чистого ответа 