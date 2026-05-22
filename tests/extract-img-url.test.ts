import { extractImgUrl } from '../src/index';

describe('extractImgUrl', () => {
  test('should extract image url from `![]()`', () => {
    const markdown = '![alt text](https://example.com/image.png)';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image.png');
  });

  test('should extract image url from `![]()` with title text', () => {
    const markdown = '![alt text](https://example.com/image.png "title")';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image.png');
  });

  test('should extract image url from `<img>`', () => {
    const markdown = '<img src="https://example.com/image.png" alt="alt text">';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image.png');
  });

  test('should extract image url from markdown embedded in surrounding text', () => {
    const markdown = 'Intro text ![alt text](https://example.com/image.png) outro text';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image.png');
  });

  test('should extract image url from markdown with a relative path', () => {
    const markdown = '![alt text](/images/cover.png)';
    const url = extractImgUrl(markdown);
    expect(url).toBe('/images/cover.png');
  });

  test('should extract image url from two lines', () => {
    const markdown = '![alt text](https://example.com/image1.png)\r![alt text](https://example.com/image2.png)';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image1.png');
  });

  test('should extract image url from two lines in different formats (1)', () => {
    const markdown = '<img src="https://example.com/image1.png" alt="alt text">\r![alt text](https://example.com/image2.png)';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image1.png');
  });

  test('should extract image url from two lines in different formats (2)', () => {
    const markdown = '![](https://example.com/image1.png)\r![](https://example.com/image2.png "title text")';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image1.png');
  });

  test('should extract image url from two lines in different formats (3)', () => {
    const markdown = '![alt text](https://example.com/image1.png)\r<img src="https://example.com/image2.png" alt="alt text">';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image1.png');
  });

  test('should extract image url from multiline html img tags', () => {
    const markdown = `<img
  src="https://example.com/image.png"
  alt="alt text"
/>`;
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image.png');
  });

  test('should extract the first image url when markdown image is followed by html image on the same line', () => {
    const markdown = '![](https://example.com/image1.png) <img src="https://example.com/image2.png" alt="alt text">';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image1.png');
  });

  test('should extract the first image url when html image is followed by markdown image on the same line', () => {
    const markdown = '<img src="https://example.com/image1.png" alt="alt text"> ![](https://example.com/image2.png)';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image1.png');
  });

  test('should extract the first image url when multiple html images exist on the same line', () => {
    const markdown = '<img src="https://example.com/image1.png" alt="first"><img src="https://example.com/image2.png" alt="second">';
    const url = extractImgUrl(markdown);
    expect(url).toBe('https://example.com/image1.png');
  });

  test('should return undefined when the markdown does not contain any images', () => {
    const markdown = '# Hello World\n\nThis text does not contain any images.';
    const url = extractImgUrl(markdown);
    expect(url).toBeUndefined();
  });

});
