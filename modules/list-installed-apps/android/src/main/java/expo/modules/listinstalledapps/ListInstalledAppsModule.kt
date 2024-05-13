package expo.modules.listinstalledapps

import android.content.Intent
import android.content.pm.ResolveInfo
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


class ListInstalledAppsModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ListInstalledApps')` in JavaScript.
    Name("ListInstalledApps")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello from Nicolas! 👋"
    }

    Function("listInstalledApps") { context: android.content.Context ->
      val mainIntent = Intent(Intent.ACTION_MAIN, null)
      mainIntent.addCategory(Intent.CATEGORY_LAUNCHER)
      val pkgAppsList: List<ResolveInfo> = context.getPackageManager().queryIntentActivities(mainIntent, 0)

      pkgAppsList
    }
  }
}
