import {
  APPSSCRIPT_EVENT_METADATA,
  APPSSCRIPT_OPTIONS_METADATA,
  METHOD_METADATA,
  PATH_METADATA
} from "../config/constants";
import { AppsScriptEventType, RequestMethod } from "../types";

/**
 *
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
 *
 */
function createAppsScriptDecorator(
  eventType: AppsScriptEventType,
  options?: Omit<AppsScriptOptions, "eventType">
): MethodDecorator {
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
 * Декоратор метода для обработки события 'onInstall' в Google Sheets.
 * Срабатывает при первой установке дополнения пользователем.
 *
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Install = () =>
  createAppsScriptDecorator(AppsScriptEventType.INSTALL);

/**
 * Декоратор метода для обработки события 'onOpen' в Google Sheets.
 * Срабатывает при открытии таблицы пользователем.
 *
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Open = () => createAppsScriptDecorator(AppsScriptEventType.OPEN);

/**
 * Декоратор метода для обработки события 'onEdit' в Google Sheets.
 * Срабатывает при изменении содержимого ячеек таблицы вручную.
 *
 * @param args
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Edit = (...args: (string | RegExp | string[])[]) => {
  const options: Partial<Pick<AppsScriptOptions, "range">> = {};

  if (args.length > 0) {
    if (args[0] instanceof RegExp && args.length === 1) {
      options.range = args[0];
    } else {
      const flattenedRanges = args
        .flat(Infinity)
        .filter(item => typeof item === "string") as string[];

      if (flattenedRanges.length > 0) {
        options.range =
          flattenedRanges.length === 1 ? flattenedRanges[0] : flattenedRanges;
      } else if (
        args.some(
          arg =>
            arg instanceof RegExp ||
            Array.isArray(arg) ||
            typeof arg === "string"
        )
      ) {
        console.warn("Edit decorator: Unsupported or invalid range argument.");
      }
    }
  }

  return createAppsScriptDecorator(AppsScriptEventType.EDIT, options);
};

/**
 * Декоратор метода для обработки события 'onChange' в Google Sheets.
 * Срабатывает при любом изменении в таблице (включая изменения формул, перемещение строк, вставку изображений и т.д.).
 *
 * @param [changeType] - Опциональный фильтр по типу изменения.
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Change = (
  changeType?:
    | GoogleAppsScript.Events.SheetsOnChangeChangeType
    | GoogleAppsScript.Events.SheetsOnChangeChangeType[]
) => createAppsScriptDecorator(AppsScriptEventType.CHANGE, { changeType });

/**
 * Декоратор метода для обработки события 'onSelectionChange' в Google Sheets.
 * Срабатывает при изменении выделения ячеек пользователем.
 *
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const SelectionChange = () =>
  createAppsScriptDecorator(AppsScriptEventType.SELECTION_CHANGE);

/**
 * Декоратор метода для обработки события 'onFormSubmit' в Google Sheets.
 * Срабатывает при отправке формы, данные которой записываются в таблицу.
 *
 * @param [formId] - Опциональный фильтр по ID формы.
 * Метод будет вызван только если форма с указанным ID была отправлена.
 * @returns Декоратор метода.
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
 * Фабричная функция для создания декораторов HTTP-методов.
 * Не предназначена для прямого использования.
 *
 * @param method - HTTP-метод, который будет ассоциироваться с декоратором.
 * @returns Функция, возвращающая декоратор метода.
 * @environment `Google Apps Script`
 */
function createHttpDecorator(method: RequestMethod) {
  return (path?: string): MethodDecorator => {
    return (
      target: object,
      key: string | symbol,
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
 * Декоратор метода для обработки HTTP POST запросов.
 *
 * @param [path='/'] - Относительный путь для маршрута.
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Post = createHttpDecorator(RequestMethod.POST);

/**
 * Декоратор метода для обработки HTTP GET запросов.
 *
 * @param [path='/'] - Относительный путь для маршрута.
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Get = createHttpDecorator(RequestMethod.GET);

/**
 * Декоратор метода для обработки HTTP DELETE запросов.
 *
 * @param [path='/'] - Относительный путь для маршрута.
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Delete = createHttpDecorator(RequestMethod.DELETE);

/**
 * Декоратор метода для обработки HTTP PUT запросов.
 *
 * @param [path='/'] - Относительный путь для маршрута.
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Put = createHttpDecorator(RequestMethod.PUT);

/**
 * Декоратор метода для обработки HTTP PATCH запросов.
 *
 * @param [path='/'] - Относительный путь для маршрута.
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Patch = createHttpDecorator(RequestMethod.PATCH);

/**
 * Декоратор метода для обработки HTTP OPTIONS запросов.
 *
 * @param [path='/'] - Относительный путь для маршрута.
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Options = createHttpDecorator(RequestMethod.OPTIONS);

/**
 * Декоратор метода для обработки HTTP HEAD запросов.
 *
 * @param [path='/'] - Относительный путь для маршрута.
 * @returns Декоратор метода.
 * @environment `Google Apps Script`
 */
export const Head = createHttpDecorator(RequestMethod.HEAD);

/**
 * Декоратор метода, эквивалентный {@link Post}.
 */
export const PostMapping = createHttpDecorator(RequestMethod.POST);

/**
 * Декоратор метода, эквивалентный {@link Get}.
 */
export const GetMapping = createHttpDecorator(RequestMethod.GET);

/**
 * Декоратор метода, эквивалентный {@link Delete}.
 */
export const DeleteMapping = createHttpDecorator(RequestMethod.DELETE);

/**
 * Декоратор метода, эквивалентный {@link Put}.
 */
export const PutMapping = createHttpDecorator(RequestMethod.PUT);

/**
 * Декоратор метода, эквивалентный {@link Patch}.
 */
export const PatchMapping = createHttpDecorator(RequestMethod.PATCH);

/**
 * Декоратор метода, эквивалентный {@link Options}.
 */
export const OptionsMapping = createHttpDecorator(RequestMethod.OPTIONS);

/**
 * Декоратор метода, эквивалентный {@link Head}.
 */
export const HeadMapping = createHttpDecorator(RequestMethod.HEAD);
