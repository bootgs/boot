import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK,
  INJECTABLE_WATERMARK,
  REPOSITORY_WATERMARK,
  SERVICE_WATERMARK
} from "../config/constants";

/**
 * A class decorator that marks a class as a generic controller in the application.
 *
 * Controllers serve as entry points for handling various types of requests or events.
 * This decorator does not define the specifics of how to handle an event (e.g., HTTP, Sheets events);
 * that is done using additional, more specific decorators.
 *
 * @see         HttpController
 * @see         RestController
 * @see         DocController
 * @see         DocsController
 * @see         FormController
 * @see         FormsController
 * @see         SheetController
 * @see         SheetsController
 * @see         SlideController
 * @see         SlidesController
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function Controller(
  type?: string | null,
  options?: object | null
): ClassDecorator {
  return target => {
    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);

    if (type) {
      Reflect.defineMetadata(CONTROLLER_TYPE_METADATA, type, target);
    }

    if (options) {
      Reflect.defineMetadata(CONTROLLER_OPTIONS_METADATA, options, target);
    }
  };
}

/**
 * A class decorator that marks a class as a service.
 *
 * Services typically contain the application's business logic and interact with repositories. Classes marked with `@Service` can be automatically injected into other components (e.g., controllers) using a dependency injection system.
 *
 * @see         Repository
 * @see         Injectable
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function Service(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(SERVICE_WATERMARK, true, target);
  };
}

/**
 * A class decorator that marks a class as a repository.
 *
 * Repositories are responsible for abstracting data access logic (e.g., interacting with a database, external APIs, or, in the case of Google Apps Script, with Google Sheets, Docs, etc.).
 *
 * @see         Service
 * @see         Injectable
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function Repository(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(REPOSITORY_WATERMARK, true, target);
  };
}

/**
 * A class decorator that indicates the class can be injected by a dependency injection container.
 *
 * This is a universal decorator used to register classes in the DI container, making them available for injection into other components.
 * It can be used for classes that do not fall under the `@Service` or `@Repository` categories but still need to be managed by DI (e.g., utility classes, configuration classes).
 *
 * @see         Service
 * @see         Repository
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function Injectable(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
  };
}

/**
 * A class decorator that marks a class as a controller capable of handling incoming requests.
 *
 * Controllers are responsible for routing requests to the corresponding handler methods.
 *
 * @param [basePath='/'] - The base URL path for all routes defined in this controller's methods.
 *
 * @see         Controller
 * @see         RestController
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function HttpController(
  basePath: string | undefined = "/"
): ClassDecorator {
  return target => {
    Controller("http", {
      basePath
    })(target);
  };
}

/**
 * A class decorator equivalent to {@link HttpController}.
 */
export const RestController = HttpController;

/**
 * A class decorator that marks a class as a controller intended to handle
 * Google Docs events (onOpen, etc.).
 *
 * @see         Controller
 * @see         DocsController
 * @see         FormController
 * @see         FormsController
 * @see         SheetController
 * @see         SheetsController
 * @see         SlideController
 * @see         SlidesController
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function DocController(): ClassDecorator {
  return target => {
    Controller("appsscript:doc")(target);
  };
}

/**
 * A class decorator equivalent to {@link DocController}.
 */
export const DocsController = DocController;

/**
 * A class decorator that marks a class as a controller intended to handle
 * Google Forms events (onOpen, etc.).
 *
 * @see         Controller
 * @see         DocController
 * @see         DocsController
 * @see         FormsController
 * @see         SheetController
 * @see         SheetsController
 * @see         SlideController
 * @see         SlidesController
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function FormController(): ClassDecorator {
  return target => {
    Controller("appsscript:form")(target);
  };
}

/**
 * A class decorator equivalent to {@link FormController}.
 */
export const FormsController = FormController;

/**
 * A class decorator that marks a class as a controller intended to handle
 * Google Sheets events (onOpen, onEdit, onChange, etc.).
 *
 * @param [sheetName] - An optional sheet name (or names/RegExp) to which this controller applies. If not specified, the controller can handle events for any sheet unless overridden at the method level.
 *
 * @see         Controller
 * @see         DocController
 * @see         DocsController
 * @see         FormController
 * @see         FormsController
 * @see         SheetsController
 * @see         SlideController
 * @see         SlidesController
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function SheetController(
  sheetName?: string | string[] | RegExp
): ClassDecorator {
  return target => {
    Controller("appsscript:sheet", { sheetName })(target);
  };
}

/**
 * A class decorator equivalent to {@link SheetController}.
 */
export const SheetsController = SheetController;

/**
 * A class decorator that marks a class as a controller intended to handle
 * Google Slides events (onOpen, etc.).
 *
 * @see         Controller
 * @see         DocController
 * @see         DocsController
 * @see         FormController
 * @see         FormsController
 * @see         SheetController
 * @see         SheetsController
 * @see         SlidesController
 * @returns     A class decorator.
 * @environment `Google Apps Script`
 */
export function SlideController(): ClassDecorator {
  return target => {
    Controller("appsscript:slide")(target);
  };
}

/**
 * A class decorator equivalent to {@link SlideController}.
 */
export const SlidesController = SlideController;
