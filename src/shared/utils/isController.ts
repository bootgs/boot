import { CONTROLLER_WATERMARK } from "domain/constants";
import { Newable } from "domain/types";

export function isController(value: Newable): boolean {
  return !!Reflect.getMetadata(CONTROLLER_WATERMARK, value);
}
