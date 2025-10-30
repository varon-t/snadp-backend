import { registerDecorator, ValidationOptions } from 'class-validator';
export function IsValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          console.log('validate ===> ', value);
          return typeof value === 'string' && value === 'John Doe';
        },
      },
    });
  };
}
