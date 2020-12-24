import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // 2)
  { path: 'dashboard', component: DashboardComponent }, // 2)
  { path: 'heroes', component: HeroesComponent }, // 1)
  { path: 'detail/:id', component: HeroDetailComponent }, // 히어로의 id에 해당하는 라우팅 변수를 :id로 받겠다는 것을 의미
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // https://angular.kr/tutorial/toh-pt5#routermoduleforroot
  exports: [RouterModule], // 앱에서도 RouterModule을 사용할 수 있도록 AppRoutingModule의 exports 배열을 다음과 같이 지정
})
export class AppRoutingModule {}

/*
*1)라우팅 규칙(Route) : Route는 보통 두 개의 프로퍼티를 사용합니다:

path: 브라우저 주소표시줄에 있는 URL과 매칭될 문자열을 지정합니다.
component: 라우터가 생성하고 화면에 표시할 컴포넌트를 지정합니다.
즉 path:'heroes'에 해당하는 URL을 만나면 이동하면서 component: HeroesComponent를 표시해준다.

https://angular.kr/tutorial/toh-pt5#%EB%9D%BC%EC%9A%B0%ED%8C%85-%EA%B7%9C%EC%B9%99route
*/

/*
*2)기본 라우팅 규칙 추가하기

애플리케이션이 시작되면 브라우저의 주소표시줄은 웹 사이트의 최상위 주소를 가리킵니다. 하지만 이 주소에 매칭되는 라우팅 규칙이 없기 때문에 라우터는 페이지를 이동하지 않습니다. 그래서 <router-outlet> 아래쪽은 빈 공간으로 남게 됩니다.

애플리케이션이 실행되면서 대시보드 화면을 자동으로 표시하려면 AppRoutingModule.Routes 배열에 다음과 같이 기본 라우팅 규칙을 추가하면 됩니다. { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

이 라우팅 규칙은 브라우저의 URL이 빈 문자열일 때 '/dashboard' 주소로 이동하도록 설정한 것입니다.
이제 브라우저가 갱신되고 나면 라우터는 브라우저 주소를 http://localhost:4200/에서 http://localhost:4200/dashboard로 변경하면서 DashboardComponent를 바로 표시해주게 됩니다.

https://angular.kr/tutorial/toh-pt5#%EA%B8%B0%EB%B3%B8-%EB%9D%BC%EC%9A%B0%ED%8C%85-%EA%B7%9C%EC%B9%99-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
*/
