async function generateImage() {
  const API_URL =
    "https://api.deepinfra.com/v1/inference/prompthero/openjourney";
  const API_KEY = "PTlSMmC29tlVH0pkbVxeoTCDf83P3cfC";

  try {
    const prompt_text = document.querySelector(".generation__input");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt_text.value,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }

    const data = await response.json();

    // Извлекаем изображение в формате Base64
    const base64Image = data.images[0];
    const imgElement = document.querySelector(".result__image");

    // Устанавливаем изображение и показываем его
    imgElement.src = base64Image;
    imgElement.style.display = "block";
  } catch (error) {
    console.error("Ошибка при генерации изображения:", error);
  }
}

const generateButton = document.querySelector(".generation__submit-btn");

generateButton.addEventListener("click", generateImage);
