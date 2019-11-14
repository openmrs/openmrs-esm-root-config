import i18n from "i18next";
import i18nextXhrBackend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";

(i18n.default || i18n)
  .use(i18nextXhrBackend)
  .use(initReactI18next)
  .use(ICU)
  .init({
    backend: {
      parse: data => data,
      loadPath: "{{lng}}|{{ns}}",
      ajax(url, options, callback, data) {
        const [language, namespace] = url.split("|");
        if (namespace && namespace !== "translation") {
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
        } else {
          callback(null, { status: 404 });
        }
      }
    },
    lng: "en",
    fallbackLng: "en"
  });

function decodeHtmlEntity(html) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
}
