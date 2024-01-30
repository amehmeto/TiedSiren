declare module 'react-native-installed-apps' {
  interface AppInfo {
    appName: string;
    // Add other properties if needed
  }

  function getAll(callback: (apps: AppInfo[]) => void): void;
}
