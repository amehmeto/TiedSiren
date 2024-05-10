'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ListInstalledAppsView =
  exports.getInstalledApps =
  exports.hello =
  exports.PI =
    void 0
// Import the native module. On web, it will be resolved to ListInstalledApps.web.ts
// and on native platforms to ListInstalledApps.ts
var ListInstalledAppsModule_1 = require('./src/ListInstalledAppsModule')
var ListInstalledAppsView_1 = require('./src/ListInstalledAppsView')
exports.ListInstalledAppsView = ListInstalledAppsView_1.default
// Get the native constant value.
exports.PI = ListInstalledAppsModule_1.default.PI
function hello() {
  return ListInstalledAppsModule_1.default.hello()
}
exports.hello = hello
function getInstalledApps() {
  return ListInstalledAppsModule_1.default.getInstalledApps()
}
exports.getInstalledApps = getInstalledApps
