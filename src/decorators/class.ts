import {
  CONTROLLER_OPTIONS_METADATA,
  CONTROLLER_TYPE_METADATA,
  CONTROLLER_WATERMARK,
  INJECTABLE_WATERMARK,
  REPOSITORY_WATERMARK,
  SERVICE_WATERMARK
} from "../config/constants";

/**
 * Декоратор класса, помечающий класс как универсальный контроллер в приложении.
 *
 * Контроллеры служат точками входа для обработки различных типов запросов или событий.
 * Этот декоратор не определяет специфику обработки (HTTP, события Sheets и т.д.), это делается с помощью дополнительных, уточняющих декораторов.
 *
 * @returns Декоратор класса.
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
 * Декоратор класса, помечающий класс как сервис.
 *
 * Сервисы обычно содержат бизнес-логику приложения и взаимодействуют с репозиториями. Классы, помеченные `@Service`, могут быть автоматически внедрены в другие компоненты (например, контроллеры) с помощью системы внедрения зависимостей.
 *
 * @returns Декоратор класса.
 * @environment `Google Apps Script`
 */
export function Service(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(SERVICE_WATERMARK, true, target);
  };
}

/**
 * Декоратор класса, помечающий класс как репозиторий.
 *
 * Репозитории отвечают за абстрагирование логики доступа к данным (например, взаимодействие с базой данных, внешними API или, в случае Google Apps Script, с Google Sheets, Docs и т.д.).
 *
 * @returns Декоратор класса.
 * @environment `Google Apps Script`
 */
export function Repository(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(REPOSITORY_WATERMARK, true, target);
  };
}

/**
 * Декоратор класса, указывающий, что класс может быть внедрён контейнером внедрения зависимостей.
 *
 * Это универсальный декоратор, используемый для регистрации классов в DI-контейнере, делая их доступными для инъекции в другие компоненты.
 * Может использоваться для классов, которые не попадают под категории `@Service` или `@Repository`, но все равно должны управляться DI (например, утилитарные классы, конфигурационные классы).
 *
 * @returns Декоратор класса.
 * @environment `Google Apps Script`
 */
export function Injectable(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
  };
}

/**
 * Декоратор класса, помечающий класс как контроллер, способный обрабатывать входящие запросы.
 * Контроллеры отвечают за маршрутизацию запросов к соответствующим методам-обработчикам.
 *
 * @param [basePath='/'] - Базовый путь URL для всех маршрутов, определённых в методах этого контроллера.
 *
 * @returns Декоратор класса.
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
 * Декоратор класса, эквивалентный {@link HttpController}.
 */
export const RestController = HttpController;

/**
 * Декоратор класса, помечающий класс как контроллер, предназначенный для обработки
 * событий Google Docs (onOpen, и т.д.).
 *
 * @returns Декоратор класса.
 * @environment `Google Apps Script`
 */
export function DocController(): ClassDecorator {
  return target => {
    Controller("appsscript:doc")(target);
  };
}

/**
 * Декоратор класса, эквивалентный {@link DocController}.
 */
export const DocsController = DocController;

/**
 * Декоратор класса, помечающий класс как контроллер, предназначенный для обработки
 * событий Google Forms (onOpen, и т.д.).
 *
 * @returns Декоратор класса.
 * @environment `Google Apps Script`
 */
export function FormController(): ClassDecorator {
  return target => {
    Controller("appsscript:form")(target);
  };
}

/**
 * Декоратор класса, эквивалентный {@link FormController}.
 */
export const FormsController = FormController;

/**
 * Декоратор класса, помечающий класс как контроллер, предназначенный для обработки
 * событий Google Sheets (onOpen, onEdit, onChange и т.д.).
 *
 * @param [sheetName] - Необязательное имя (или имена/RegExp) листа, к которому применяется этот контроллер. Если не указано, контроллер может обрабатывать события для любого листа, если это не переопределено на уровне метода.
 *
 * @returns Декоратор класса.
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
 * Декоратор класса, эквивалентный {@link SheetController}.
 */
export const SheetsController = SheetController;

/**
 * Декоратор класса, помечающий класс как контроллер, предназначенный для обработки
 * событий Google Slides (onOpen, и т.д.).
 *
 * @returns Декоратор класса.
 * @environment `Google Apps Script`
 */
export function SlideController(): ClassDecorator {
  return target => {
    Controller("appsscript:slide")(target);
  };
}

/**
 * Декоратор класса, эквивалентный {@link SlideController}.
 */
export const SlidesController = SlideController;
