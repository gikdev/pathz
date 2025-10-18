import { ValidationOptions, ValidateIf } from "class-validator"

export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
  return function IsUndefinedDecorator(
    prototype: Object,
    propertyKey: string | symbol,
  ) {
    ValidateIf(obj => obj[propertyKey] !== undefined, options)(
      prototype,
      propertyKey,
    )
  }
}
