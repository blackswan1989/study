import { Component} from '@angular/core';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './map.component.html',
  styleUrls: ['./app.component.scss']
})
export class MapComponent {
  // MapComponent = this;

  // kakao: any;

  // renderMap():void {
  //   var container = document.getElementById('map')  //지도를 담을 영역의 DOM 레퍼런스
  //   var options = {   //지도를 생성할 때 필요한 기본 옵션
  //     center: new this.kakao.maps.LatLng(33.450701, 126.570667),  //지도의 중심좌표.
  //     level: 3  //지도의 레벨(확대, 축소 정도)
  //   };

  //   var map = new this.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  //   map();
  // }

  // ngOninit(){
  //   this.renderMap();
  // }
}
