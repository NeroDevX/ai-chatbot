console.log("Hello World")
let name="Bro"
//let переменная которою моно менять 
const greeting="Здарова"
//const переменная которую нельзя менять
console.log(greeting+","+ name+"!")//console.log просит пк показать что под значением которое мы указываем
///////////


let tasks=["Написать код","Подключить AI ", "Заработать денег"];
console.log(tasks[0]);//написать код начинаеться с 0 и дальше подходит для списков и тд
let project={
    name:"AI-чат",
    status:"Заморожен"
};//для данных у которых есть статус где нужно понимать что за что отвечает
console.log(project.name);
//АI-chat показывает имя проекта 
console.log(project.status)
//Заморожен показывает статус проекта


//////////////
let balance = 100;
if(balance>50){
    console.log("Можно купить курс");//if выполняяеться если условие true то есть если баланс больше 50 
}
else{//else выполняеться если условие false то есть если баланс меньще 50
    console.log("Накопи еще");
}
/////////////
 function greet(name){// function коробка с кодом которую можно использовать несколько раз позволяет не повторять один и тот же код
    return " привет, " + name + "!";//return выдача результата из функции
 }
 console.log(greet("Бро"));
///////////

function number(a, b) {
    return a + b; // +- это дейсвие соверщонное между 2 обьектами
}
console.log(number(5, 7)); ///5 7 числа которые мы сумируем 
/////////


import OpenAI from "openai";
//подключение openai для джавы
const openai = new OpenAI ({ apiKey :process.env.OPENAI_API_KEY });
 //new openai (...) создает клиент через который идут запросы
// apikey мой ключ , process.env.OPENAI_API_KEY ключ береться из переменных окружения


async function askAI(question){ 
    //async когда запрос идет через интернет (не мнгновенный) , question просто название там может бытть любое нахвание это текст который отправляю модели 
    
    const response = await 
    // await это  значит подождать пока ответ прийдет
    openai.responses.create({ //это основной метод обращения к ии
        model:"gpt-4.1-mini",// модель ии через который идет запросс , версия
        input: question // текс который я отправляю ии 
    });
    console.log(response.output_text);// response это коробка весь ответ ии на вопрос а response.output_tex это ответ который мне нужен без лишнего
}
askAI("Привет, расскажи шутку")
