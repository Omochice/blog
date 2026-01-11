import { html } from "satori-html";

export type OGPTemplateProps = {
  title: string;
  siteName: string;
  date: string;
};

const TITLE_LENGTH_THRESHOLD = 30;
const LARGE_FONT_SIZE = 64;
const SMALL_FONT_SIZE = 48;

export function createOGPTemplate({ title, siteName, date }: OGPTemplateProps) {
  const fontSize =
    title.length > TITLE_LENGTH_THRESHOLD ? SMALL_FONT_SIZE : LARGE_FONT_SIZE;

  return html`
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 60px;
        background: linear-gradient(to bottom, rgb(229, 233, 240) 50%, #fff);
      "
    >
      <div
        style="
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
        "
      >
        <h1
          style="
            font-size: ${fontSize}px;
            font-weight: 700;
            color: rgb(34, 41, 57);
            text-align: center;
            line-height: 1.4;
          "
        >
          ${title}
        </h1>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        "
      >
        <span style="font-size: 24px; color: rgb(96, 115, 159);">${date}</span>
        <span style="font-size: 32px; font-weight: 700; color: #2337ff;">
          ${siteName}
        </span>
      </div>
    </div>
  `;
}
