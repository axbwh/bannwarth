const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-project-js": hot(preferDefault(require("C:\\Users\\bannw\\Desktop\\bannwarth\\src\\templates\\project.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("C:\\Users\\bannw\\Desktop\\bannwarth\\.cache\\dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("C:\\Users\\bannw\\Desktop\\bannwarth\\src\\pages\\404.js"))),
  "component---src-pages-about-js": hot(preferDefault(require("C:\\Users\\bannw\\Desktop\\bannwarth\\src\\pages\\about.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("C:\\Users\\bannw\\Desktop\\bannwarth\\src\\pages\\index.js")))
}

