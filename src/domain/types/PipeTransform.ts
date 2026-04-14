import { ParamSource } from "../enums";
import { Newable } from "./Newable";

/**
 * Interface representing the argument metadata passed to the transform method.
 */
export interface ArgumentMetadata {

  /**
   * Source of the parameter.
   */
  readonly type: ParamSource;

  /**
   * Optional metatype of the parameter.
   */
  readonly metatype?: Newable;

  /**
   * Optional name of the parameter.
   */
  readonly data?: string;
}

/**
 * Interface representing a pipe transform.
 */
export interface PipeTransform<T = any, R = any> {

  /**
   * Transforms the input value.
   *
   * @param {T} value The value to transform.
   * @param {ArgumentMetadata} metadata The argument metadata.
   * @returns {R} The transformed value.
   */
  transform(value: T, metadata: ArgumentMetadata): R;
}
