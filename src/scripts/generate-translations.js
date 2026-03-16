const fs = require("fs");
const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({ key: "YOUR_API_KEY" });

const languages = ["fr", "es", "pt"];

const source = JSON.parse(fs.readFileSync("./src/assets/i18n/en.json"));

async function translateObject(obj, lang) {
  const result = {};

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = await translateObject(obj[key], lang);
    } else {
      const [translation] = await translate.translate(obj[key], lang);
      result[key] = translation;
    }
  }

  return result;
}

(async () => {
  for (const lang of languages) {
    const translated = await translateObject(source, lang);
    fs.writeFileSync(
      `./src/assets/i18n/${lang}.json`,
      JSON.stringify(translated, null, 2),
    );
  }
})();
