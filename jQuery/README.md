# jQuery 구문

url: https://www.w3schools.com/jquery/jquery_selectors.asp

---

### 1) jQuery Syntax

The jQuery syntax is tailor-made for selecting HTML elements and performing some action on the element(s).

**Basic syntax(기본 구문) is: `$(selector).action()`**  
**- A $ sign to define/access jQuery**  
**- A (selector) to "query (or find)" HTML elements**  
**- A jQuery action() to be performed on the element(s)**

<br>

#### Examples:

- `$(this).hide(); // 현재 element를 숨긴다.`

- `$("p").hide(); // 모든 p element를 숨긴다.`

- `$(".test").hide(); // class="test" 클래스을 가진 모든 element를 숨긴다.`

- `$("#test").hide(); // id="test" 아이디를 가진 element를 숨긴다.`

- _jQuery는 CSS 구문을 사용하여 요소를 선택한다._

<br>
<br>

### 2) The Document Ready Event (문서 준비 이벤트)

예제의 모든 jQuery 메서드가 문서 준비 이벤트 내에 있음을 알 수 있다.  
즉, 메서드를 사용하면 문서가 완전히 로드 되었을 때 함수를 실행할 수 있다.  
이는 문서로드가 완료되기 전에 jQuery 코드가 실행되는 것을 방지하기위한 것이다.

```
$(document).ready(function(){

  // jQuery methods go here...

});
```

아래 소스처럼 더 짧은 method로도 사용 가능하다.

```
$(function(){

  // jQuery methods go here...

});
```

<br>
<br>

### 3) jQuery Selectors

- jQuery 선택기를 사용하면 HTML 요소를 선택하고 조작 할 수 있다.
- jQuery 선택기는 이름, ID, 클래스, 유형, 속성, 속성 값 등을 기반으로 HTML 요소를 "찾거나 선택"하는 데 사용 된다.
- 기존 CSS 선택 자를 기반으로하며 추가로 자체 사용자 지정 선택기가 있다.
- jQuery의 모든 선택기는 달러 기호 `$`와 괄호 `()`로 시작한다.

<br>

- **Example :**

  - `$("*")` : 모든 element를 선택한다.
  - `$(this)` : 현재 html element를 선택한다.
  - `$("[href]")` : href attribute(속성)이있는 모든 요소를 선택한다.
  - `$("a[target='_blank']")` : 대상 속성 값이 "\_blank"인 모든 <a> 요소를 선택한다.
  - `$(":button")` : 모든 button elements와 input type"button" element를 선택한다.
  - `$("ul li:first-child")` : 모든 ul 태그의 첫번째 li element를 선택한다.
  - `$("tr:even")` : table의 row행의 모든 모든 짝수 tr elements를 선택한다.
  - `$("tr:odd")` : table의 row행의 모든 홀수 tr elements를 선택한다.

<br>
<br>

### 4) The element Selector

- jQuery 요소 선택기는 element 이름을 기반으로 element를 선택한다.
- `$("p")`는 페이지의 모든 p태그 elements를 선택할 수 있다.

<br>

- **Example :**

  ```
  // 사용자가 버튼을 클릭하면 모든 "p" elements가 숨겨진다(display:none).

  $(document).ready(function(){
    $("button").click(function(){
      $("p").hide();
    });
  });

  // $("p:first")는 첫번째 p태그 element를 선택한다.
  ```

<br>
<br>

### 5) The #id Selector

- jQuery #id Selector는 HTML 태그의 id 속성을 사용하여 특정 요소를 찾는다.
- ID는 페이지 내에서 고유해야하므로 하나의 고유 한 요소를 찾으려면 #id 선택기를 사용해야 한다.
- 특정 ID를 가진 요소를 찾으려면 HTML 요소의 ID 뒤에 `$("#test")`처럼 해시 문자를 작성하면 된다.

<br>

- **Example :**

  ```
  // 사용자가 버튼을 클릭하면 id = "test"인 element가 숨겨진다.

  $(document).ready(function(){
    $("button").click(function(){
      $("#test").hide();
    });
  });
  ```

<br>
<br>

### 6) The class Selector

- jQuery .class Selector는 특정 클래스가있는 element를 찾는다.
- 특정 클래스가있는 요소를 찾으려면 `$(".test")`처럼 마침표 문자와 클래스 이름을 작성하면 된다.

<br>

- **Example :**

  ```
  // 사용자가 버튼을 클릭하면 class="test"가있는 요소가 숨겨진다.

  $(document).ready(function(){
    $("button").click(function(){
      $(".test").hide();
    });
  });


  $(document).ready(function(){
    $("button").click(function(){
      $(this).hide();
    });
  });
  ```
