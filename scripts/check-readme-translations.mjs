#!/usr/bin/env node
/**
 * Checks that README translations stay in sync with README.md.
 *
 * For every language in LANGUAGES it verifies that README.<code>.md exists,
 * contains the exact language switcher line, has the same number of `##` and
 * `###` headings as README.md, and that its translation note names the
 * current package.json version. README.md itself must carry the switcher too.
 *
 * A right-to-left translation wraps its prose in `<div dir="rtl" ...>` blocks.
 * Those wrapper lines are skipped when looking for the note, and the headings
 * inside them still count, since they stay `##`/`###` lines of their own.
 *
 * Usage: npm run docs:check-i18n
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Languages in switcher order. `code: null` is the English source README.md.
 */
const LANGUAGES = [
  { code: null, label: "English" },
  { code: "uk", label: "Українська" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
  { code: "nl", label: "Nederlands" },
  { code: "pl", label: "Polski" },
  { code: "cs", label: "Čeština" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" }
];

/**
 * Returns the README file name for a language code.
 *
 * @param {string | null} code Language code, or null for English.
 * @returns {string} File name relative to the repository root.
 */
function fileName(code) {
  return code ? `README.${code}.md` : "README.md";
}

/**
 * Builds the expected switcher line for the given current language.
 *
 * @param {string | null} current Language code of the file being checked.
 * @returns {string} The switcher line.
 */
function switcherLine(current) {
  return LANGUAGES.map(({ code, label }) =>
    code === current ? `**${label}**` : `[${label}](${fileName(code)})`
  ).join(" | ");
}

/**
 * Tells whether a line only opens or closes a right-to-left wrapper block.
 *
 * @param {string} line File line.
 * @returns {boolean} True for `<div dir="rtl" ...>` and `</div>` lines.
 */
function isRtlWrapper(line) {
  const trimmed = line.trim();

  return /^<div\b[^>]*\bdir="rtl"[^>]*>$/.test(trimmed) || trimmed === "</div>";
}

/**
 * Counts `##` and `###` headings outside fenced code blocks.
 *
 * @param {string[]} lines File lines.
 * @returns {{h2: number, h3: number}} Heading counts.
 */
function countHeadings(lines) {
  let fence = false;
  let h2 = 0;
  let h3 = 0;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      fence = !fence;
      continue;
    }
    if (fence) continue;
    if (/^## /.test(line)) h2++;
    else if (/^### /.test(line)) h3++;
  }
  return { h2, h3 };
}

const version = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;
const errors = [];

const sourceLines = readFileSync(join(ROOT, "README.md"), "utf8").split(/\r?\n/);
const source = countHeadings(sourceLines);

if (!sourceLines.includes(switcherLine(null))) {
  errors.push("README.md: language switcher line is missing or differs");
}

for (const { code } of LANGUAGES.filter((language) => language.code)) {
  const name = fileName(code);
  const path = join(ROOT, name);

  if (!existsSync(path)) {
    errors.push(`${name}: file is missing`);
    continue;
  }

  const lines = readFileSync(path, "utf8").split(/\r?\n/);

  const switcherIndex = lines.indexOf(switcherLine(code));

  if (switcherIndex === -1) {
    errors.push(`${name}: language switcher line is missing or differs`);
  } else {
    let index = switcherIndex + 1;

    while (index < lines.length && (lines[index].trim() === "" || isRtlWrapper(lines[index]))) {
      index++;
    }

    const note = [];

    while (index < lines.length && lines[index].startsWith(">")) note.push(lines[index++]);

    const found = note.join(" ").match(/\b\d+\.\d+\.\d+(?:-[\w.]+)?\b/);

    if (!note.length) {
      errors.push(`${name}: translation note (blockquote right after the switcher) is missing`);
    } else if (!found) {
      errors.push(`${name}: translation note does not mention a version`);
    } else if (found[0] !== version) {
      errors.push(`${name}: translation note says ${found[0]}, package.json is ${version}`);
    }
  }

  const counts = countHeadings(lines);

  if (counts.h2 !== source.h2 || counts.h3 !== source.h3) {
    errors.push(
      `${name}: headings ##=${counts.h2} ###=${counts.h3}, README.md has ##=${source.h2} ###=${source.h3}`
    );
  }
}

if (errors.length) {
  console.error("README translation check failed:");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(
  `README translations OK: ${LANGUAGES.length - 1} languages, version ${version}, ##=${source.h2} ###=${source.h3}`
);
