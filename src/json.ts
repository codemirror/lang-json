import {parser} from "@lezer/json"
import {continuedIndent, indentNodeProp, foldNodeProp, foldInside, LezerLanguage, LanguageSupport} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

/// A language provider that provides JSON parsing.
export const jsonLanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Object: continuedIndent({except: /^\s*\}/}),
        Array: continuedIndent({except: /^\s*\]/})
      }),
      foldNodeProp.add({
        "Object Array": foldInside
      }),
      styleTags({
        String: t.string,
        Number: t.number,
        "True False": t.bool,
        PropertyName: t.propertyName,
        null: t.null,
        ",": t.separator,
        "[ ]": t.squareBracket,
        "{ }": t.brace
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
