// SPDX-License-Identifier: Apache-2.0
import { ResponseEntity } from "../../domain/entities";

/**
 * Checks if a value is a {@link ResponseEntity} object.
 *
 * @param   {unknown} value - The value to check.
 * @returns {value is ResponseEntity} `true` if the value is a {@link ResponseEntity}, `false` otherwise.
 */
export function isResponseEntity(value: unknown): value is ResponseEntity {
  return value instanceof ResponseEntity;
}
