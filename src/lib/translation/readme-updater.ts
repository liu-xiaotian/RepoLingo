// README 多语言链接生成和插入

import { LANGUAGE_NAMES } from "@/config/constants";

/**
 * 生成多语言切换链接
 */
export function generateLanguageLinks(languages: string[]): string {
  const links = languages.map((lang) => {
    const name = LANGUAGE_NAMES[lang] || lang;
    return `[${name}](./translations/${lang}/README.md)`;
  });

  return `## 🌐 Translations

${links.join(" | ")}

---

`;
}

/**
 * 查找插入位置
 */
export function findInsertPosition(content: string): number {
  const lines = content.split("\n");

  // 策略1: 如果已有语言切换区域，返回其位置
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^##\s*🌐/)) {
      return i;
    }
  }

  // 策略2: 在第一个 ## 标题之前插入
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^##\s+/)) {
      return i;
    }
  }

  // 策略3: 在 # 标题之后的第一个空行之后插入
  let foundTitle = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^#\s+/)) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && lines[i].trim() === "" && i + 1 < lines.length) {
      return i + 1;
    }
  }

  // 策略4: 在文件开头插入
  return 0;
}

/**
 * 插入多语言链接到 README
 */
export function insertLanguageLinks(
  content: string,
  languages: string[],
): string {
  const links = generateLanguageLinks(languages);
  const lines = content.split("\n");
  const position = findInsertPosition(content);

  // 如果存在旧的语言链接区域，先删除
  const cleanedLines: string[] = [];
  let skipUntilSeparator = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^##\s*🌐/)) {
      skipUntilSeparator = true;
      continue;
    }
    if (skipUntilSeparator && lines[i].trim() === "---") {
      skipUntilSeparator = false;
      continue;
    }
    if (!skipUntilSeparator) {
      cleanedLines.push(lines[i]);
    }
  }

  // 插入新的语言链接
  cleanedLines.splice(position, 0, links);

  return cleanedLines.join("\n");
}
