import { TextToImage } from "deepinfra";
import { createWriteStream } from "fs";
import { Readable } from "stream";

const DEEPINFRA_API_KEY = "PTlSMmC29tlVH0pkbVxeoTCDf83P3cfC"; // Ваш API-ключ
const MODEL = "prompthero/openjourney";

const main = async () => {
  const model = new TextToImage(MODEL, DEEPINFRA_API_KEY);
  const response = await model.generate({
    prompt: "a burger with a funny hat on the beach",
  });

  const result = await fetch(response.images[0]);

  if (result.ok && result.body) {
    let writer = createWriteStream("image.png"); // запись в отдельный файл
    Readable.fromWeb(result.body).pipe(writer);
  }
};

main();
