import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  //NOTE  error TS2564: Property 'hero' has no initializer and is not definitely assigned in the constructor.
  @Input() hero: Hero;

  constructor() {}

  ngOnInit(): void {}
}

/* 
  @Input() 히어로 프로퍼티 추가하기 : 

  이 때 hero 프로퍼티의 값은 외부 컴포넌트인 HeroesComponent에서 바인딩되어 전달됩니다. 
  따라서 hero 프로퍼티는 @Input() 데코레이터를 사용해서 입력 프로퍼티로 선언해야 합니다.

  <app-hero-detail [hero]="selectedHero"></app-hero-detail>

  https://angular.kr/tutorial/toh-pt3#input-%ED%9E%88%EC%96%B4%EB%A1%9C-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
*/
