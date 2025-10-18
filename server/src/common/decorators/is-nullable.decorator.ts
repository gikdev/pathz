import { ValidateIf, ValidationOptions } from "class-validator"

export function IsNullable(options?: ValidationOptions): PropertyDecorator {
  return function IsNullableDecorator(
    prototype: Object,
    propertyKey: string | symbol,
  ) {
    ValidateIf(obj => obj[propertyKey] !== null, options)(
      prototype,
      propertyKey,
    )
  }
}
