// src/scripts/auto-translate.js
import fs from "fs";

// Dynamically import the package
import { translate } from "@vitalets/google-translate-api";;

// Path to English source file
const sourcePath = "./src/assets/i18n/en.json";
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

async function translateObject(obj, lang) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = await translateObject(obj[key], lang);
    } else {
      try {
        // IMPORTANT: call translate() directly
        const res = await translate(obj[key], { to: lang });
        result[key] = res.text;
      } catch (err) {
        console.error(
          `Error translating "${obj[key]}" to ${lang}:`,
          err.message,
        );
        result[key] = obj[key]; // fallback
      }
    }
  }
  return result;
}

async function generate(lang) {
  const translated = await translateObject(source, lang);
  const outPath = `./src/assets/i18n/${lang}.json`;
  fs.writeFileSync(outPath, JSON.stringify(translated, null, 2));
  console.log(`Generated ${lang}.json`);
}

// Run translations
await generate("fr");
await generate("es");
await generate("ar");
