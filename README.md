# extract-img-url

Extract the first image URL from a Markdown string.

This package uses regular expressions instead of a full Markdown parser, so it stays small and fast for common input.

## Requirements

- Node.js 18 or later

## Installation

```bash
npm install extract-img-url
```

## Usage

```ts
import { extractImgUrl } from 'extract-img-url';

const markdown = `
# Hello World

Intro text.

![cover](https://example.com/cover.png)
`;

const imageUrl = extractImgUrl(markdown);

console.log(imageUrl);
// => "https://example.com/cover.png"
```

If no image is found, the function returns `undefined`.

## API

```ts
extractImgUrl(markdown: string): string | undefined
```

Returns the URL of the first image that appears in the input string.

## Supported Input

Common Markdown image syntax:

```md
![image](https://example.com/image.png)
![image](https://example.com/image.png "title")
![image](/images/cover.png)
```

HTML `img` tags:

```html
<img src="https://example.com/image.png">
<img src="https://example.com/image.png" alt="image" />
<img
  src="https://example.com/image.png"
  alt="image"
/>
```

Mixed content:

```md
Text before
![image](https://example.com/image-1.png)
<img src="https://example.com/image-2.png" alt="image">
```

When both Markdown images and HTML `img` tags are present, the function returns the one that appears first in the string.

## Scope

This library is optimized for typical Markdown and HTML image patterns. It does not aim to fully replicate Markdown parser behavior for rare or highly irregular edge cases.

## License

MIT
