const MARKDOWN_IMAGE_REGEX = /\!\[[^\]]*\]\(\s*(?<url>[^\s\)]+)\s*(?:\s+"[^"]*")?\)/g;
const HTML_IMAGE_REGEX = /<img\b[^>]*\bsrc=(?<quote>['"])(?<url>.*?)\k<quote>[^>]*>/gi;

type ImageMatch = {
  index: number;
  url: string;
};

const findFirstMatch = (markdown: string, regex: RegExp): ImageMatch | undefined => {
  regex.lastIndex = 0;
  const match = regex.exec(markdown);
  const url = match?.groups?.url;

  if (!match || match.index === undefined || url === undefined) {
    return undefined;
  }

  return {
    index: match.index,
    url,
  };
};

/**
 * Extracts the first image url from a markdown string
 * @param {string} markdown The markdown string to extract image url
 */
export const extractImgUrl = (markdown: string): string | undefined => {
  const markdownMatch = findFirstMatch(markdown, MARKDOWN_IMAGE_REGEX);
  const htmlMatch = findFirstMatch(markdown, HTML_IMAGE_REGEX);

  if (!markdownMatch) {
    return htmlMatch?.url;
  }

  if (!htmlMatch) {
    return markdownMatch.url;
  }

  return markdownMatch.index <= htmlMatch.index ? markdownMatch.url : htmlMatch.url;
};
