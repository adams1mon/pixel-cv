"use client";

import { Font } from '@react-pdf/renderer';

export function setupFonts() {

  // export function ensureEmojiSourceRegistered() {
  //   if (registered) return;
  //   // Register Twemoji PNG set (72x72). React-PDF will fetch by codepoint file name.
  //   Font.registerEmojiSource({
  //     format: 'png',
  //     url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/'
  //   });
  //   registered = true;
  // } 

  Font.registerEmojiSource({
    format: 'png',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/'
  });

  // TODO: load more fonts, show them as choices (?) for every text field
  Font.register({
    family: "Inter",
    fonts: [
      {
        fontStyle: "normal",
        fontWeight: 400,
        src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50qjIw2boKoduKmMEVuLyfMZg.ttf",
      },
      {
        fontStyle: "normal",
        fontWeight: 800,
        src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp506jIw2boKoduKmMEVuDyYMZg.ttf",
      },
    ]
  });

  Font.register({
    family: "Roboto",
    fonts: [
      {
        fontStyle: "normal",
        fontWeight: 300,
        src: "https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuaabWmT.ttf",
      },
      {
        fontStyle: "normal",
        fontWeight: 400,
        src: "https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmT.ttf",
      },
      {
        fontStyle: "normal",
        fontWeight: 800,
        src: "https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZEammT.ttf",
      },
    ]
  });
}