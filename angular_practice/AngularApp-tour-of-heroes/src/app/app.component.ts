import { Component } from '@angular/core';

// 컴포넌트 클래스에 지정해야 하는 메타데이터는 @Component 데코레이터에 지정해준다.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Heroes';
}
