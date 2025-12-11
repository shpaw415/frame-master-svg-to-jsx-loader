# frame-master-svg-to-jsx-loader

A [Frame-Master](https://github.com/frame-master) plugin that transforms SVG files into React JSX components at build time and runtime.

## Installation

```bash
bun add frame-master-svg-to-jsx-loader
```

## Usage

### 1. Configure the Plugin

Add the plugin to your `frame-master.config.ts`:

```typescript
import type { FrameMasterConfig } from "frame-master/server/types";
import svgToJsxLoader from "frame-master-svg-to-jsx-loader";

const config: FrameMasterConfig = {
  HTTPServer: { port: 3000 },
  plugins: [svgToJsxLoader()],
};

export default config;
```

### 2. Add TypeScript Support

Add this module declaration to your `.frame-master/frame-master-custom-type.d.ts`

```typescript
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
```

### 3. Import and Use SVGs as Components

```tsx
import Logo from "./assets/logo.svg";
import Icon from "./icons/arrow.svg";

function App() {
  return (
    <div>
      <Logo className="logo" width={200} height={100} />
      <Icon style={{ fill: "red" }} />
    </div>
  );
}
```

## Features

- **SVG to JSX Transformation** - Automatically converts SVG files into React functional components
- **Full SVG Props Support** - Pass any valid SVG props (`className`, `style`, `width`, `height`, `fill`, etc.)
- **SVGO Optimization** - SVGs are optimized using [SVGO](https://github.com/svg/svgo) for smaller bundle sizes
- **Prettier Formatting** - Generated JSX is formatted with Prettier for clean output
- **Icon Mode** - SVGs use `1em` sizing by default, making them easy to scale with font-size
- **Runtime & Build Support** - Works both during development (runtime) and production builds
- **TypeScript Support** - Full type definitions for SVG imports

## How It Works

This plugin uses [@svgr/core](https://react-svgr.com/) under the hood to transform SVG files into React components. The transformation pipeline includes:

1. **SVGO** - Optimizes and cleans up SVG markup
2. **JSX Transform** - Converts SVG to JSX syntax
3. **Prettier** - Formats the output code

## Peer Dependencies

- `frame-master` ^3.0.0
- `typescript` ^5

## License

MIT
