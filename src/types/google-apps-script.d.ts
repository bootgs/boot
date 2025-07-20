declare global {
  namespace GoogleAppsScript {
    namespace Events {
      interface SheetsOnSelectionChange extends AppsScriptEvent {
        source: GoogleAppsScript.Spreadsheet.Spreadsheet;
        range: GoogleAppsScript.Spreadsheet.Range;
      }
    }
  }
}

export {};
