import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService // 생성자를 통해 HeroService를 의존성으로 주입받고 이 객체를 private heroService 프로퍼티에 할당
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(0, 8)));
  }
}

/*
  *대시보드 화면 추가하기

  대시보드 화면의 클래스 는 HeroesComponent 클래스와 비슷합니다.

  - heroes 프로퍼티를 배열로 선언합니다.
  - 생성자를 통해 HeroService를 의존성으로 주입받고 이 객체를 private heroService 프로퍼티에 할당합니다.
  - HeroService의 getHeroes 함수는 ngOnInit() 라이프싸이클 후킹 함수에서 호출합니다.
  - 이 때 대시보드 화면의 컴포넌트 클래스에서는 HeroService의 getHeroes()로 받은 배열 데이터 중에 
    4개만 추출(..slice(1, 5))해서 heroes 프로퍼티에 할당합니다. -> slice(0, 8) -> 8개(id:1~8)로 늘림

  https://angular.kr/tutorial/toh-pt5#%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C-%ED%99%94%EB%A9%B4-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
 */
