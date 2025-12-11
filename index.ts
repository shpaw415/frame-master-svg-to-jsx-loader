import type { FrameMasterPlugin } from "frame-master/plugin/types";
import PackageJson from "./package.json";
import { transform } from "@svgr/core";

/**
 * Bun plugin that intercepts `.svg` file imports and transforms them into React JSX components.
 *
 * Uses [@svgr/core](https://react-svgr.com/) with the following transformation pipeline:
 * - **SVGO**: Optimizes and cleans up SVG markup
 * - **JSX**: Converts SVG to JSX syntax
 * - **Prettier**: Formats the generated code
 *
 * @remarks
 * The plugin operates in icon mode by default, removing explicit `width`/`height`
 * attributes and using `1em` for scalable sizing.
 */
const loaderPlugin: Bun.BunPlugin = {
  name: "svg-to-jsx-loader",
  setup(build) {
    build.onLoad({ filter: /\.svg$/ }, async (args) => {
      // Read SVG content from chained plugin or directly from file
      const svgCode =
        typeof args?.__chainedContents == "string"
          ? args?.__chainedContents
          : await Bun.file(args.path).text();

      // Transform SVG to JSX React component
      const componentCode = await transform(
        svgCode,
        {
          icon: true,
          typescript: false,
          exportType: "default",
          plugins: [
            "@svgr/plugin-svgo",
            "@svgr/plugin-jsx",
            "@svgr/plugin-prettier",
          ],
          jsxRuntime: "automatic",
        },
        { componentName: "SvgComponent" }
      );

      return {
        contents: componentCode,
        loader: "jsx",
      };
    });
  },
};

/**
 * Creates a Frame-Master plugin that enables importing SVG files as React components.
 *
 * @returns A configured {@link FrameMasterPlugin} instance with SVG-to-JSX transformation
 *          support for both runtime and build phases.
 *
 * @example
 * ```typescript
 * // frame-master.config.ts
 * import type { FrameMasterConfig } from "frame-master/server/types";
 * import svgToJsxLoader from "frame-master-svg-to-jsx-loader";
 *
 * const config: FrameMasterConfig = {
 *   HTTPServer: { port: 3000 },
 *   plugins: [svgToJsxLoader()],
 * };
 *
 * export default config;
 * ```
 *
 * @example
 * ```tsx
 * // Using SVG as a React component
 * import Logo from "./logo.svg";
 *
 * function Header() {
 *   return <Logo className="logo" width={100} height={50} />;
 * }
 * ```
 */
export default function svgToJsxLoader(): FrameMasterPlugin {
  return {
    name: PackageJson.name,
    version: PackageJson.version,
    runtimePlugins: [loaderPlugin],
    build: {
      buildConfig: {
        plugins: [loaderPlugin],
      },
    },
  };
}
