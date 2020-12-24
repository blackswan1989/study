import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(
    // messageService를 public으로 할당 -> MessagesComponent의 인스턴스를 생성할 때 MessageService의 싱글턴 인스턴스를 이 프로퍼티로 전달해 준다.
    public messageService: MessageService // messageService 프로퍼티는 템플릿에 바인딩되기 때문에 반드시 public으로 선언해야 한다.
  ) {}

  ngOnInit(): void {}
}

/*
  *HeroService에서 받은 메시지 표시하기
  https://angular.kr/tutorial/toh-pt4#heroservice%EC%97%90%EC%84%9C-%EB%B0%9B%EC%9D%80-%EB%A9%94%EC%8B%9C%EC%A7%80-%ED%91%9C%EC%8B%9C%ED%95%98%EA%B8%B0
*/
