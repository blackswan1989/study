# jQuery - Event Methods

jQuery is tailor-made to respond to events in an HTML page.  
url : https://www.w3schools.com/jquery/jquery_events.asp

---

### 1) What are Events?

웹 페이지가 응답 할 수있는 모든 방문자의 행동을 이벤트라고 한다.  
이벤트는 어떤 일이 일어나는 정확한 순간을 나타낸다고 할 수 있다.

**Examples :**

**- moving a mouse over an element**  
**- selecting a radio button**  
**- clicking on an element**

#### # 대표적인 DOM 이벤트 :

![jQuery_events](https://user-images.githubusercontent.com/67410919/100960940-a79cb980-3564-11eb-8906-e096b70c06f5.png)

<br>
<br>

### 2) Event Method에 대한 jQuery 구문

- jQuery에서 대부분의 DOM 이벤트에는 동일한 jQuery 메서드가 있다.
- 페이지의 모든 '단락'에 클릭 이벤트를 할당하려면 `$("p").click();`를 입력하면 된다.
- 다음 단계는 이벤트가 발생할 때 어떤 일이 발생해야하는지 정의하는 것으로, 이벤트에 함수를 전달해야한다.

  ```
  $("p").click(function(){

    // action goes here!!

  });
  ```

<br>
<br>

### 3) 일반적으로 사용되는 jQuery Event Method

- `click()` 함수는 이벤트 처리기 함수를 HTML element에 연결한다.

  ```
  // click() - 사용자가 html element를 한 번 클릭하면 함수가 실행된다.

  $("p").click(function(){
    $(this).hide();
  });


  // dblclick() -사용자가 html element를 두 번 클릭하면 실행된다.

  $("p").dblclick(function(){
    $(this).hide();
  });

  <p id="p1">This is a paragraph.</p>
  ```

<br>

- `mouseenter()` 함수는 마우스 포인터가 HTML element에 들어갈 때 실행된다.

  ```
  $(document).ready(function(){
    $("#p1").mouseenter(function(){
      alert("You entered p1!");
    });
  });

  <p id="p1">This is a paragraph.</p>
  ```

  <br>

- `mouseleave()` 함수는 마우스 포인터가 HTML element를 떠날 때 실행된다.

  ```
  $(document).ready(function(){
    $("#p1").mouseleave(function(){
      alert("Bye! You now leave p1!");
    });
  });

  <p id="p1">This is a paragraph.</p>
  ```

  <br>

- `mousedown()` 함수는 마우스가 HTML element 위에 있을 때 왼쪽이나 가운데 또는 오른쪽 마우스 버튼을 누른 상태에서 실행된다.

  ```
  $(document).ready(function(){
    $("#p1").mousedown(function(){
      alert("Mouse down over p1!");
    });
  });

  <p id="p1">This is a paragraph.</p>
  ```

  <br>

- `mouseup()` 함수는 왼쪽이나 가운데 또는 오른쪽 마우스 버튼을 클릭했다가 마우스가 HTML element 위에서 놓으면 함수가 실행된다.

  ```
  $(document).ready(function(){
    $("#p1").mouseup(function(){
      alert("Mouse up over p1!");
    });
  });

  <p id="p1">This is a paragraph.</p>
  ```

  <br>

- `hover()` 첫 번째 함수는 마우스가 HTML element에 들어갈 때 실행되고 두 번째 함수는 마우스가 HTML element를 떠날 때 실행된다.

  ```
  $(document).ready(function(){
    $("#p1").hover(function(){
      alert("You entered p1!");
    },

    function(){
      alert("Bye! You now leave p1!");
    });
  });


  <p id="p1">This is a paragraph.</p>
  ```

  <br>

- `focus()` 함수는 양식 필드에 포커스가 되었을 때 실행된다.
- `blur()` 함수는 양식 필드가 포커스를 잃을 때 실행된다.

  ```
  $(document).ready(function(){

    $("input").focus(function(){
      $(this).css("background-color", "yellow");
    });

    $("input").blur(function(){
      $(this).css("background-color", "green");
    });

  });


  <body>
    Name: <input type="text" name="fullname"><br>
    Email: <input type="text" name="email">
  </body>
  ```

  <br>
  <br>

### 4) The on() Method

`on()`함수는 선택한 요소에 대해 하나 이상의 이벤트 처리기를 연결한다.

  <br>

- 클릭 이벤트를 `<p>` element에 첨부 :

  ```
  $(document).ready(function(){
    $("p").on("click", function(){
      $(this).hide();
    });
  });


  <p>If you click on me, I will disappear.</p>
  <p>Click me away!</p>
  <p>Click me too!</p>
  ```

  <br>

- 여러 이벤트를 `<p>` element에 연결 :

  ```
  $(document).ready(function(){
    $("p").on({
      mouseenter: function(){
        $(this).css("background-color", "lightgray");
      },
      mouseleave: function(){
        $(this).css("background-color", "lightblue");
      },
      click: function(){
        $(this).css("background-color", "yellow");
      }
    });
  });


  <p>Click or move the mouse pointer over this paragraph.</p>
  ```

<br>
<br>
<br>
<br>

---

### # jQuery Events Reference

URL : https://www.w3schools.com/jquery/jquery_ref_events.asp
