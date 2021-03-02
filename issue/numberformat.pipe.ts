import { Injectable } from "@angular/core";
import { Pipe, PipeTransform } from "@angular/core";
import { DecimalPipe } from "@angular/common";

@Injectable()
@Pipe({
  name: "numberformat",
  pure: true,
})
export class NumberFormatPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number): string {
    return this.decimalPipe.transform(value, "1.0-2");
  }
}

//REVIEW

// parameter를 이용하기
// '1.2-2' 뒤가 최대값
// 옵셔널 사용하기 (number 뒤에 작성) : 소수점 값이 있으면 옵셔널 받은걸로 사용, 없으면 기본으로?
