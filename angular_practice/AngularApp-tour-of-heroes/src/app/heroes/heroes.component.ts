import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes', //  컴포넌트의 CSS 엘리먼트 셀렉터 : DOM 트리에서 이 컴포넌트를 표현하는 이름이며, 부모 컴포넌트의 템플릿(app.component.html)에 사용한다.
  templateUrl: './heroes.component.html', // 컴포넌트 템플릿 파일의 위치
  styleUrls: ['./heroes.component.css'], // 컴포넌트 CSS 스타일 파일의 위치
})
//컴포넌트는 반드시 "export"해야 AppModule와 같은 다른 모듈에서 import 할 수 있다.
export class HeroesComponent implements OnInit {
  heroes = HEROES; // 클래스에 heroes 프로퍼티를 선언하고 위에서 로드한 HEROES 배열을 바인딩.

  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };

  //NOTE error TS2564 : Property 'selectedHero' has no initializer and is not definitely assigned in the constructor.
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() {}

  ngOnInit(): void {} // ngOnInit()은 디렉티브나 컴포넌트에 바인딩된 입력 프로퍼티 값이 처음 할당된 후에 실행된다.
}

/* 
  Angular 컴포넌트를 선언하려면 반드시 Angular 코어 라이브러리에서 Component 심볼을 로드하고 컴포넌트 클래스에 @Component와 같이 지정해야 합니다.
  이 때 @Component는 클래스에 메타데이터를 지정해서 Angular 컴포넌트로 선언하는 데코레이터 함수입니다.
  https://angular.kr/tutorial/toh-pt1#%ED%9E%88%EC%96%B4%EB%A1%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0 
*/

// ngOnInit() : https://angular.kr/guide/lifecycle-hooks#oninit

/*
  상세화면 영역 추가하기 - selectedHero
  https://angular.kr/tutorial/toh-pt2#%EC%83%81%EC%84%B8%ED%99%94%EB%A9%B4-%EC%98%81%EC%97%AD-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
 */
