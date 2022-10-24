import {parser} from "@lezer/json"
import {continuedIndent, indentNodeProp, foldNodeProp, foldInside, LRLanguage, LanguageSupport} from "@codemirror/language"

/// A language provider that provides JSON parsing.
export const jsonLanguage = LRLanguage.define({
  name: "json",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Object: continuedIndent({except: /^\s*\}/}),
        Array: continuedIndent({except: /^\s*\]/})
      }),
      foldNodeProp.add({
        "Object Array": foldInside
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["[", "{", '"']},
    indentOnInput: /^\s*[\}\]]$/
  }
})

/// JSON language support.
export function json() {
  return new LanguageSupport(jsonLanguage)
}

export {jsonParseLinter} from "./lint"
