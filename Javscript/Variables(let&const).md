<br>

# Javascript ES6

by nomadcoder

<br>

---

<br>

## #1 VARIABLES - let and const

<br>

- let과 const는 Block Scope의 성질을 가지고 있다. Block Scope란 간단하게 설명하면 `{...}` 블록 안에서 보호받게 되는 성질을 의미한다.

   ```
   if (true) {
       let hello = "hi";    // Block Scope의 성질때문에 외부에서 읽을 수 없다.
   }

   let hello = "bye";
   console.log(hello)   // bye
   ``` 

   주의할 점은 블록 내부의 코드는 외부에서 접근하지 못하지만 해당 블록 외부의 코드는 내부에서 접근이 가능하다.

<br>
<br>

- const는 상수이지만 완전히 안전한 것은 아니다.

    ```
    const person = {
        name: "Jane"
    }

    person.name = "kate";   // 변경됨
    ```

    `person`을 true나 20으로 바꾸는 등의 할당은 불가능하지만 `person` 오브젝트 안의 어떤 것은 바꿀 수도 있다.

<br>
<br>

- let은 var와 비슷하다 

    ```
    let jane = "Jane"
    jane = "lalalala"  // 에러나지않음
    ```

    위처럼 자유롭게 값을 바꿀 수 있기 때문에 variable값을 overwrite해야하는 상황이 발생하면 let을 사용한다. 그 외엔 비교적 안전한 const를 사용해주는 것이 좋다.

<br>
<br>

- let과 var의 호이스팅 비교

    자바스크립트는 기본적으로 위에서 아래로 코드가 실행되지만 호이스팅(variable이 끌어올려지는 현상)이 된다는 특징이 있다.

    ```
    console.log(name)  // variable이 호이스팅 되어 에러가 아닌 Undefined가 출력된다.
    var name = "Jane"


    console.log(name)   // let은 호이스팅 되지 않아 정의되지 않은 name에 대해 에러가 출력되게 된다.
    let name = "Jane"
    ```

<br>
