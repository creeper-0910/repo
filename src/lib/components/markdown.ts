import * as cheerio from 'cheerio';
import { Marked, Parser, Renderer } from "marked";
export function parseMarkdown(source: string) {
    const marked = new Marked();
    const originalRenderer = new Renderer();
    originalRenderer.parser = new Parser();

    marked.use({
        breaks: true,
        useNewRenderer: true,
        renderer: {
          heading(heading) {
            if(heading.depth === 1) {
                return `<title>${heading.text}</title}>`;
            }
            return originalRenderer.heading(heading);
          },
        },
      });
      const html = marked.parse(source);
      const title =  typeof cheerio.load(html).html();
      console.log(html);
    return {
        title: title,
        html: html,
    };
}