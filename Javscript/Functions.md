<br>

# Javascript ES6

by nomadcoder

<br>

---

<br>

## #2 FUNCTIONS

<br>
<br>

### #2.0 Arrow Functions

<br>

Functions을 조금더 보기좋고 사용하기 좋게 만든 것으로 화살표(`=>`)처럼 생긴 함수이다.

```
// 기존 Functions 사용 방식

const names = ["Jane", "Kate"];

const hearts = names.map(function(item){
    return item + "#";
});

console.log(hearts);  // (2) ["Jane#", "Kate#"]



// Arrow Functions

const names = ["Jane", "Kate"];

const hearts = names.map((item) => item + "#");

console.log(hearts);  // (2) ["Jane#", "Kate#"]
```

- `map`은 각각의 아이템마다 함수를 호출해준다.

- Arrow Functions은 implicit return의 기능을 가지고 있어 같은 줄에 무엇을 적던지 간에 return을 적지 않아도 return 시켜 준다. (중괄호 `{}`를 사용하면 이 기능은 사라진다.)