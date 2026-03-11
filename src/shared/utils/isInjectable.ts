import { INJECTABLE_WATERMARK } from "../../domain/constants";
import { Newable } from "../../domain/types";

export function isInjectable(value: Newable): boolean {
  return !!Reflect.hasMetadata(INJECTABLE_WATERMARK, value);
}
