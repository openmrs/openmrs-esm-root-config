import i18n from "i18next";
import i18nextXhrBackend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";

window.i18next = i18n.default || i18n;

const languageChangeObserver = new MutationObserver(() => {
  window.i18next.changeLanguage().catch(e => {
    console.error("i18next failed to re-detect language");
    console.error(e);
  });
});
languageChangeObserver.observe(document.documentElement, {
  attributeFilter: ["lang"],
  attributes: true
});

export const translationsPromise = (i18n.default || i18n)
  .use(LanguageDetector)
  .use(i18nextXhrBackend)
  .use(initReactI18next)
  .use(ICU)
  .init({
    backend: {
      parse: data => data,
      loadPath: "{{lng}}|{{ns}}",
      ajax(url, options, callback, data) {
        const [language, namespace] = url.split("|");
        if (namespace === "translation") {
          callback(null, { status: 404 });
        } else {
          System.import(decodeHtmlEntity(namespace))
            .then(m => {
              if (typeof m.importTranslation !== "function") {
                throw Error(
                  `Module ${namespace} does not export an importTranslation function`
                );
              }

              const importPromise = m.importTranslation(`./${language}.json`);

              if (!(importPromise instanceof Promise)) {
                throw Error(
                  `Module ${namespace} exports an importTranslation function that does not return a promise. Did you forget to set require.context mode to 'lazy'?`
                );
              }

              return importPromise;
            })
            .then(json => {
              callback(json, { status: 200 });
            })
            .catch(err => {
              console.error(err);
              callback(null, { status: 404 });
            });
        }
      }
    },
    detection: {
      order: ["querystring", "htmlTag", "localStorage", "navigator"]
    },
    fallbackLng: "en"
  });

function decodeHtmlEntity(html) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
}
