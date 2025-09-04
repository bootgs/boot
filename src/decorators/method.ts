import { isRegExp, isString, nonEmpty } from "appsscript-utils";
import { AppsScriptEventType, RequestMethod } from "../types";
import { AppsScriptOptions, createHttpDecorator, createMethodDecorator } from "../utils";

/**
 * A method decorator for handling the `onInstall` event in Google Sheets.
 *
 * It fires when the add-on is first installed by a user.
 *
 * @returns     A method decorator.
 * @see         Open
 * @see         Edit
 * @see         Change
 * @see         SelectionChange
 * @see         FormSubmit
 * @environment `Google Apps Script`
 */
export const Install = () => createMethodDecorator(AppsScriptEventType.INSTALL);

/**
 * A method decorator for handling the `onOpen` event in Google Sheets.
 *
 * It fires when a user opens the spreadsheet.
 *
 * @returns     A method decorator.
 * @see         Install
 * @see         Edit
 * @see         Change
 * @see         SelectionChange
 * @see         FormSubmit
 * @environment `Google Apps Script`
 */
export const Open = () => createMethodDecorator(AppsScriptEventType.OPEN);

/**
 * A method decorator for handling the `onEdit` event in Google Sheets.
 *
 * It fires when the contents of a spreadsheet's cells are changed manually.
 *
 * @param       args - An optional list of one or more A1-notations (e.g., 'A1:C5'), sheet names (e.g., 'Sheet1'), or a regular expression.
 * @returns     A method decorator.
 * @see         Install
 * @see         Open
 * @see         Change
 * @see         SelectionChange
 * @see         FormSubmit
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

  return createMethodDecorator(AppsScriptEventType.EDIT, options);
};

/**
 * A method decorator for handling the `onChange` event in Google Sheets.
 *
 * It fires on any change in the spreadsheet (including changes to formulas, moving rows, inserting images, etc.).
 *
 * @param       [changeType] - An optional filter by change type.
 * @returns     A method decorator.
 * @see         Install
 * @see         Open
 * @see         Edit
 * @see         SelectionChange
 * @see         FormSubmit
 * @environment `Google Apps Script`
 */
export const Change = (
  changeType?:
    | GoogleAppsScript.Events.SheetsOnChangeChangeType
    | GoogleAppsScript.Events.SheetsOnChangeChangeType[]
) => createMethodDecorator(AppsScriptEventType.CHANGE, { changeType });

/**
 * A method decorator for handling the `onSelectionChange` event in Google Sheets.
 *
 * It fires when a user's cell selection changes.
 *
 * @returns     A method decorator.
 * @see         Install
 * @see         Open
 * @see         Edit
 * @see         Change
 * @see         FormSubmit
 * @environment `Google Apps Script`
 */
export const SelectionChange = () =>
  createMethodDecorator(AppsScriptEventType.SELECTION_CHANGE);

/**
 * A method decorator for handling the `onFormSubmit` event in Google Sheets.
 *
 * It fires when a form is submitted and its data is recorded in the spreadsheet.
 *
 * @param       args
 * @returns     A method decorator.
 * @see         Install
 * @see         Open
 * @see         Edit
 * @see         Change
 * @see         SelectionChange
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

  return createMethodDecorator(AppsScriptEventType.FORM_SUBMIT, options);
};

/**
 * A method decorator for handling HTTP POST requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @returns     A method decorator.
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
 * @environment `Google Apps Script`
 */
export const Post = createHttpDecorator(RequestMethod.POST);

/**
 * A method decorator for handling HTTP GET requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @returns     A method decorator.
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
 * @environment `Google Apps Script`
 */
export const Get = createHttpDecorator(RequestMethod.GET);

/**
 * A method decorator for handling HTTP DELETE requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @returns     A method decorator.
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
 * @environment `Google Apps Script`
 */
export const Delete = createHttpDecorator(RequestMethod.DELETE);

/**
 * A method decorator for handling HTTP PUT requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @returns     A method decorator.
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
 * @environment `Google Apps Script`
 */
export const Put = createHttpDecorator(RequestMethod.PUT);

/**
 * A method decorator for handling HTTP PATCH requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @returns     A method decorator.
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
 * @environment `Google Apps Script`
 */
export const Patch = createHttpDecorator(RequestMethod.PATCH);

/**
 * A method decorator for handling HTTP OPTIONS requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @returns     A method decorator.
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
 * @environment `Google Apps Script`
 */
export const Options = createHttpDecorator(RequestMethod.OPTIONS);

/**
 * A method decorator for handling HTTP HEAD requests.
 *
 * @param       [path='/'] - The relative path for the route.
 * @returns     A method decorator.
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
