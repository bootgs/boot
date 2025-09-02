import { isRegExp, isString } from "appsscript-utils";
import { nonEmpty } from "appsscript-utils/src/base/nonEmpty"; // FIXME
import {
  APPSSCRIPT_EVENT_METADATA,
  APPSSCRIPT_OPTIONS_METADATA,
  METHOD_METADATA,
  PATH_METADATA
} from "../config/constants";
import { AppsScriptEventType, RequestMethod } from "../types";

/**
 * Options for Google Apps Script events.
 *
 * This interface defines event-specific filters for `onEdit`, `onFormSubmit`, and `onChange` handlers.
 */
interface AppsScriptOptions {
  eventType: AppsScriptEventType;
  range?: string | string[] | RegExp;
  formId?: string | string[];
  changeType?:
    | GoogleAppsScript.Events.SheetsOnChangeChangeType
    | GoogleAppsScript.Events.SheetsOnChangeChangeType[];
}

/**
 * A factory function that creates a method decorator for Google Apps Script event handlers.
 *
 * @param   eventType - The specific type of Apps Script event to handle.
 * @param   options - Optional filters for the event.
 * @returns A method decorator.
 */
function createAppsScriptDecorator(
  eventType: AppsScriptEventType,
  options?: Omit<AppsScriptOptions, "eventType">
): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target, key, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.defineMetadata(
      APPSSCRIPT_EVENT_METADATA,
      eventType,
      descriptor.value
    );
    Reflect.defineMetadata(
      APPSSCRIPT_OPTIONS_METADATA,
      options || {},
      descriptor.value
    );

    return descriptor;
  };
}

/**
 * A method decorator for handling the `onInstall` event in Google Sheets.
 *
 * It fires when the add-on is first installed by a user.
 *
 * @see         Open
 * @see         Edit
 * @see         Change
 * @see         SelectionChange
 * @see         FormSubmit
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Install = () =>
  createAppsScriptDecorator(AppsScriptEventType.INSTALL);

/**
 * A method decorator for handling the `onOpen` event in Google Sheets.
 *
 * It fires when a user opens the spreadsheet.
 *
 * @see         Install
 * @see         Edit
 * @see         Change
 * @see         SelectionChange
 * @see         FormSubmit
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Open = () => createAppsScriptDecorator(AppsScriptEventType.OPEN);

/**
 * A method decorator for handling the `onEdit` event in Google Sheets.
 *
 * It fires when the contents of a spreadsheet's cells are changed manually.
 *
 * @param args - An optional list of one or more A1-notations (e.g., 'A1:C5'), sheet names (e.g., 'Sheet1'), or a regular expression.
 * @see         Install
 * @see         Open
 * @see         Change
 * @see         SelectionChange
 * @see         FormSubmit
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Edit = (...args: (string | RegExp | string[])[]) => {
  const options: Partial<Pick<AppsScriptOptions, "range">> = {};

  if (args.length > 0) {
    if (isRegExp(args[0]) && args.length === 1) {
      options.range = args[0];
    } else {
      const flattenedRanges = args.flat(Infinity).filter(isString) as string[];

      if (nonEmpty(flattenedRanges)) {
        options.range =
          flattenedRanges.length === 1 ? flattenedRanges[0] : flattenedRanges;
      } else if (
        args.some(arg => isRegExp(arg) || Array.isArray(arg) || isString(arg))
      ) {
        console.warn("Edit decorator: Unsupported or invalid range argument.");
      }
    }
  }

  return createAppsScriptDecorator(AppsScriptEventType.EDIT, options);
};

/**
 * A method decorator for handling the `onChange` event in Google Sheets.
 *
 * It fires on any change in the spreadsheet (including changes to formulas, moving rows, inserting images, etc.).
 *
 * @param       [changeType] - An optional filter by change type.
 * @see         Install
 * @see         Open
 * @see         Edit
 * @see         SelectionChange
 * @see         FormSubmit
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Change = (
  changeType?:
    | GoogleAppsScript.Events.SheetsOnChangeChangeType
    | GoogleAppsScript.Events.SheetsOnChangeChangeType[]
) => createAppsScriptDecorator(AppsScriptEventType.CHANGE, { changeType });

/**
 * A method decorator for handling the `onSelectionChange` event in Google Sheets.
 *
 * It fires when a user's cell selection changes.
 *
 * @see         Install
 * @see         Open
 * @see         Edit
 * @see         Change
 * @see         FormSubmit
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const SelectionChange = () =>
  createAppsScriptDecorator(AppsScriptEventType.SELECTION_CHANGE);

/**
 * A method decorator for handling the `onFormSubmit` event in Google Sheets.
 *
 * It fires when a form is submitted and its data is recorded in the spreadsheet.
 *
 * @param       [formId] - An optional filter by form ID. The method will only be called if a form with the specified ID was submitted.
 * @see         Install
 * @see         Open
 * @see         Edit
 * @see         Change
 * @see         SelectionChange
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const FormSubmit = (...args: (string | string[])[]) => {
  const options: Partial<Pick<AppsScriptOptions, "formId">> = {};

  if (args.length > 0) {
    const flattenedFormIds = args
      .flat(Infinity)
      .filter(item => typeof item === "string") as string[];

    if (flattenedFormIds.length > 0) {
      options.formId =
        flattenedFormIds.length === 1 ? flattenedFormIds[0] : flattenedFormIds;
    } else if (
      args.some(arg => typeof arg === "string" || Array.isArray(arg))
    ) {
      console.warn(
        "FormSubmit decorator: Unsupported or invalid form ID argument."
      );
    }
  }

  return createAppsScriptDecorator(AppsScriptEventType.FORM_SUBMIT, options);
};

/**
 * A factory function that creates method decorators for HTTP methods.
 * It is not intended for direct use.
 *
 * @param       method - The HTTP method to be associated with the decorator.
 * @returns     A function that returns a method decorator.
 * @environment `Google Apps Script`
 */
function createHttpDecorator(method: RequestMethod) {
  return (path?: string): MethodDecorator => {
    return (
      target: object,
      key: string | symbol,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor: TypedPropertyDescriptor<any>
    ) => {
      Reflect.defineMetadata(
        METHOD_METADATA,
        method || RequestMethod.GET,
        descriptor.value
      );

      Reflect.defineMetadata(
        PATH_METADATA,
        !path ? "/" : path,
        descriptor.value
      );

      return descriptor;
    };
  };
}

/**
 * A method decorator for handling HTTP POST requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @see         PostMapping
 * @see         Get
 * @see         GetMapping
 * @see         Delete
 * @see         DeleteMapping
 * @see         Put
 * @see         PutMapping
 * @see         Patch
 * @see         PatchMapping
 * @see         Options
 * @see         OptionsMapping
 * @see         Head
 * @see         HeadMapping
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Post = createHttpDecorator(RequestMethod.POST);

/**
 * A method decorator for handling HTTP GET requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @see         Post
 * @see         PostMapping
 * @see         GetMapping
 * @see         Delete
 * @see         DeleteMapping
 * @see         Put
 * @see         PutMapping
 * @see         Patch
 * @see         PatchMapping
 * @see         Options
 * @see         OptionsMapping
 * @see         Head
 * @see         HeadMapping
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Get = createHttpDecorator(RequestMethod.GET);

/**
 * A method decorator for handling HTTP DELETE requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @see         Post
 * @see         PostMapping
 * @see         Get
 * @see         GetMapping
 * @see         DeleteMapping
 * @see         Put
 * @see         PutMapping
 * @see         Patch
 * @see         PatchMapping
 * @see         Options
 * @see         OptionsMapping
 * @see         Head
 * @see         HeadMapping
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Delete = createHttpDecorator(RequestMethod.DELETE);

/**
 * A method decorator for handling HTTP PUT requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @see         Post
 * @see         PostMapping
 * @see         Get
 * @see         GetMapping
 * @see         Delete
 * @see         DeleteMapping
 * @see         PutMapping
 * @see         Patch
 * @see         PatchMapping
 * @see         Options
 * @see         OptionsMapping
 * @see         Head
 * @see         HeadMapping
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Put = createHttpDecorator(RequestMethod.PUT);

/**
 * A method decorator for handling HTTP PATCH requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @see         Post
 * @see         PostMapping
 * @see         Get
 * @see         GetMapping
 * @see         Delete
 * @see         DeleteMapping
 * @see         Put
 * @see         PutMapping
 * @see         PatchMapping
 * @see         Options
 * @see         OptionsMapping
 * @see         Head
 * @see         HeadMapping
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Patch = createHttpDecorator(RequestMethod.PATCH);

/**
 * A method decorator for handling HTTP OPTIONS requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @see         Post
 * @see         PostMapping
 * @see         Get
 * @see         GetMapping
 * @see         Delete
 * @see         DeleteMapping
 * @see         Put
 * @see         PutMapping
 * @see         Patch
 * @see         PatchMapping
 * @see         OptionsMapping
 * @see         Head
 * @see         HeadMapping
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Options = createHttpDecorator(RequestMethod.OPTIONS);

/**
 * A method decorator for handling HTTP HEAD requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @see         Post
 * @see         PostMapping
 * @see         Get
 * @see         GetMapping
 * @see         Delete
 * @see         DeleteMapping
 * @see         Put
 * @see         PutMapping
 * @see         Patch
 * @see         PatchMapping
 * @see         Options
 * @see         OptionsMapping
 * @see         HeadMapping
 * @returns     A method decorator.
 * @environment `Google Apps Script`
 */
export const Head = createHttpDecorator(RequestMethod.HEAD);

/**
 * A method decorator equivalent to {@link Post}.
 */
export const PostMapping = createHttpDecorator(RequestMethod.POST);

/**
 * A method decorator equivalent to {@link Get}.
 */
export const GetMapping = createHttpDecorator(RequestMethod.GET);

/**
 * A method decorator equivalent to {@link Delete}.
 */
export const DeleteMapping = createHttpDecorator(RequestMethod.DELETE);

/**
 * A method decorator equivalent to {@link Put}.
 */
export const PutMapping = createHttpDecorator(RequestMethod.PUT);

/**
 * A method decorator equivalent to {@link Patch}.
 */
export const PatchMapping = createHttpDecorator(RequestMethod.PATCH);

/**
 * A method decorator equivalent to {@link Options}.
 */
export const OptionsMapping = createHttpDecorator(RequestMethod.OPTIONS);

/**
 * A method decorator equivalent to {@link Head}.
 */
export const HeadMapping = createHttpDecorator(RequestMethod.HEAD);
