import { AppsScriptEventType } from "types";

/**
 * Checks if an Apps Script event matches specific filters defined in method options.
 * This allows event handlers to be triggered conditionally based on properties of the event, such as the edited range in a sheet, the ID of a submitted form, or the type of change.
 *
 * @param   eventType - The type of Apps Script event (e.g., EDIT, FORM_SUBMIT).
 * @param   event - The raw Apps Script event object. Its type varies based on `eventType`.
 * @param   methodOptions - An object containing filtering options for the event.
 * @returns `true` if the event matches the specified filters or if no filters are defined, otherwise `false`.
 */
export function checkEventFilters(
  eventType: AppsScriptEventType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodOptions: Record<string, any> | undefined
): boolean {
  if (!methodOptions) {
    return true;
  }

  switch (eventType) {
    case AppsScriptEventType.EDIT:
      if (methodOptions.range) {
        const eventRangeA1 = (
          event as GoogleAppsScript.Events.SheetsOnEdit
        ).range?.getA1Notation();

        if (!eventRangeA1) {
          return false;
        }

        const ranges = Array.isArray(methodOptions.range)
          ? methodOptions.range
          : [methodOptions.range];

        return ranges.some((r: string | RegExp) => {
          if (r instanceof RegExp) {
            return r.test(eventRangeA1);
          }

          return eventRangeA1 === r;
        });
      }
      break;

    case AppsScriptEventType.FORM_SUBMIT:
      if (methodOptions.formId) {
        const eventFormId = (
          event as GoogleAppsScript.Events.FormsOnFormSubmit
        ).source?.getId?.();

        if (!eventFormId) {
          return false;
        }

        const formIds = Array.isArray(methodOptions.formId)
          ? methodOptions.formId
          : [methodOptions.formId];

        return formIds.some((id: string) => eventFormId === id);
      }
      break;

    case AppsScriptEventType.CHANGE:
      if (methodOptions.changeType) {
        const eventChangeType = (
          event as GoogleAppsScript.Events.SheetsOnChange
        ).changeType;

        if (!eventChangeType) {
          return false;
        }

        const changeTypes = Array.isArray(methodOptions.changeType)
          ? methodOptions.changeType
          : [methodOptions.changeType];

        return changeTypes.some(type => eventChangeType === type);
      }
      break;
  }

  return true;
}
