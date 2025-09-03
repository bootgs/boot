import { CONTROLLER_WATERMARK } from "config/constants";
import { Newable } from "types";

export function isController(value: Newable): boolean {
  return !!Reflect.getMetadata(CONTROLLER_WATERMARK, value);
}
