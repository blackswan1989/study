import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  //이 서비스는 messages 프로퍼티에 메시지를 캐싱하는데, add() 메소드는 프로퍼티에 메시지를 추가하고 clear() 메소드는 캐시를 비우는 역할을 합니다.
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor() {}
}

/*
 *MessageService 생성하기

 https://angular.kr/tutorial/toh-pt4#messageservice-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
*/
