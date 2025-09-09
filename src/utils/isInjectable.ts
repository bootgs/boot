import { INJECTABLE_WATERMARK } from "../config/constants";
import { Newable } from "../types";

export function isInjectable(value: Newable): boolean {
  return !!Reflect.hasMetadata(INJECTABLE_WATERMARK, value);
}
