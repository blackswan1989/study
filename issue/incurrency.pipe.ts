import { Injectable } from "@angular/core";
import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { SharedDataService } from "@core/services/shared-data.service.o";

@Injectable()
@Pipe({
  name: "incurrency",
  pure: true,
})
export class InCurrencyPipe implements PipeTransform {
  constructor(
    private currencyPipe: CurrencyPipe,
    private sharedDataService: SharedDataService,
    private decimalPipe: DecimalPipe
  ) {}

  transform(value?: number, type?: string, currencyCode?: string): string {
    if (typeof value !== "number") return "";

    if (type && type.toLowerCase() === "fee" && value <= 0) return "";

    if (type && type.toLowerCase() === "pnlpoker" && !value && value !== 0)
      return "-";

    const decimalFormat: string = "1.6-6";
    let result: string = "";

    if (currencyCode) {
      const absoluteValue: number = Math.abs(value);
      result = this.decimalPipe.transform(absoluteValue, decimalFormat);
      result =
        type && type.toLowerCase() === "limit"
          ? result.substr(0, result.indexOf("."))
          : result.substr(0, result.indexOf(".") + 3);

      return value < 0
        ? `-${currencyCode} ${result}`
        : `${currencyCode} ${result}`;
    }

    const currency: string = this.sharedDataService.GetCurrency();
    result = this.currencyPipe.transform(
      value,
      currency,
      "symbol-narrow",
      decimalFormat
    );

    if (type && type.toLowerCase() === "limit")
      return result.substr(0, result.indexOf("."));
    else return result.substr(0, result.indexOf(".") + 3);
  }
}
