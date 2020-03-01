/**
 * For each entry, `key` is the chunk name, `value` has following properties:
 * - value.entry: webpack entry.
 * - value.html: options object passed to HtmlWebpackPlugin.
 * - value.html.inlineSource: if true, JS and CSS files will be inlined in HTML.
 */
exports.pages = {
  index: {
    html: {
      title: 'Lights',
    },
  },
  pixi: {
    html: {
      title: 'Lights',
      js: [
        'https://cdn.jsdelivr.net/npm/pixi.js@5.2.1/dist/pixi.min.js',
      ],
    },
  },
};

exports.global = {
  externals: {
    'pixi.js': 'PIXI',
  },
};
