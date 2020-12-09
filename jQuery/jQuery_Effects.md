# jQuery - Effects

URL : https://www.w3schools.com/jquery/jquery_hide_show.asp\

---

## 01. Effects - Hide & Show

### 1) hide() and show()

`hide()`및 `show()`함수를 사용하여 HTML 요소를 숨기거나 표시 할 수 있다.

```
$(document).ready(function(){
  $("#hide").click(function(){
    $("p").hide();
  });
  $("#show").click(function(){
    $("p").show();
  });
});


<p>If you click on the "Hide" button, I will disappear.</p>

<button id="hide">Hide</button>
<button id="show">Show</button>
```

&nbsp;&nbsp; **Syntax:**

&nbsp;&nbsp;&nbsp;`$(selector).hide(speed,callback);`  
&nbsp;&nbsp;&nbsp;`$(selector).show(speed,callback);`

- `speed` parameter는 `"slow"`, `"fast"`또는 "밀리 초" 값을 사용할 수 있다.
- `callback` parameter는 페이딩이 완료된 후 실행되는 함수이다.

  ```
  $(document).ready(function(){
    $("button").click(function(){
      $("p").hide(1000);
    });
  });


  <button>Hide</button>

  <p>This is a paragraph with little content.</p>
  <p>This is another small paragraph.</p>
  ```

<br>
<br>

### 2) toggle()

`toggle()`함수를 사용하여 요소 숨기기와 표시간에 전환할 수도 있다.  
즉, 표시된 요소는 숨겨지고 숨겨진 요소는 표시된다.

```
$(document).ready(function(){
  $("button").click(function(){
    $("p").toggle();
  });
});


<button>Toggle between hiding and showing the paragraphs</button>

<p>This is a paragraph with little content.</p>
<p>This is another small paragraph.</p>
```

&nbsp;&nbsp; **Syntax:**

&nbsp;&nbsp;&nbsp;`$(selector).fadeIn(speed, callback);`

- `speed` parameter는 `"slow"`, `"fast"`또는 "밀리 초" 값을 사용할 수 있다.
- `callback` parameter는 페이딩이 완료된 후 실행되는 함수이다.

<br>
<br>
<br>

## 02. Effects - Fading

Fading을 사용하면 요소를 표시하거나 표시하지 않을 수 있다.

### 1) fadeIn()

- `fadeIn()` 함수는 숨겨진 요소를 페이드 인하는 데 사용된다.

  ```
  <script>
    $(document).ready(function(){
      $("button").click(function(){
        $("#div1").fadeIn();
        $("#div2").fadeIn("slow");
        $("#div3").fadeIn("slow");
      });
    });
  </script>

  <body>
    <p>Demonstrate fadeIn() with different parameters.</p>
    <button>Click to fade in boxes</button><br><br>
    <div id="div1" style="width:80px;height:80px;display:none;background-color:red;"></div><br>
    <div id="div2" style="width:80px;height:80px;display:none;background-color:green;"></div><br>
    <div id="div3" style="width:80px;height:80px;display:none;background-color:blue;"></div>
  </body>
  ```

  &nbsp;&nbsp; **Syntax:**

  &nbsp;&nbsp;&nbsp;`$(selector).fadeIn(speed, callback);`

  - `speed` parameter는 `"slow"`, `"fast"`또는 "밀리 초" 값을 사용할 수 있다.
  - `callbac`k` parameter는 페이딩이 완료된 후 실행되는 함수이다.

<br>
<br>

### 2) fadeOut()

- `fadeOut()`함수는 보이는 요소를 페이드 아웃하는 데 사용된다.

  ```
    $(document).ready(function(){
      $("button").click(function(){
        $("#div1").fadeOut();
        $("#div2").fadeOut("fast");
        $("#div3").fadeOut("fast");
      });
    });
  ```

<br>
<br>

### 3) fadeToggle()

- 함수 `fadeToggle()`은 `fadeIn()`함수 및 `fadeOut()`함수 사이를 전환 한다.
- element가 페이드 아웃 fadeToggle()되면 '페이드 인'이 되고,
- element가 페이드 인 fadeToggle()되면 '페이드 아웃'이 된다.

  ```
  $(document).ready(function(){
    $("button").click(function(){
      $("#div1").fadeToggle();
      $("#div2").fadeToggle("fast");
      $("#div3").fadeToggle("fast");
    });
  });
  ```

<br>
<br>

### 4) fadeTo ()

- `fadeTo()`는 주어진 불투명도 (0과 1 사이의 값)로 페이드를 허용한다.

  ```
  $(document).ready(function(){
    $("button").click(function(){
      $("#div1").fadeTo("slow", 0.5);
      $("#div2").fadeTo("slow", 0.3);
      $("#div3").fadeTo("slow", 0.1);
    });
  });
  ```

  &nbsp;&nbsp; **Syntax:**

  &nbsp;&nbsp;&nbsp;`$(selector).fadeTo(speed,opacity,callback);`

  - `speed` parameter는 `"slow"`, `"fast"`또는 "밀리 초" 값을 사용할 수 있다.
  - `fadeTo()`함수의 필수인 불투명도 parameter는 주어진 불투명도(0과 1 사이의 값)로 페이드를 지정한다.
  - `callback` parameter는 함수가 완료된 후 실행 실행되는 함수이다.

<br>
<br>
<br>

## 03. Effects - Sliding

Slide 함수들은 요소를 위아래로 슬라이딩 효과를 만들 수 있다.

### 1) slideDown()

- **Examples :**

  ```
  <script>
    $(document).ready(function(){
      $("#flip").click(function(){
        $("#panel").slideDown("slow");
      });
    });
  </script>


  <style>
    #panel, #flip {
      padding: 5px;
      text-align: center;
      background-color: #e5eecc;
      border: solid 1px #c3c3c3;
    }

    #panel {
      padding: 50px;
      display: none; // 보이지 않는 판넬을 슬라이드 다운으로 보여준다.
    }
  </style>

  <body>
    <div id="flip">Click to slide down panel</div>
    <div id="panel">Hello world!</div>
  </body>
  ```

  &nbsp;&nbsp; **Syntax:**

  &nbsp;&nbsp;&nbsp;`$(selector).slideDown(speed,callback);`

  - `speed` parameter는 `"slow"`, `"fast"`또는 "밀리 초" 값을 사용할 수 있다.
  - `callback` parameter는 슬라이딩이 완료된 후 실행 실행되는 함수이다.

<br>
<br>

### 2) slideUp()

- **Examples :**

  `slideUp()`함수는 요소를 위로 밀어 올리는 데 사용할 수 있다.

  ```
  $(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideUp("slow");
    });
  });


  <style>
    #panel, #flip {
      padding: 5px;
      text-align: center;
      background-color: #e5eecc;
      border: solid 1px #c3c3c3;
    }

    #panel {
      padding: 50px;
      display: block; // 이미 보여주고있는 판넬을 슬라이드업으로 숨겨준다.
    }
  </style>

  <body>
    <div id="flip">Click to slide up panel</div>
    <div id="panel">Hello world!</div>
  </body>
  ```

<br>
<br>

### 3) slideToggle ()

- **Examples :**

  `slideToggle()`함수는 `slideDown()`및 `slideUp()`함수 사이를 전환 한다.  
  요소가 아래로 슬라이드 되어있는 경우에서 slideToggle()함수는 위로 슬라이드 시켜준다.  
  요소가 위로 slideToggle() 되어있는 경우에서 아래로 슬라이드 시켜준다.

  ```
  $(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideToggle("fast");
    });
  });
  ```

<br>
<br>
<br>

## 04. Effects - Animations

### 1) The animate() Method

`animate()`함수는 사용자 지정 애니메이션을 만드는 데 사용된다.

<br>

&nbsp;&nbsp; **Syntax:**

&nbsp;&nbsp;&nbsp;`$(selector).animate({params}, speed, callback);`

- 필수입력 매개변수인 `{params}`는 애니메이션 할 CSS properties(속성)을 정의 한다.
- `speed` parameter는 "slow", "fast"또는 "밀리 초" 값을 사용할 수 있다.
- `callback` parameter는 애니메이션이 완료된 후 실행 실행되는 함수이다.

  ```
  $(document).ready(function(){
    $("button").click(function(){
      $("div").animate({left: '250px'});
    });
  });


  <button>Start Animation</button>

  <p>By default, all HTML elements have a static position, and cannot be moved. To manipulate the position, remember to first set the CSS position property of the element to relative, fixed, or absolute!</p>

  <div style="background:#98bf21;height:100px;width:100px;position:absolute;"></div>
  ```

  > **Caution :**  
  > 기본적으로 모든 HTML 요소는 정적 위치를 가지며 이동할 수 없다.  
  > 따라서 요소의 위치를 조작하려면 CSS 위치 속성을 relative, fixed, absolute 등으로 설정해야 한다.

<br>
<br>

### 2) animate() - Manipulate Multiple Properties

여러 속성을 동시에 애니메이션 할 수 있다.

- **Examples :**

  ```
  $(document).ready(function(){
    $("button").click(function(){
      $("div").animate({
        left: '250px',
        opacity: '0.5',
        height: '150px',
        width: '150px'
      });
    });
  });
  ```

  > **Caution :**  
  > animate() 메서드를 사용하여 거의 모든 CSS 속성을 제어 할 수 있다.  
  > 하지만 모든 속성의 이름은 카멜 케이스(낙타표기법)여야 한다.  
  > padding-left가 아닌 paddingLeft, margin-right는 marginRight 등으로 작성해야 한다.
  >
  > 또 색상 애니메이션은 핵심 jQuery 라이브러리에 포함되어 있지 않다.  
  > 따라서 색상에 애니메이션을 적용하려면 jQuery.com에서 색상 애니메이션 플러그인을 별도로 다운로드 해야 한다.

<br>
<br>

### 3) animate() - Using Relative Values

`animate()`함수에서는 상대 값을 정의 할 수도 있다.  
이것은 값 앞에 `+=` 또는 `-=`를 입력하여 수행 되며, 값은 요소의 '현재 값'에 상대적이다.

- **Examples :**

  ```
  // 클릭할 때 마다 박스가 50px만큼 점점 커지는 것을 확인할 수 있다.

  $(document).ready(function(){
    $("button").click(function(){
      $("div").animate({
        height: '+=50px',
        width: '+=50px'
      });
    });
  });
  ```

<br>
<br>

### 4) animate() - Using Pre-defined Values

애니메이션의 속성 값을 `"show"` `"hide"`또는 `"toggle"`와 같은 미리 정의 된 값을 사용할 수 있다.

- **Examples :**

  ```
  // 버튼을 클릭할 때 마다 div box가 토글되어 박스 높이가 줄어들었다 늘어들었다 하는 것을 확인할 수 있다.

  $(document).ready(function(){
    $("button").click(function(){
      $("div").animate({
        height: 'toggle'
      });
    });
  });
  ```

<br>
<br>

### 5) animate() - Uses Queue Functionality

`animate()`함수는 애니메이션을 위한 '대기열 기능'과 함께 제공된다.

즉 서로 여러 호출을 작성하면 jQuery는 이러한 `animate()`함수 호출을 사용하여  
"내부"대기열을 생성한다. 그런 다음 애니메이션 호출을 ONE by ONE으로 실행한다.  
따라서 서로 다른 애니메이션을 수행하려는 경우 대기열 기능을 활용하게 된다.

- **Examples 1 :**

  ```
  // 버튼을 클릭하면 박스모양이 대기열 기능을 활용하여 1-2-3-4 순으로 차례차례 변경된다.

  $(document).ready(function(){
    $("button").click(function(){
      var div = $("div");
      div.animate({height: '300px', opacity: '0.4'}, "slow"); // 1
      div.animate({width: '300px', opacity: '0.8'}, "slow"); // 2
      div.animate({height: '100px', opacity: '0.4'}, "slow"); // 3
      div.animate({width: '100px', opacity: '0.8'}, "slow"); // 4
    });
  });


  <button>Start Animation</button>
  <div style="background:#98bf21;height:100px;width:100px;position:absolute;"></div>
  ```

<br>

- **Examples 2 :**

  ```
  // 버튼을 클릭하면 div element를 먼저 오른쪽으로 이동 한 후 텍스트 글꼴 크기를 늘려준다.

  $(document).ready(function(){
    $("button").click(function(){
      var div = $("div");
      div.animate({left: '100px'}, "slow");
      div.animate({fontSize: '3em'}, "slow");
    });
  });


  <button>Start Animation</button>
  <div style="background:#98bf21;height:100px;width:200px;position:absolute;">HELLO</div>
  ```

<br>
<br>
<br>

## 05. Effects - Stop Animations

### 1) stop()

`stop()`함수는 애니메이션이나 효과가 끝나기 전에 중지하는 데 사용된다.  
이는 슬라이딩, 페이딩, 사용자 커스텀 애니메이션을 포함한 모든 jQuery 효과에 작동한다.

<br>

&nbsp;&nbsp; **Syntax:**

&nbsp;&nbsp;&nbsp;`$(selector).stop(stopAll, goToEnd);`

- `stopAll` parameter(기본값: false)는 애니메이션 대기열도 지워야하는지의 여부를 지정한다.  
  즉, 활성 애니메이션만 중지되어 대기중인 모든 애니메이션이 나중에 수행 될 수 있다.
- `goToEnd` parameter(기본값: false)는 현재 애니메이션을 즉시 완료할지 여부를 지정한다.  
  따라서 기본적으로 `stop()`함수는 선택한 요소에서 수행되는 현재 애니메이션을 종료한다.

<br>

- **Examples 1 :**

  ```
  // #flip을 클릭하면 #panel판넬이 아래로 슬라이드 되기 시작한다.
  // 이때 원하는 타이밍에 #stop 버튼을 클릭하면 슬라이딩이 멈추게 된다.

  $(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideDown(5000);
    });

    $("#stop").click(function(){
      $("#panel").stop();
    });
  });
  ```

  URL : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_stop_slide

<br>

- **Examples 2 : With Parameters**

  ```
  $(document).ready(function(){
    $("#start").click(function(){
      $("div").animate({left: '100px'}, 5000);
      $("div").animate({fontSize: '3em'}, 5000);
    });

    $("#stop").click(function(){
      $("div").stop();
    });

    $("#stop2").click(function(){
      $("div").stop(true);
    });

    $("#stop3").click(function(){
      $("div").stop(true, true);
    });
  });
  ```

  URL : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_stop_params

  <br>
  <br>
  <br>

## 06. jQuery Callback Functions

: A callback function is executed after the current effect is 100% finished.

JavaScript문은 한 줄씩 실행된다. 그러나 효과를 사용하면 효과가 완료되지 않은 경우에도 다음 코드 줄을 실행할 수 있다.  
따라서 이로 인해 오류가 발생할 수 있기 때문에 이를 방지하기 위해 콜백 함수를 사용할 수 있다. 콜백 함수는 현재 효과가 완료된 후 실행된다.

<br>

**# Typical syntax: `$(selector).hide(speed,callback);`**

<br>

- **Examples 1 :** hide 효과가 완료된 후 실행되는 함수 인 콜백 매개 변수가 있다.

  ```
  <script>
    $(document).ready(function(){
      $("button").click(function(){
        $("p").hide("slow", function(){
          alert("The paragraph is now hidden"); // 숨김 효과가 끝나야 alert가 실행 된다.
        });
      });
    });
  </script>


  <body>
    <button>Hide</button>
    <p>This is a paragraph with little content.</p>
  </body>
  ```

<br>

- **Examples 2 :** 콜백 매개 변수가 없는 경우 hide 효과가 완료되기 전에 alert 상자가 표시된다.

  ```
  $(document).ready(function(){
    $("button").click(function(){
      $("p").hide(1000);
      alert("The paragraph is now hidden"); // 버튼 클릭시 hide효과와 함께 alert효과도 발생한다.
    });
  });
  ```

  <br>
  <br>
  <br>

## 07. jQuery Method Chaining

jQuery를 사용하면 Actions & Methods를 함께 연결할 수 있다.  
Chaining을 사용하면 단일 문 내에서 여러 jQuery Methods(동일한 element에서)를 실행할 수 있다.

즉 지금까지 우리는 한 번에 하나씩 jQuery 문을 작성했지만,  
동일한 요소에서 여러 jQuery 명령을 차례로 실행할 수 있는 'chaining'이라는 기술이 있다.

<br>

- **Tip :**  
  chaining을 사용하면 브라우저가 동일한 요소를 두 번 이상 찾을 필요가 없어진다.  
  action을 연결하려면 이전 action에 action을 추가(append)하기만 하면 된다.

- **Examples :**  
  `css()`, `slideUp()`및 `slideDown()` 메서드를 함께 연결한다.  
  `"p1"`요소는 먼저 빨간색으로 변경된 후 위로 슬라이드 되고 그 다음에 아래로 슬라이드된다.

  ```

  <script>
    $(document).ready(function(){
      $("button").click(function(){
        $("#p1").css("color", "red").slideUp(2000).slideDown(2000);
      });
    });
  </script>


  <body>
    <p id="p1">jQuery is fun!!</p>
    <button>Click me</button>
  </body>

  // 필요한 경우 더 많은 메서드 호출을 추가 할 수도 있다.
  ```

<br>

- **Tip :**
  연결시 코드 줄이 상당히 길어질 수 있다. 그러나 jQuery는 구문에서 그다지 엄격하지 않기 때문에
  줄 바꿈 및 들여 쓰기를 포함하여 원하는대로 서식을 지정할 수 있다.

  ```
  // 이렇게 작성해도 예제1과 같이 잘 작동된다.

  <script>
    $(document).ready(function(){
      $("button").click(function(){
        $("#p1").css("color", "red")
          .slideUp(2000)
          .slideDown(2000);
      });
    });
  </script>
  ```

<br>
<br>
<br>
<br>

---

### # Complete overview of all jQuery effects

URL : https://www.w3schools.com/jquery/jquery_ref_effects.asp
