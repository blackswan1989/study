import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes', // 컴포넌트의 CSS 엘리먼트 셀렉터 : DOM 트리에서 이 컴포넌트를 표현하는 이름이며, 부모 컴포넌트의 템플릿(app.component.html)에 사용한다.
  templateUrl: './heroes.component.html', // 컴포넌트 템플릿 파일의 위치
  styleUrls: ['./heroes.component.css'], // 컴포넌트 CSS 스타일 파일의 위치
})
//컴포넌트는 반드시 "export"해야 AppModule와 같은 다른 모듈에서 import 할 수 있다.
export class HeroesComponent implements OnInit {
  heroes?: Hero[];

  constructor(
    private heroService: HeroService // 생성자에 HeroService 타입의 heroService 인자를 선언하고 이 인자를 private으로 지정
  ) {}

  //  ngOnInit() 함수는 HeroesComponent의 인스턴스를 생성한 직후에 실행되는 함수
  ngOnInit(): void {
    this.getHeroes();
  }

  // 서비스에서 히어로 목록을 받아오는 메소드를 정의
  getHeroes(): void {
    // https://angular.kr/tutorial/toh-pt4#%EC%98%B5%EC%A0%80%EB%B2%84%EB%B8%94-%EB%8D%B0%EC%9D%B4%ED%84%B0
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}

/* 
  Angular 컴포넌트를 선언하려면 반드시 Angular 코어 라이브러리에서 Component 심볼을 로드하고 컴포넌트 클래스에 @Component와 같이 지정해야 합니다.
  이 때 @Component는 클래스에 메타데이터를 지정해서 Angular 컴포넌트로 선언하는 데코레이터 함수입니다.
  https://angular.kr/tutorial/toh-pt1#%ED%9E%88%EC%96%B4%EB%A1%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0 
*/

/*
 ngOnInit()은 라이프싸이클 후킹 함수로 디렉티브나 컴포넌트에 바인딩된 입력 프로퍼티 값이 처음 할당된 후에 실행된다.
 https://angular.kr/guide/lifecycle-hooks#oninit

*/

/*
  상세화면 영역 추가하기 - selectedHero -> 분리되어 코드 정리(삭제) 
  https://angular.kr/tutorial/toh-pt2#%EC%83%81%EC%84%B8%ED%99%94%EB%A9%B4-%EC%98%81%EC%97%AD-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0


  * HeroService 주입하기 - constructor( private heroService: HeroService ) {}
  이렇게 작성하면 heroService 인자를 클래스 프로퍼티로 선언하면서 HeroService 타입의 의존성 객체가 주입되기를 요청한다는 것을 의미합니다.
  그러면 Angular가 HeroesComponent를 생성할 때 의존성 주입 시스템이 HeroService의 인스턴스를 찾아서 heroService 라는 인자로 전달할 것입니다.

  https://angular.kr/tutorial/toh-pt4#heroservice-%EC%A3%BC%EC%9E%85%ED%95%98%EA%B8%B0
 */

/*
  *옵저버블 (Observable은 RxJS 라이브러리가 제공하는 클래스 중 가장 중요한 클래스입니다.)

  https://angular.kr/tutorial/toh-pt4#%EC%98%B5%EC%A0%80%EB%B2%84%EB%B8%94-heroservice

 *HeroesComponent 에서 옵저버블 구독(subscribe)하기
  https://angular.kr/tutorial/toh-pt4#heroescomponent-%EC%97%90%EC%84%9C-%EC%98%B5%EC%A0%80%EB%B2%84%EB%B8%94-%EA%B5%AC%EB%8F%85%ED%95%98%EA%B8%B0
*/
