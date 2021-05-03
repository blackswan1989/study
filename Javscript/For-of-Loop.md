# For of Loop :)

<br>
<br>

## 1. For

<br>

- Example 1) 
  <br>

    ```
    const friends = ["Jane", "Kate", "Eva"];

    for (let i=0; i < 10; i++) {
        console.log('I love Movies', {i})
    }

    // I love Movies * 10번 출력되고, {i}는 10까지 순차적으로 커진다.
    ```

- Example 2) 
  <br>

    ```
    for (let i=0; i < friends.length; i++) {
        console.log('I love', friends[i])
    }

    // I love Jane, I love Kate, I love Eva 가 출력된다.
    ```

<br>
<br>

## 2. forEach

<br>

`forEach`는 배열에 있는 각각의 엘리먼트에 대해 특정한 Action을 해준다. 

<br>
<br>

### # parameter

<br>

`forEach`는 각 요소에 대해 실행할 함수. 다음 세 가지 매개변수(`parameter`)를 받습니다.

<br>

**1. currentValue :** 처리할 현재 요소.
**2. index(optional) :** 처리할 현재 요소의 인덱스.
**3. array(optional) :** forEach()를 호출한 배열.
**4. thisArg(optional) :** callback을 실행할 때 this로 사용할 값.

<br>

- Example 1) 
  <br>
  
    ```
    const myFriends = ["Jane", "Kate", "Eva", "Kristen"];

    const addItem = c => console.log(c)

    myFriends.forEach(addItem);

    // Jane, Kate, Eva, Kristen (myFriends 배열의 current Value들을 각각 출력해준다.)
    ```

- Example 2) 
  <br>
  
    ```
    const myFriends = ["Jane", "Kate", "Eva", "Kristen"];

    const addItemIndex = (c, i) => console.log(c, i)

    myFriends.forEach(addItemIndex);

    // Jane 0, Kate 1, Eva 2, Kristen 3 (myFriends 현재 배열 요소들과 인덱스를 각각 출력해준다.)
    ```

- Example 3) 
  <br>
  
    ```
    const myFriends = ["Jane", "Kate", "Eva", "Kristen"];

    const addItemIndexArray = (c, i, a) => console.log(c, i, a)

    myFriends.forEach(addItemIndexArray);

    // Jane 0 (4) ["Jane", "Kate", "Eva", "Kristen"]
    // Kate 1 (4) ["Jane", "Kate", "Eva", "Kristen"]
    // Eva 2 (4) ["Jane", "Kate", "Eva", "Kristen"]
    // Kristen 3 (4) ["Jane", "Kate", "Eva", "Kristen"]
    ```

<br>
<br>

- MDN <small>(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)</small>


<br>
<br>

## 3. for of

<br>

for...of 명령문은 반복가능한 객체 (Array, Map, Set, String, TypedArray, arguments 객체 등을 포함)에 대해서 반복하고 각 개별 속성값에 대해 실행되는 문이 있는 사용자 정의 반복 후크를 호출하는 루프를 생성합니다.

<br>
<br>

- MDN <small>(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of)</small>