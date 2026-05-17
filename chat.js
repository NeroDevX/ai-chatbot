import OpenAI from "openai";
import readline from "readline";// модуль позволяющий писать в консоли

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});// создание обьекта openai и подключение ключа который береться из системы

async function askAI(question) {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: question
  });

  console.log(response.output_text);// выводим нужный ответ в консоль
}

const rl = readline.createInterface({// readline грубо говоря переводчик между мной и программой 
  input: process.stdin, //stdin запрос программе
  output: process.stdout //stdout ответ программы 
});

rl.question("Скажи что-нибудь AI: ", async (msg) => {// открываем ввод 
  await askAI(msg);// просим подождать так как не мгновенный ответ
  rl.close();//закрытие ввод 
});