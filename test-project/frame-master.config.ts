import type { FrameMasterConfig } from "frame-master/server/types";
import SVGToJsxLoader from "..";
export default {
  HTTPServer: {
    port: 3000,
  },
  plugins: [
    {
      name: "entrypoints",
      version: "1.0.0",
      build: {
        buildConfig: {
          entrypoints: ["index.tsx"],
        },
      },
    },
    SVGToJsxLoader(),
  ],
} satisfies FrameMasterConfig;
