import { Component } from '@angular/core';
import { AppModel } from './app.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { maps } from './polygon.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent
{
  powers = ['Really Smart', 'Super Flexible','Super Hot', 'Weather Changer'];

  model = new AppModel(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() {
    this.submitted = true;

    const myHero =  new AppModel(42, 'SkyDog',
                       'Fetch any object at any distance',
                       'Leslie Rollover');
    console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
  }

  getPolygonJson() {
    for (var i = 0, len = maps.length; i < len; i++) {
      displayArea(maps[i]);

      function displayArea(area) {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: new maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 8 // 지도의 확대 레벨
          };

        var map = new maps.Map(mapContainer, mapOption),
          customOverlay = new maps.CustomOverlay({}),
          infowindow = new maps.InfoWindow({removable: true});

        // 다각형을 생성합니다
        var polygon = new maps.Polygon({
          map: map, // 다각형을 표시할 지도 객체
          path: area.path,
          strokeWeight: 2,
          strokeColor: '#004c80',
          strokeOpacity: 0.8,
          fillColor: '#fff',
          fillOpacity: 0.7
        });

        // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
        // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
        maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
          polygon.setOptions({fillColor: '#09f'});

          customOverlay.setContent('<div class="area">' + area.name + '</div>');

          customOverlay.setPosition(mouseEvent.latLng);
          customOverlay.setMap(map);
        });

        // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
        maps.event.addListener(polygon, 'mousemove', function(mouseEvent) {
          customOverlay.setPosition(mouseEvent.latLng);
        });

        // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
        // 커스텀 오버레이를 지도에서 제거합니다
        maps.event.addListener(polygon, 'mouseout', function() {
          polygon.setOptions({fillColor: '#fff'});
          customOverlay.setMap(null);
        });

        // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
        maps.event.addListener(polygon, 'click', function(mouseEvent) {
          var content = '<div class="info">' +
                      '   <div class="title">' + area.name + '</div>' +
                      '   <div class="size">총 면적 : 약 ' + Math.floor(polygon.getArea()) + ' m<sup>2</sup></area>' +
                      '</div>';

          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);
        });
    }
  }
  }
}
