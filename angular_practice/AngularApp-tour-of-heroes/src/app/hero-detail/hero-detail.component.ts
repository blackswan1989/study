import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(
    // 2)
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getHero(); // 3)
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back(); // 브라우저의 히스토리 스택을 활용할 수 있도록 이전에 주입받은 Location 서비스를 사용.
  }
}

/* 
  @Input() hero?: Hero; 히어로 프로퍼티 추가하기 : -> 삭제
  이 때 hero 프로퍼티의 값은 외부 컴포넌트인 HeroesComponent에서 바인딩되어 전달됩니다. 
  따라서 hero 프로퍼티는 @Input() 데코레이터를 사용해서 입력 프로퍼티로 선언해야 합니다.
  <app-hero-detail [hero]="selectedHero"></app-hero-detail>
*/

/*
  *2) HeroDetailComponent 라우팅
  라우터가 HeroDetailComponent를 생성하는데 이 때 URL에 있는 ~/detail/11과 같은 URL을 활용하도록 수정
  https://angular.kr/tutorial/toh-pt5#herodetailcomponent-%EB%9D%BC%EC%9A%B0%ED%8C%85
*/

/*
  *3) 라우팅 변수 id 추출하기
  ngOnInit() 라이프싸이클 후킹 함수에서 HeroService의 getHero() 메소드를 호출

  라우팅 변수는 언제나 문자열 타입입니다. 그래서 라우팅 변수로 전달된 값이 원래 숫자였다면 
  문자열로 받아온 라우팅 변수에 JavaScript (+) 연산자를 사용해서 숫자로 변환할 수 있습니다.

  이 객체가 제공하는 paramMap을 사용하면 URL에 존재하는 라우팅 변수를 참조할 수 있습니다. 
  지금 작성하고 있는 예제에서는 서버로부터 받아올 히어로의 id에 해당하는 값을 URL에 있는 "id" 키로 참조합니다.

  https://angular.kr/tutorial/toh-pt5#%EB%9D%BC%EC%9A%B0%ED%8C%85-%EB%B3%80%EC%88%98-id-%EC%B6%94%EC%B6%9C%ED%95%98%EA%B8%B0
*/
