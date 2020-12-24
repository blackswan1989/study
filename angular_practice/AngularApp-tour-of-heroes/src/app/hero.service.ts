import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

// @Injectable() 데코레이터는 서비스를 정의하는 메타데이터 객체를 인자로 받습니다. @Component() 데코레이터에 메타데이터를 사용했던 것과 같은 방식입니다.
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService // messageService 프로퍼티를 private으로 선언 -> HeroService가 생성될 때 MessageService의 싱글턴 인스턴스를 의존성으로 주입해준다.
  ) {}

  // mock-heroes 데이터 를 반환하는 getHeroes 메소드를 추가.
  getHeroes(): Observable<Hero[]> {
    // 히어로 데이터를 받아온 뒤에 메시지를 보내도록
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // 히어로 데이터를 받아온 뒤에 메시지를 보내도록
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find((hero) => hero.id === id));
  }
}

/* 
  *히어로 데이터 가져오기 (HeroService)
  1)HeroService는 —웹 서비스나 로컬 스토리지, 목 데이터 소스 등— 어디에서든 히어로 데이터를 가져올 수 있습니다.

  2)컴포넌트에서 데이터에 접근하는 로직을 제거하면 컴포넌트는 데이터를 표시하는 목적에만 집중할 수 있으며, 
    데이터를 가져오는 곳이 변경되더라도 컴포넌트가 이 내용을 신경쓰지 않아도 됩니다.

  *HeroService 등록하기 (provider & injector)
  1)HeroService를 HeroesComponent에 의존성으로 주입 하려면 이 서비스의 프로바이더(provider)가 Angular 의존성 주입 시스템에 등록되어야 합니다. 
    프로바이더는 서비스를 생성하고 전달하는 방식을 정의한 것입니다. 이 예제에서는 서비스 클래스가 HeroService의 프로바이더입니다.

  2)서비스 프로바이더는 인젝터(injector) 에 등록됩니다. 인젝터는 의존성 주입 요청이 있었던 객체를 적절하게 고르고 생성하는 역할을 합니다.
    이 서비스의 @Injectable() 데코레이터에 providedIn: 'root'를 지정해서 서비스 프로바이더를 최상위 인젝터 에 등록합니다.

  3)서비스가 최상위 인젝터에 등록되면 HeroService의 인스턴스를 하나만 생성하며, 이 클래스가 주입되는 모든 곳에서 같은 인스턴스를 공유합니다. 
    그리고 @Injectable() 데코레이터는 이 데코레이터가 등록된 클래스가 실제로 사용되지 않으면 이 클래스를 최종 빌드 결과물에서 제거하는 대상으로 등록하는 역할도 합니다.

  *HeroService.getHero() 추가하기
  https://angular.kr/tutorial/toh-pt5#heroservicegethero-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
*/
