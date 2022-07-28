export class StringUtil {

  public static somenteNumeros(number: string): string {
    return number.replace(/[^0-9]/g,'');
  }
}
