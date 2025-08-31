import {
  INJECT_TOKENS_METADATA,
  PARAM_DEFINITIONS_METADATA
} from "../config/constants";
import { InjectTokenDefinition, ParamDefinition, ParamSource } from "../types";

/**
 * Обновляет метаданные параметров с учётом позиции аргумента (индекса).
 * Используется внутренней фабричной функцией для регистрации декораторов параметров.
 *
 * @param existing - Существующие метаданные параметров.
 * @param index - Индекс (позиция) параметра в списке аргументов функции.
 * @param type - Тип источника данных для параметра.
 * @param [key] - Необязательный ключ для извлечения конкретного значения.
 * @returns Обновлённые метаданные параметров.
 */
function assignMetadata(
  existing: Record<string, ParamDefinition>,
  index: number,
  type: ParamSource,
  key?: string
): Record<string, ParamDefinition> {
  return {
    ...existing,
    [`${type as string}:${index}`]: { type, key, index }
  };
}

/**
 * Обновляет или добавляет метаданные для токенов внедрения конкретного параметра функции (аргумента) на основе его индекса и токена.
 *
 * @param existing - Существующие метаданные токенов внедрения.
 * @param index - Индекс (позиция) параметра в списке аргументов функции.
 * @param [token] - Токен внедрения для данного параметра.
 * @returns Обновлённые метаданные токенов внедрения.
 */
function assignInjectMetadata(
  existing: Record<string, InjectTokenDefinition>,
  index: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token?: any
): Record<string, InjectTokenDefinition> {
  const type = ParamSource.INJECT;

  return {
    ...existing,
    [`${type as string}:${index}`]: { type, token, index }
  };
}

/**
 * Извлекает токены внедрения, связанные с конструктором класса или прототипом метода.
 *
 * @param target - Конструктор класса (для параметров конструктора) или Прототип класса (для параметров метода).
 * @param [propertyKey] - Необязательный ключ свойства (имя метода), если токены внедряются в параметры метода.
 * @returns Объект с токенами, где ключ - это строка "${type}:${index}".
 * @environment `Google Apps Script`
 */
export function getInjectionTokens(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any,
  propertyKey?: string | symbol
): Record<string, InjectTokenDefinition> {
  const metadataTarget =
    typeof target === "function" ? target : target.constructor;

  if (propertyKey) {
    return (
      Reflect.getMetadata(
        INJECT_TOKENS_METADATA,
        metadataTarget,
        propertyKey
      ) || {}
    );
  } else {
    return Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget) || {};
  }
}

/**
 * Создаёт параметр-декоратор с заданным источником.
 */
function createDecorator(type: ParamSource) {
  return (key?: string): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
      const metadataTarget = propertyKey ? target : target.constructor;

      const existing: Record<string, ParamDefinition> =
        (propertyKey
          ? Reflect.getMetadata(
              PARAM_DEFINITIONS_METADATA,
              metadataTarget,
              propertyKey
            )
          : Reflect.getMetadata(PARAM_DEFINITIONS_METADATA, metadataTarget)) ||
        {};

      const updated = assignMetadata(existing, parameterIndex, type, key);

      if (propertyKey) {
        Reflect.defineMetadata(
          PARAM_DEFINITIONS_METADATA,
          updated,
          metadataTarget,
          propertyKey
        );
      } else {
        Reflect.defineMetadata(
          PARAM_DEFINITIONS_METADATA,
          updated,
          metadataTarget
        );
      }
    };
  };
}

/**
 * Декоратор параметра для инъекции значений из параметров пути URL.
 * Это общий декоратор для параметров пути.
 *
 * @param key - Имя параметра пути для извлечения (`/users/{id}`).
 * @returns Декоратор параметра.
 * @environment `Google Apps Script`
 */
export const Param = createDecorator(ParamSource.PARAM);

/**
 * Декоратор параметра для инъекции значений из query-параметров URL.
 * Это общий декоратор для query-параметров.
 *
 * @param [key] - Имя query-параметра для извлечения (`?name=value`).
 * @returns Декоратор параметра.
 * @environment `Google Apps Script`
 */
export const Query = createDecorator(ParamSource.QUERY);

/**
 * Декоратор параметра для инъекции полного тела запроса (request body).
 * Обычно используется для HTTP POST/PUT/PATCH запросов.
 *
 * @param [key] - Имя ключа для извлечения конкретного значения из тела запроса (например, 'name' из JSON: `{ "name": "value" }`).
 * Если не указан, инжектируется полное тело запроса.
 * @returns Декоратор параметра.
 * @environment `Google Apps Script`
 */
export const Body = createDecorator(ParamSource.BODY);

/**
 * @param [key] - Имя ключа для извлечения конкретного значения.
 * Если не указан, инжектируется полное ...
 * @returns Декоратор параметра.
 * @environment `Google Apps Script`
 */
export const Request = createDecorator(ParamSource.REQUEST);

/**
 * @param [key] - Имя ключа для извлечения конкретного значения.
 * Если не указан, инжектируется полное ...
 * @returns Декоратор параметра.
 * @environment `Google Apps Script`
 */
export const Headers = createDecorator(ParamSource.HEADERS);

/**
 * @param [key] - Имя ключа для извлечения конкретного значения.
 * Если не указан, инжектируется полное ...
 * @returns Декоратор параметра.
 * @environment `Google Apps Script`
 */
export const Response = createDecorator(ParamSource.RESPONSE);

/**
 * Декоратор параметра, эквивалентный {@link Param}.
 */
export const PathVariable = createDecorator(ParamSource.PARAM);

/**
 * Декоратор параметра, эквивалентный {@link Query}.
 */
export const RequestParam = createDecorator(ParamSource.QUERY);

/**
 * Декоратор параметра, эквивалентный {@link Body}.
 */
export const RequestBody = createDecorator(ParamSource.BODY);

/**
 * Декоратор параметра, используемый для инъекции полного объекта события Google Apps Script.
 *
 * @returns Декоратор параметра.
 * @environment `Google Apps Script`
 */
export const Event = createDecorator(ParamSource.EVENT);

/**
 * Декоратор параметра, используемый для явного указания токена внедрения для зависимости.
 *
 * Это полезно, когда тип параметра не может быть определен рефлексией (например, при использовании интерфейсов), или когда вам нужно внедрить конкретную реализацию, отличную от той, что соответствует типу.
 *
 * @param [token] - Токен внедрения, который будет использоваться контейнером DI для разрешения зависимости. Обычно это конструктор класса (Constructor), но может быть и Symbol, строка или любой другой уникальный идентификатор.
 * @returns Декоратор параметра.
 * @environment `Google Apps Script`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Inject(token?: any): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    const metadataTarget =
      typeof target === "function" ? target : target.constructor;

    const existing: Record<string, InjectTokenDefinition> =
      (propertyKey
        ? Reflect.getMetadata(
            INJECT_TOKENS_METADATA,
            metadataTarget,
            propertyKey
          )
        : Reflect.getMetadata(INJECT_TOKENS_METADATA, metadataTarget)) || {};

    const updatedTokens = assignInjectMetadata(existing, parameterIndex, token);

    if (propertyKey) {
      Reflect.defineMetadata(
        INJECT_TOKENS_METADATA,
        updatedTokens,
        metadataTarget,
        propertyKey
      );
    } else {
      Reflect.defineMetadata(
        INJECT_TOKENS_METADATA,
        updatedTokens,
        metadataTarget
      );
    }
  };
}
