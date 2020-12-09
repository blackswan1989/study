# 7. 배열을 쉽게 다루는 Array 객체

## 07-1 Array 객체란?

### 1) Array 객체로 배열 만들기

```
const my Array = new Array() //Array 객체의 인스턴스 생성

const numbers = ["one", "two", "three", "four", "five"]; // 리터럴을 사용한 배열
const numbers = new Array("one", "two", "three", "four", "five"); // Array 객체를 사용한 배열

> numbers.length
< 5
```

<br>

### 2) 배열에서 for문 사용하기

```
> for (let = i; i < numbers.length; i++) {
  console.log(numbers[i])
  }

< "one", "two", "three", "four", "five"

```

<br>
<br>

## 07-2 Array 객체의 함수 알아보기

### 1) 둘 이상의 배열을 연결하는 concat() 함수

concat() 함수는 기존의 배열에 또 다른 배열이나 값을 합쳐서 새로운 배열을 만드는 함수이다.

```
const number = ["one", "two", "three", "four", "five"];
const english = ["A", "B", "C", "D", "E"];

> number.concat(english); // number배열에 english 배열 연결
< (10) ["one", "two", "three", "four", "five", "A", "B", "C", "D", "E"]
```

- concat() 함수를 사용할때 배열 순서를 바꾸면 연결 순서가 달라진다.
  ex) english.concat(number)

- concat() 함수는 새로운 배열을 만들기 때문에 기존의 배열에는 영향을 주지 않는다.

<br>

### 2) 배열 요소를 연결하는 join()함수

join()함수는 배열 요소를 연결하는 함수이다.  
배열 요소를 연결해서 나열할 때 각 요소 사이에 넣을 구분 기호가 필요한데,  
join()함수는 이 기호를 직접 지정할 수 있다. (지정하지 않으면 쉼표(,)로 구분한다.)

```
> nums.join() // 구분 기호 없이 연결
< "1,2,3"

> nums.join("-") // 구분기호 "-"를 사용해서 연결
< "1-2-3"

> myColor.join("+");
> myColor = ["red", "green", "blue"];
< colorString = "red+green+blue";
```

- concat()함수와 join()함수를 사용하면 원래 배열은 바뀌지 않고 새로운 배열이 만들어진다.

<br>

### 3) 새로운 요소를 추가하는 push()함수와 unshift()함수

push()함수는 배열의 맨 끝에 요소를 추가할 수 있고, unshift()함수는 배열을 맨 앞에 추가할 수 있다.  
추가하는 요소는 하나일 수도 있고 두 개 이상일 수도 있다.

```
> const num = [1, 2, 3];
> num.push(4, 5); // num 배열 맨 끝에 '4, 5' 요소 추가
< 5 // 새 요소가 추가된 후의 배열 요소의 갯수가 반환된다.

> num
< (5) [1, 2, 3, 4, 5]

> num.unshift(0); // num배열 맨 앞에 '0'요소 추가
< 6

> num
< (6) [0, 1, 2, 3, 4, 5] // 배열의 맨 앞에 '0'이 추가 된 것을 알 수 있다.
```

<br>

### 4) 배열에서 요소를 추출하는 pop() 함수와 shift() 함수

Array 객체에서 맨 뒤에 있는 요소를 추출할 때는 pop() 함수를 사용하고, 맨 앞에 있는 요소를 추출할 때에는 shift() 함수를 사용한다.  
배열에서 요소를 추출하면 해당 요소가 배열에서 빠지면서 배열이 수정되기 때문에 배열에서 요소를 삭제할 때는 추출 함수를 사용한다.

```
> const study = ["html", "css", "javascript"]
> study.pop()
< "javascript" // pop()함수로 추출

> study
< (2) ["html", "css"]
```

- pop()함수가 배열의 마지막 요소를 반환하는 반면 shift()함수는 배열의 첫 요소를 반환한다.

```
> const js = ["es6", "node", "react", "angular", "vue"]
> js.shift()
< "es6"

> js
< (4) ["node", "react", "angular", "vue"]
```

<br>

### 5) 원하는 위치의 요소를 삭제하거나 추가하는 splice() 함수

배열의 중간 부분에 요소를 추가하거나 삭제할때, 그리고 한 번에 2개 이상의 요소를 추가하거나 삭제할때 사용한다.  
splice() 함수는 괄호 안에 들어 있는 인수에 따라 일정 구간 요소를 삭제하고 새로운 요소를 추가한다.  
splice() 함수를 실행하면 삭제한 구간의 요소들로 이루어진 새로운 배열이 결과값으로 표시된다.

- 인수가 1개일 경우  
  이때 괄호 안의 인수는 그 배열의 인덱스 값을 가리킨다. 이 경우 splice() 함수는 인수가 가리키는 인덱스의 요소부터 배열의 끝 요소까지 삭제한다.

  ```
  > const numbers = [0,1,2,3,4,5]
  > numbers.splice(2) // 인덱스 2 이후 끝까지 삭제
  < (4) [2, 3, 4, 5] // 삭제된 요소들

  > numbers
  < (2) [0, 1] // 수정된 numbers 배열
  ```

- 인수가 2개일 경우  
  splice() 함수에 인수가 2개일 경우 첫 번째 인수는 인덱스 값이고 두 번째 인수는 삭제할 갯수이다.

  ```
  > js = ["node", "react", "angular", "vue"]
  > js. splice(2, 1)
  < ["angular"]

  > js
  < (3) ["node", "react", "vue"]
  ```

- 인수가 3개 이상일 경우  
  splice() 함수의 첫 번째 인수는 해당 배열에서 삭제를 시작할 위치, 두 번째 인수는 삭제할 개수를 알려준다.  
  세 번째 인수부터는 앞서 삭제한 위치에 새로 추가할 요소를 지정해준다.

  ```
  > js = ["node", "react", "vue"]
  > js.splice(2, 1, "typescript")
  < ["vue"]

  > js
  < (3) ["node", "react", "typescript"] // 2번째의 vue 요소가 빠지고 typescript가 추가되었다.

  > js.splice(3, 0, "jquery") // 기존 배열의 요소를 삭제하지 않고 새로운 요소를 추가하고싶을때 삭제할 갯수를 0으로 지정하면 된다.
  < [] // 삭제한 요소가 없기 때문에 실행 결과는 빈 배열을 반환한다.

  > js
  < (4) ["node", "react", "typescript", "jquery"] // 3번째 자리에 새로운 요소가 추가되었다.
  ```

- 여러개의 요소를 추가하고 싶을 때  
  추가하고 싶은 요소를 세 번째 인수부터 차례대로 나열하면 된다.

  ```
  > const number = [1,2,3]
  > number.splice(3, 0, 4, 5, 6, 7, 8, 9, 10) // 4부터 나열함.
  < []

  > number
  < (10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // 새로운 요소가(4~10) 추가되었다
  ```

<br>

### 6) 원하는 위치의 요소들을 추출하는 slice() 함수

slice() 함수는 시작 인덱스와 끝 인덱스를 지정해 그 사이의 요소를 배열에서 꺼낸다.  
solice() 함수처럼 slice() 함수도 시작 인덱스만 지정할 경우 시작 인덱스부터 배열 끝까지 추출한다.
pop()함수나 shif()함수와의 차이점은 여러 개의 요소를 꺼낼 수 있다는 점과 원래 배열은 변경되지 않는다는 점이다.

```
> const num = [1,2,3,4,5]
> num.slice(2)
< (3) [3, 4, 5] // 인덱스 2부터 끝까지 추출

> num
< (5) [1, 2, 3, 4, 5] // 원래 num배열은 변경되지 않는다.


> const num2 = num.slice(1,4) //slice() 함수에서 시작 인덱스와 끝 인덱스를 모두 지정하면 끝 인덱스의 '직전'까지의 요소를 추출한다.
> num2
< (3) [2, 3, 4]

> num
< (5) [1, 2, 3, 4, 5] // 원래 num배열은 변경되지 않는다.
```

배열에서 특정 위치의 요소를 활용한다는 점에서 splice()함수와 같은 기능을 하지만,  
slice()함수는 원래 배열에 영향을 주지 않는다. 따라서 배열에서 추출한 요소를 가지고 '새로운 배열'을 만들어  
사용하려면 slice()함수가 적당하고, 배열에서 일부 요소를 삭제하려면 splice()함수가 적당하다.

URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

<br>

### 7) 반복적인 기능을 수행할 때 사용하는 forEach() 함수

forEach는 for문과 마찬가지로 반복적인 기능을 수행할 때 사용한다.  
하지만 for문처럼 index와 조건식, increase를 정의하지 않아도 callback 함수를 통해 기능을 수행할 수 있다.

- #### 1. [].forEach(callback, thisArg)

  ```
  const arr = [0,1,2,3,4,5,6,7,8,9,10];

  arr.forEach(function(element){
      console.log(element)
  });

  > 0
  > 1
  > 2
  > 3
  > 4
  > 5
  > 6
  > 7
  > 8
  > 9
  ```

  arr 객체의 요소들이 callback 함수에 순서대로 호출되는 모습을 볼 수 있다.  
  for문에 비해 좀 더 깔끔하고, 직관적인 것이 특징이다.  
  (index가 2씩 증가한다거나 그런 변칙이 없이 arr내 모든 요소들이 callback을 호출한다)

- #### 2. 홀수 배열 만들어보기

  forEach는 return이 없다. 즉 callback 함수에 의해서 어떤 결과물을 내놓고 싶으면 함수 밖의 변수를 사용해야 한다.

  ```
  const arr = [0,1,2,3,4,5,6,7,8,9,10];
  const oddArray = [];

  arr.forEach(function(element){ // 홀수 배열을 만들기 위해 %2를 한 나머지가 ==1 일때를 가정.
    if(element%2==1) {
        oddArray.push(element);
      }
  });

  > console.log(oddArray);
  < (5) [1, 3, 5, 7, 9]
  ```

  위와 같은 방법으로 결과물을 만들어낼 수 있지만, 함수 밖 영역의 참조는 예상치 못한 예외 상황을 발생시킬 수 있으므로 scope관리를 잘 해줘야 한다.

- #### 3. callback 함수 인자

  forEach의 callback 함수에는 배열의 요소 뿐만아니라 index, 전체 배열을 인자로 사용할 수 있다.

  ```
  const arr = [0,1,2,3,4,5,6,7,8,9,10];

  arr.forEach(function(element, index, array){
      console.log(`${array}의 ${index}번째 요소 : ${element}`);
  });

  < 0,1,2,3,4,5,6,7,8,9,10의 0번째 요소 : 0
  < 0,1,2,3,4,5,6,7,8,9,10의 1번째 요소 : 1
  < 0,1,2,3,4,5,6,7,8,9,10의 2번째 요소 : 2
  < 0,1,2,3,4,5,6,7,8,9,10의 3번째 요소 : 3
  < 0,1,2,3,4,5,6,7,8,9,10의 4번째 요소 : 4
  < 0,1,2,3,4,5,6,7,8,9,10의 5번째 요소 : 5
  < 0,1,2,3,4,5,6,7,8,9,10의 6번째 요소 : 6
  < 0,1,2,3,4,5,6,7,8,9,10의 7번째 요소 : 7
  < 0,1,2,3,4,5,6,7,8,9,10의 8번째 요소 : 8
  < 0,1,2,3,4,5,6,7,8,9,10의 9번째 요소 : 9
  < 0,1,2,3,4,5,6,7,8,9,10의 10번째 요소 : 10
  ```

  DOM 객체에 onclick을 지정할 때 index를 사용하여 arr의 값을 참조하는 방식으로도 사용할 수 있다.

  URL: https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Array-forEach  
  URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
