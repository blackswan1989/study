# jQuery - Traversing

URL : https://www.w3schools.com/jquery/jquery_traversing.asp

---

## 01. Traversing(횡단, 순회) 이란?

"이동하다"를 의미하는 Traversing는 다른 요소와의 관계를 기반으로 HTML 요소를 "찾거나 선택"하는 데 사용된다.  
하나의 선택으로 시작하여 원하는 요소에 도달 할 때까지 해당 선택을 통해 이동하게 된다.

아래 이미지는 HTML 페이지를 트리 (DOM Tree)로 보여주고 있다.  
jQuery의 Traversing을 사용하면 선택한(현재) 요소에서 시작하여 트리에서  
쉽게 위(상위), 아래(하위) 및 옆(형제)으로 이동할 수 있다.  
이 이동을 DOM Tree를 통해 traversing 또는 moving through(이동)이라고 한다.

![DOM-Traverse](https://user-images.githubusercontent.com/67410919/101145574-54f2f880-365d-11eb-9a58-ec6fc17947ed.png)

<br>

- **Traversing the DOM**

  - jQuery는 DOM을 Traversing 할 수 있는 다양한 메소드를 제공하고 있다.
  - Traversing 방법의 가장 큰 범주는 DOM Tree Traversing이다.

<br>
<br>
<br>

## 02. Traversing - Ancestors(조상)

DOM TREE를 순회(Traversing)하여 요소의 조상(Ancestors)을 찾을 수 있다.
Ancestors의 종류로는 부모(parent), 조부모(grandparent), 증조부모(great-grandparent) 등이 있다.  
DOM TREE를 탐색하는 데 유용한 세 가지 Methods는 다음과 같다.

- parent()
- parents()
- parentsUntil()

<br>

### 1) parent() Method

`parent()` 함수는 선택한 요소의 직접적인 부모(direct parent) 요소를 반환한다.  
이 함수는 DOM 트리의 상위 한 단계(single level)로만 이동한다.

- **Examples :**

  ```
  // span의 직접적인 부모요소인 li박스에만 css가 적용됨을 확인할 수 있다.

  $(document).ready(function(){
    $("span").parent().css({"color": "red", "border": "2px solid red"});
  });


  // 예제 공통
  .ancestors * {
    display: block;
    border: 2px solid lightgrey;
    color: lightgrey;
    padding: 5px;
    margin: 15px;
  }

  <div class="ancestors">
    <div style="width:500px;">div (great-grandparent)
      <ul>ul (grandparent)
        <li>li (direct parent)
          <span>span</span>
        </li>
      </ul>
    </div>

    <div style="width:500px;">div (grandparent)
      <p>p (direct parent)
        <span>span</span>
      </p>
    </div>
  </div>
  ```

  ![parent](https://user-images.githubusercontent.com/67410919/101145552-4d335400-365d-11eb-9c09-9a5b62ca11dc.PNG)

<br>
<br>

### 2) parents() Method

`parents()` 함수는 복수형의 이름에서 알 수 있듯 선택한 요소의 문서의 루트 요소(<html>)까지 모든 상위 요소를 반환한다.

- **Examples :**

  ```
  // span의 모든 부모요소에 css가 적용된 것을 확인할 수 있다.

  $(document).ready(function(){
    $("span").parents().css({"color": "red", "border": "2px solid red"});
  });
  ```

  ![parents](https://user-images.githubusercontent.com/67410919/101146164-05f99300-365e-11eb-8bb4-3d2454e3d142.PNG)

<br>
<br>

### 3) parentsUntil() Method

`parentsUntil()` 함수는 주어진 두 인수 사이의 모든 상위 요소를 반환한다.

- **Examples :**

  ```
  // span과 div 사이의 모든 상위 요소에 css가 적용된 것을 확인할 수 있다.

  $(document).ready(function(){
    $("span").parentsUntil("div").css({"color": "red", "border": "2px solid red"});
  });
  ```

  ![parentsUntil](https://user-images.githubusercontent.com/67410919/101146669-a18b0380-365e-11eb-81c8-a4e16435d05b.PNG)

<br>
<br>
<br>

## 03. Traversing - Descendants(자손)

DOM TREE를 순회(Traversing)하여 요소의 하위 항목(Descendants)들을 찾을 수 있습니다.  
Descendant에는 child(자녀), grandchild(손자), great-grandchild(증손자) 등이 있다.  
DOM TREE를 순회하는 데 유용한 두 가지 Method는 다음과 같다.

- children()
- find()

<br>

### 1) children() Method

`children()` 함수는 선택한 요소의 모든 직계 자식(direct children)을 반환한다.  
이 함수는 DOM TREE의 하위 한 단계(single level)로만 이동한다.

- **Examples 1 :**

  div요소의 직계 자식인 모든 p element에 css가 적용됨을 알 수 있다.

  ```
  $(document).ready(function(){
    $("div").children().css({"color": "red", "border": "2px solid red"});
  });


  // 예제 공통
  .descendants * {
    display: block;
    border: 2px solid lightgrey;
    color: lightgrey;
    padding: 5px;
    margin: 15px;
  }

  <div요소의 class="descendants" style="width:500px;">div (current element)
    <p>p (child)
      <span>span (grandchild)</span>
    </p>
    <p>p (child)
      <span>span (grandchild)</span>
    </p>
  </div요소의>
  ```

  ![children](https://user-images.githubusercontent.com/67410919/101147740-1ca0e980-3660-11eb-92e2-943b67a3fe42.PNG)

<br>

- **Examples 2 :**

  선택적으로 매개 변수를 사용하여 하위 검색을 필터링 할 수도 있다.  
  `children("p.first")`를 통해 `first` 클래스 이름을 가진 p태그에만 css가 적용된다.

  ```
  $(document).ready(function(){
    $("div").children("p.first").css({"color": "red", "border": "2px solid red"});
  });


  <div class="descendants" style="width:500px;">div (current element)
    <p class="first"> p(child)
      <span>span (grandchild)</span>
    </p>
    <p class="second"> p(child)
      <span>span (grandchild)</span>
    </p>
  </div>
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_children2_

<br>
<br>

### 2) find() Method

`find()` 함수는 선택된 요소의 하위 요소에서 마지막 하위 요소까지 반환한다.

<br>

- **Examples 1 :**

  `div`하위 요소 중 `find("span")`을 모두 찾아 css를 적용 시켜 준다.  
  따라서 `p`태그에는 css가 적용되지 않는다.

  ```
  $(document).ready(function(){
    $("div").find("span").css({"color": "red", "border": "2px solid red"});
  });


  <div class="descendants" style="width:500px;">div (current element)
    <span>span
        <p>p (child)
          <span>span (grandchild)</span>
          <span>span (grandchild)</span>
          <span>span (grandchild)</span>
        </p>
    </span>
        <p>p (child)
          <span>span (grandchild)
              <span>span (grandchild)</span>
          </span>
        </p>
  </div>
  ```

  ![find](https://user-images.githubusercontent.com/67410919/101149982-fdf02200-3662-11eb-85ed-5b4c9153d6e5.PNG)

<br>

- **Examples 2 :**

  `div`의 하위 요소들을 `find("*")`로 모두 찾아 css를 적용시켜준다.

  ```
  $(document).ready(function(){
    $("div").find("*").css({"color": "red", "border": "2px solid red"});
  });


  <div class="descendants" style="width:500px;">div (current element)
    <p>p (child)
      <span>span (grandchild)</span>
    </p>
    <p>p (child)
      <span>span (grandchild)</span>
    </p>
  </div>
  ```

  <img width="514" alt="find2" src="https://user-images.githubusercontent.com/67410919/101240776-be920600-3734-11eb-8cad-967c9fc03572.png">

<br>
<br>
<br>

## 04. Traversing - Siblings(형제)

jQuery를 사용하면 요소의 형제를 찾기 위해 DOM 트리에서 옆으로 이동할 수 있고 형제는 같은 부모를 공유한다.

<br>

### # Traversing Sideways in The DOM Tree

There are many useful jQuery methods for traversing sideways in the DOM tree:

- siblings()
- next()
- nextAll()
- nextUntil()
- prev()
- prevAll()
- prevUntil()

<br>
<br>

### 1) siblings() Method

`siblings()`함수는 선택한 요소의 모든 형제 요소를 반환한다.

- **Examples 1 :**

  `h2`의 모든 형제 element들에 css가 적용된다.  
  `h2`자신과 부모 element인 `div` `body`에는 적용되지 않는다.

  ```
  <script>
    $(document).ready(function(){
      $("h2").siblings().css({"color": "red", "border": "2px solid red"});
    });
  </script>


  // 예제 공통
  .siblings * {
    display: block;
    border: 2px solid lightgrey;
    color: lightgrey;
    padding: 5px;
    margin: 15px;
  }

  <body class="siblings">
    <div>div (parent)
      <p>p</p>
      <span>span</span>
      <h2>h2</h2>
      <h3>h3</h3>
      <p>p</p>
    </div>
  </body>
  ```

  <br>

- **Examples 2 :**

  선택적으로 매개 변수를 사용하여 형제 검색을 필터링 할 수도 있다.

  ```
  // <h2>의 형제중 모든 <p>의 형제 요소를 반환시켜 <p>태그들에게만 css를 적용시킨다.

  $(document).ready(function(){
    $("h2").siblings("p").css({"color": "red", "border": "2px solid red"});
  });
  ```

<br>
<br>

### 2) next() Method

`next()`함수는 선택한 element의 바로 다음 형제 요소를 반환해 준다.

- **Examples :**

  `h3`의 바로 다음 형제인 `<p>`에 css가 적용된다.

  ```
  $(document).ready(function(){
    $("h3").next().css({"color": "red", "border": "2px solid red"});
  });


  <div>div (parent)
    <p>p</p>
    <span>span</span>
    <h2>h2</h2>
    <h3>h3</h3>
    <p>p</p>
  </div>
  ```

<br>
<br>

### 3) nextAll() Method

`nextAll()`함수는 선택한 element의 다음 형제부터 모든 element를 반환시켜준다.

- **Examples :**

  `nextAll()`을 사용하면 선택한 `span`부터 `h2` `h3` `p`태그에 css가 적용된다.

  ```
  $(document).ready(function(){
    $("span").nextAll().css({"color": "red", "border": "2px solid red"});
  });

  <div>div (parent)
    <p>p</p>
    <span>span</span>
    <h2>h2</h2>
    <h3>h3</h3>
    <p>p</p>
  </div>
  ```

<br>
<br>

### 4) nextUntil() Method

`nextUntil()`함수는 주어진 두 인수 사이의 모든 다음 형제 요소를 반환시켜 준다.

- **Examples :**

  `h2`와 `h6`사이의 모든 element들이 반환된다.  
  즉 h3, h4, h5에 css가 적용된다.

  ```
  <script>
    $(document).ready(function(){
      $("h2").nextUntil("h6").css({"color": "red", "border": "2px solid red"});
    });
  </script>


  <div>div (parent)
    <span>span</span>
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <h6>h6</h6>
    <p>p</p>
  </div>
  ```

<br>
<br>

### 5) prev(), prevAll(), prevUntil() Method

`prev()`, `prevAll()`, `prevUntil()` 함수들은 위의 함수들과 같지만 역기능을 가진 방법처럼 작동한다.  
즉 그들은 이전 형제 요소를 반환시켜준다(대신 앞으로의 DOM 트리의 요소를 형제를 따라 뒤로 이송).

<br>
<br>
<br>

## 05. Traversing - Filtering

### # first(), last(), eq() Methods & filter(), not() Methods

가장 기본적인 필터링 방법은 `first()`, `last()`, `eq()` 함수를 사용하는 것이다.  
이 방법을 사용하면 요소 그룹에서의 위치에 따라 특정 요소를 선택할 수 있다.

다른 방법은 `filter()`와 `not()` 함수 같은 다른 필터링 방법으로  
특정 기준과 일치하거나 일치하지 않는 요소를 선택할 수 있다.

<br>
<br>

### 1) first() Method

`first()`함수는 지정된 요소의 첫 번째 요소를 반환시켜 준다.

- **Examples :**

  `first()`함수를 통해 첫번째 `div`에만 css가 적용된다.

  ```
  <script>
    $(document).ready(function(){
      $("div").first().css("background-color", "yellow");
    });
  </script>

  // 예제 동일
  <div style="border: 1px solid black;">
    <p>A paragraph in a div.</p>
    <p>Another paragraph in a div.</p>
  </div>
  <br>
  <div style="border: 1px solid black;">
    <p>A paragraph in another div.</p>
    <p>Another paragraph in another div.</p>
  </div>
  <br>
  <div style="border: 1px solid black;">
    <p>A paragraph in another div.</p>
    <p>Another paragraph in another div.</p>
  </div>
  ```

<br>
<br>

### 2) last() Method

`last()` 함수는 지정된 요소의 마지막 요소를 반환시켜준다.

- **Examples :**

  `last()`함수를 통해 마지막 `div`에만 css가 적용된다.

  ```
  $(document).ready(function(){
    $("div").last().css("background-color", "yellow");
  });
  ```

<br>
<br>

### 3) eq() Method

`eq()` 함수는 선택한 요소의 특정 인덱스 번호의 요소를 반환시켜준다.  
인덱스 번호는 0에서 부터 시작하므로 첫 번째 요소의 색인 번호는 1이 아닌 0이 된다.

- **Examples :**

  `eq(1)`을 통해 2번째 인덱스 요소에 css를 적용시켜 준다.

  ```
  <script>
    $(document).ready(function(){
      $("p").eq(1).css("background-color", "yellow");
    });
  </script>


  <p>My name is Donald (index 0).</p>
  <p>Donald Duck (index 1).</p>
  <p>I live in Duckburg (index 2).</p>
  <p>My best friend is Mickey (index 3).</p>
  ```

<br>
<br>

### 4) filter() Method

`filter()` 함수를 사용하면 기준을 지정할 수 있다.  
기준과 일치하지 않는 요소는 선택 항목에서 제거되고 일치하는 요소만 반환시켜준다.

- **Examples :**

  `$("p").filter(".intro")`을 통해 intro라는 클래스명을 가진 p태그들에게만 css를 적용시켜 준다.

  ```
  <script>
    $(document).ready(function(){
      $("p").filter(".intro").css("background-color", "yellow");
    });
  </script>


  <p>My name is Donald.</p>
  <p class="intro">I live in Duckburg.</p>
  <p class="intro">I love Duckburg.</p>
  <p>My best friend is Mickey.</p>
  ```

<br>
<br>

### 5) not() Method

`not()` 함수는 기준과 일치하지 않는 모든 요소를 ​​반환시켜 준다.  
`not()` 함수의 기능은 `filter()`함수 기능의 반대라고 할 수 있다.

- **Examples :**

  `$("p").not(".intro")`을 통해 intro라는 클래스명을 가진 element들을 제외한 p태그들에게만 css를 적용시켜 준다.

  ```
  <script>
    $(document).ready(function(){
      $("p").not(".intro").css("background-color", "yellow");
    });
  </script>


  <p>My name is Donald.</p>
  <p class="intro">I live in Duckburg.</p>
  <p class="intro">I love Duckburg.</p>
  <p>My best friend is Mickey.</p>
  ```

<br>
<br>
<br>
<br>

---

### # jQuery Traversing Reference

URL : https://www.w3schools.com/jquery/jquery_ref_traversing.asp
