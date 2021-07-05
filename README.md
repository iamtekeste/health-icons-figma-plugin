# Health Icons Figma Plugin

Figma plugin that makes it super easy to find and insert free to use [health icons](https://www.figma.com/community/plugin/992844281461869440/Health-Icons-Figma-Plugin) to your figma files.

Get it here 👉️ https://www.figma.com/community/plugin/992844281461869440/Health-Icons-Figma-Plugin

## Development guide

_This plugin is built with [Create Figma Plugin](https://yuanqing.github.io/create-figma-plugin/)._

### Pre-requisites

- **[Node.js](https://nodejs.org) – v14 (this is a hard requirement, if you don't have node 14 or above your build will fail)**
- [Figma desktop app](https://figma.com/downloads/)

### Build the plugin

To build the plugin:

```
$ npm run build
```

This will generate a [`manifest.json`](https://figma.com/plugin-docs/manifest/) file and a `build/` directory containing a JavaScript bundle for the plugin.

To watch for code changes and rebuild the plugin automatically:

```
$ npm run watch
```

### Install the plugin

In the Figma desktop app:

1. Open a Figma document.
2. Go to `Plugins` → `Development` → `New Plugin…`.
3. Click the `Click to choose a manifest.json file` box, and select the `manifest.json` file that was generated.

### Debugging

Use `console.log` statements to inspect values in your code.

To open the developer console in the Figma desktop app, go to `Plugins` → `Development` → `Open Console`.

## See also

- [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/)
- [Storybook](https://yuanqing.github.io/create-figma-plugin/ui/)
- [Figma plugin API docs](https://figma.com/plugin-docs/api/)
- [`figma/plugin-samples`](https://github.com/figma/plugin-samples)
- [`yuanqing/figma-plugins`](https://github.com/yuanqing/figma-plugins)
