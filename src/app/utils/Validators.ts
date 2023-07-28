export const regExps: { [key: string]: RegExp } = {
  emailRegex: /^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/,
  emailComplet: /^[a-zA-Z0-9_.-]+[@]+[a-zA-Z0-9-]+[.]+[A-Za-z0-9]{2,4}((?:[.]+[a-zA-Z0-9]{2,4})?)$/,
  alphaNumeric: /^[a-zA-Z0-9_-]*$/,
  alphaNumericwithtilde: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9]+(\s{1}[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9]+)*$/,
  prefix: /^[A-Za-z0-9]*$/,
  number: /^\d*$/,
  special: /^[ A-Za-záéíóúÁÉÍÓÚñÑüÜ0-9_@./#&+-]*$/,
  email2: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  moreEmail: /^(([a-zA-Z\-0-9\.]+@)([a-zA-Z\-0-9\.]+)[,]*)+$/,
  regexPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[^\w\s]).{8,15}$/,
  numberespecial: /^[0-5]*$/,
  uuidRegex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-5][0-9a-fA-F]{3}-[089abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
  username: /[-_a-zA-Z0-9]*/,
  maxTaxes: /^((100(\.0{1,2})?)|(\d{1,2}(\.\d{1,2})?))%$/,
  maxReteica: /^(0(\.\d+)?|1(\.0+)?)%$/,
  decimalNumbers: /^\d{1,2}$|^\d{1,2}\.\d{1,2}$/,
  spaceEnd: /^\w+[^\s]$/,
  numberWDecimal: /^(\d*|(\d+))(\.\d+)?$/,
  regexcomma: /,/g,
};
export class Validators{

    static isNullOrUndefined<T>(
        obj: T | null | undefined
      ): obj is null | undefined {
        return typeof obj === 'undefined' || obj === null;
      }
}
