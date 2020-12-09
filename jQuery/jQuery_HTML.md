# jQuery - HTML

URL : https://www.w3schools.com/jquery/jquery_dom_get.asp

---

## 01. 콘텐츠(Content) 및 속성(Attributes)의 Get & Set

jQuery에는 HTML 요소 및 속성을 변경하고 조작하는 강력한 방법이 포함되어 있다.

<br>

### 1) jQuery DOM 조작

jQuery의 매우 중요한 부분 중 하나는 DOM을 조작 할 수 있다는 점이다.  
요소와 속성에 쉽게 액세스하고 조작 할 수있는 DOM 관련 메소드가 함께 제공된다.

- **DOM = Document Object Model**  
  **The DOM defines a standard for accessing HTML and XML documents:**  
  "The W3C Document Object Model (DOM) is a platform and language-neutral interface that allows programs and scripts to dynamically access and update the content, structure, and style of a document."

<br>
<br>

### 2) Get Content - `text()`, `html()`, `val()`

`text()`, `html()`, `val()`함수들은 콘텐츠를 가져오는데(Get) 사용 된다.

- `text()` : 선택한 요소의 텍스트 내용을 '설정'하거나 '반환'해준다.
- `html()` : 선택한 요소 (HTML 마크 업 포함)의 내용을 '설정'하거나 '반환'해준다.
- `val()` : 양식 필드의 값을 '설정'하거나 '반환'해준다.

<br>

- **Examples 1 : `text()`, `html()`**

  ```
  // #btn1 alert [Text: This is some bold text in a paragraph.]
  // #btn2 alert [HTML: This is some <b>bold</b> text in a paragraph.]

  $(document).ready(function(){
    $("#btn1").click(function(){
      alert("Text: " + $("#test").text());
    });
    $("#btn2").click(function(){
      alert("HTML: " + $("#test").html());
    });
  });
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_html_get_

<br>

- **Examples 2 : `val()`**

  ```
  // 버튼을 클릭하면 input에 입력한 텍스트필드(또는 value값)를 alert창에 반환해준다.

  <script>
    $(document).ready(function(){
      $("button").click(function(){
        alert("Value: " + $("#test").val());
      });
    });
  </script>


  <body>
    <p>Name: <input type="text" id="test" value="Mickey Mouse"></p>
    <button>Show Value</button>
  </body>
  ```

<br>
<br>

### 2) Set Content - `text()`, `html()`, `val()`

위와 동일한 세 가지 함수들을 사용하여 콘텐츠를 설정(Set)할 수 있다.

- **Examples : `text()`, `html()`, `val()`**

  ```
  // 각 버튼(#btn)을 클릭하면 그 버튼에 연결된 콘텐츠 내용들이 p태그(#test)에 설정된다.

  $(document).ready(function(){
    $("#btn1").click(function(){
      $("#test1").text("Hello world!");
    });
    $("#btn2").click(function(){
      $("#test2").html("<b>Hello world!</b>");
    });
    $("#btn3").click(function(){
      $("#test3").val("Dolly Duck");
    });
  });
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_html_set_

<br>
<br>

### 3) Callback Function for `text()`, `html()`, `val()`

- 함수 `text()`, `html()`, `val()`은 모두 "Callback Function"과 함께 제공된다.
- 콜백 함수에는 두 가지 매개 변수(parameter)가 있는데, 1)선택한 요소 목록에있는 현재 요소의 색인(index)과 2)원래(old)값을 다음 함수에서 새 값으로 사용할 문자열을 반환한다.

<br>

- **Examples :**

  ```
  // #btn1 -> [Old text: This is a bold paragraph. New text: Hello world! (index: 0)]
  // #btn2 -> [Old html: This is another bold paragraph. New html: Hello world! (index: 0)]

  $(document).ready(function(){
    $("#btn1").click(function(){
      $("#test1").text(function(i, origText){
        return
        "Old text: " + origText +
        " New text: Hello world!
        (index: " + i + ")";
      });
    });

    $("#btn2").click(function(){
      $("#test2").html(function(i, origText){
        return
        "Old html: " + origText +
        " New html: Hello <b>world!</b>
        (index: " + i + ")";
      });
    });
  });
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_html_callback_

<br>
<br>

### 4) Get Attributes - `attr()`

`attr()` 함수는 속성 값을 가져 오는 데 사용된다.

- **Examples : `attr()`함수로 링크에서 `"href"`속성 값을 가져 오는 방법을 확인할 수 있다.**

  ```
  // #w3s alert [https://www.w3schools.com]

  <script>
    $(document).ready(function(){
      $("button").click(function(){
        alert($("#w3s").attr("href"));
      });
    });
  </script>


  <body>
    <p><a href="https://www.w3schools.com" id="w3s">W3Schools.com</a></p>
    <button>Show href Value</button>
  </body>
  ```

<br>
<br>

### 5) Set Attributes - `attr()`

`attr()` 함수는 속성 값을 설정 & 변경하는데에도 사용된다.

- **Examples :**

  ```
  // 버튼을 클릭하고 나면 href의 주소(링크접속시 확인)와 title이 변경(마우스hover로 확인)되는 것을 확인할 수 있다.

  $(document).ready(function(){
    $("button").click(function(){
      $("#w3s").attr({
        "href" : "https://www.w3schools.com/jquery/",
        "title" : "W3Schools jQuery Tutorial"
      });
    });
  });
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_attr_set2_

<br>
<br>
<br>
<br>

## 02. 새로운 요소(Elements) 및 콘텐츠(Content)의 추가(Add)

jQuery를 사용하면 새로운 요소 및 콘텐츠를 쉽게 추가 할 수 있다.  
새 콘텐츠를 추가하는 데 사용되는 4개의 함수들은 아래와 같다.

- `append()` : 선택한 요소의 끝에 콘텐츠 삽입
- `prepend()` : 선택한 요소의 시작 부분에 콘텐츠 삽입
- `after()` : 선택한 요소 바로 뒤에 콘텐츠 삽입
- `before()` : 선택한 요소 바로 앞에 콘텐츠 삽입

<br>

### 1) append() Method

`append()`함수는 선택한 HTML 요소의 끝에 콘텐츠를 삽입한다.

- **Examples :**

  ```
  // #btn1 -> [This is a paragraph. 'Appended text.']

  $(document).ready(function(){
    $("#btn1").click(function(){
      $("p").append(" <b>'Appended text'</b>."); // "p" 요소의 끝에 삽입 된다.
    });

    $("#btn2").click(function(){
      $("ol").append("<li>Appended item</li>"); // "ol" 요소의 끝에 삽입된다.
    });
  });
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_append_

<br>
<br>

### 2) prepend() Method

`append()`함수는 선택한 HTML 요소의 시작 부분에 콘텐츠를 삽입한다.

- **Examples :**

  ```
  // #btn1 -> ['Prepended text.' This is a paragraph.]

  $(document).ready(function(){
    $("#btn1").click(function(){
      $("p").prepend("<b>'Prepended text</b>.' "); // "p" 요소의 맨 앞에 삽입 된다.
    });

    $("#btn2").click(function(){
      $("ol").prepend("<li>Prepended item</li>"); // "ol" 요소의 맨 앞에 삽입된다.
    });
  });
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_prepend_

<br>
<br>

### 3) append() & prepend() 함수를 사용해서 여러가지 요소를 추가하기

위의 두 가지 예제에서는 선택한 HTML 요소의 시작이나 끝 부분에 일부 텍스트 또는 HTML만 삽입했다.  
그러나 `append()`및 `prepend()`함수는 무한한 수의 새 요소를 매개 변수로 사용할 수 있다.  
새로운 Element는 텍스트나 HTML, jQuery 또는 JavaScript 코드 및 DOM 요소를 사용하여 생성 할 수 있다.

- **Examples :**

  ```
  function appendText() {
    var txt1 = "<p>Text.</p>";  // Create text with HTML
    var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
    var txt3 = document.createElement("p");

    txt3.innerHTML = "Text.";  // Create text with DOM
    $("body").append(txt1, txt2, txt3);  // Append new elements
  }

  function prependText() {
    var txt1 = "<p>Text.</p>";        // Create text with HTML
    var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
    var txt3 = document.createElement("p");

    txt3.innerHTML = "Text.";         // Create text with DOM
    $("body").prepend(txt1, txt2, txt3);   // Append new elements
  }


  <button onclick="appendText()">Append text</button>
  <button onclick="prependText()">Prepend text</button>
  ```

  _url : https://www.w3schools.com/code/tryit.asp?filename=GLBQZBQW1XQR_

<br>
<br>

### 4) after() & before() 함수를 사용해서 여러가지 요소를 추가하기

`after()`및 `before()` 함수는 무한한 수의 새 요소를 매개 변수로 사용할 수 있다.  
새로운 Element는 텍스트나 HTML, jQuery 또는 JavaScript 코드 및 DOM 요소를 사용하여 생성 할 수 있다.

- **Examples 1 :**

  ```
  // afterText버튼 클릭시 img의 뒤에 "After"텍스트 삽입
  // beforeText버튼 클릭시 img의 앞에 "Before"텍스트 삽입

  $(document).ready(function(){
    $("#btn1").click(function(){
      $("img").before("<b>Before</b>");
    });

    $("#btn2").click(function(){
      $("img").after("<i>After</i>");
    });
  });


  <button onclick="afterText()">Insert after</button>
  <button onclick="beforeText()">Insert before</button>
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_after_

  <br>

- **Examples 2 :**

  ```
  // afterText버튼 클릭시 img의 뒤에 txt1, txt2, txt3("love jQuery!") 삽입
  // beforeText버튼 클릭시 img의 앞에 txt1, txt2, txt3("love jQuery!") 삽입

  function afterText() {
    var txt1 = "<b>I </b>";  // Create element with HTML
    var txt2 = $("<i></i>").text("love "); // Create with jQuery
    var txt3 = document.createElement("b");  // Create with DOM

    txt3.innerHTML = "jQuery!";
    $("img").after(txt1, txt2, txt3);  // Insert new elements after img
  }

  function beforeText() {
    var txt1 = "<b>I </b>";  // Create element with HTML
    var txt2 = $("<i></i>").text("love ");  // Create with jQuery
    var txt3 = document.createElement("b");  // Create with DOM

    txt3.innerHTML = "jQuery!";
    $("img").before(txt1, txt2, txt3);  // Insert new elements after img
  }


  <button onclick="afterText()">Insert after</button>
  <button onclick="beforeText()">Insert before</button>
  ```

  _url : https://www.w3schools.com/code/tryit.asp?filename=GLBR9ZRNSGDK_

<br>
<br>
<br>
<br>

## 03. Remove Elements & Content

아래 함수들을 사용하면 기존 HTML 요소와 컨텐츠를 쉽게 제거 할 수 있다.

- `remove()` : 선택한 요소(및 하위 요소)를 모두 제거 한다.
- `empty()` : 선택한 요소에서 하위 요소(child element)만 제거 한다.

<br>

- **Examples : `remove()`**

  `remove()`함수는 제거 할 요소를 필터링 할 수 있는 하나의 매개 변수(selector구문)도 허용한다.

  ```
  // 버튼 클릭시 test와 demo클래스가 포함된 요소는 모두 삭제한다.

  $(document).ready(function(){
    $("button").click(function(){
      $("p").remove(".test, .demo");
    });
  });


  <p class="save">This is p element with class="save".</p> // save클래스는 삭제되지 않음.
  <p class="test">This is p element with class="test".</p>
  <p class="test">This is p element with class="test".</p>
  <p class="demo">This is p element with class="demo".</p>
  <p class="demo">This is p element with class="demo".</p>
  ```

<br>

- **Examples : `empty()`**

  ```
  // 버튼을 클릭하면 #div1 박스는 삭제되지 않고 #div1의 자식 요소인 p태그들만 삭제된다.

  $(document).ready(function(){
    $("button").click(function(){
      $("#div1").empty();
    });
  });


  <div id="div1" style="height:100px;width:300px;border:1px solid black;background-color:yellow;">
    <p>This is a paragraph in the div.</p>
    <p>This is another paragraph in the div.</p>
  </div>
  ```

<br>
<br>
<br>
<br>

## 04. Get and Set CSS Classes

jQuery를 사용하면 요소의 스타일을 쉽게 조작 할 수 있다.

<br>

### 1) Manipulating CSS

- `addClass()` : 선택한 요소에 '하나 이상의 클래스를 추가'해준다.
- `removeClass()` : 선택한 요소에서 '하나 이상의 클래스를 제거'해준다.
- `toggleClass()` : 선택한 요소에서 클래스 '추가 및 제거'를 전환한다.
- `css()` : 스타일 속성을 설정하거나 반환해준다.

<br>

- **Example Stylesheet : 공통 예제 스타일 시트**

  ```
  .important {
    font-weight: bold;
    font-size: xx-large;
  }

  .blue {
    color: blue;
  }
  ```

<br>
<br>

### 2) addClass() Method

다음 예제는 `addClass()`함수로 다른 요소에 클래스 속성을 추가하는 방법을 보여준다.  
물론 class를 추가 할 때 여러 요소를 선택할 수 있고 addClass()함수 내에서 여러 class를 지정할 수도 있다.

- **Example :**

  ```
  // 버튼을 클릭하면 #div1 요소에 important와 blue클래스 모두 적용된다.

  $(document).ready(function(){
    $("button").click(function(){
      $("#div1").addClass("important blue");
    });
  });


  <div id="div1">This is some text.</div>
  <div id="div2">This is some text.</div>
  <br>
  <button>Add classes to first div element</button>
  ```

<br>
<br>

### 3) removeClass() Method

다음 예제는 `removeClass()`함수로 다른 요소에서 특정 클래스 속성을 제거하는 방법을 보여 준다.

- **Example :**

  ```
  // 버튼을 클릭하면 해당 element들은 blue클래스가 제거 되고 검은색으로 변한다.

  $(document).ready(function(){
    $("button").click(function(){
      $("h1, h2, p").removeClass("blue");
    });
  });


  <h1 class="blue">Heading 1</h1>
  <h2 class="blue">Heading 2</h2>
  <p class="blue">This is a paragraph.</p>

  <button>Remove class from elements</button>
  ```

<br>
<br>

### 4) toggleClass() Method

다음 예제는 `toggleClass()` 함수를 사용하는 방법을 보여준다.  
이 함수는 선택한 요소에서 클래스의 추가 & 제거 사이를 전환시켜 준다.

- **Example :**

  ```
  // 버튼을 클릭할 때마다 blue 클래스의 적용 및 제거를 반복한다.

  $(document).ready(function(){
    $("button").click(function(){
      $("h1, h2, p").toggleClass("blue");
    });
  });


  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <p>This is a paragraph.</p>
  <p>This is another paragraph.</p>

  <button>Toggle class</button>
  ```

<br>
<br>

### 5) css() Method

`css()`함수는 선택한 요소에 대해 하나 이상의 스타일 속성을 설정하거나 반환한다.

<br>

- #### Return a CSS Property

  지정된 CSS 속성의 값을 반환하려면 `css("propertyname");`구문을 사용합니다.

  - **Example :**

    ```
    // 버튼을 클릭하면 '첫번째'로 일치하는 element의 배경색 값을 반환한다.

    $(document).ready(function(){
      $("button").click(function(){
        alert("Background color = " + $("p").css("background-color"));
      });
    });


    <p style="background-color:#ff0000">This is a paragraph.</p>
    <p style="background-color:#00ff00">This is a paragraph.</p>
    <button>Return background-color of p</button>
    ```

<br>

- #### Set a CSS Property

  지정된 CSS 속성을 설정하려면 `css("propertyname","value");` 구문을 사용한다.

  - **Example :**

    ```
    // 버튼을 클릭하면 각기 다른 색상이 지정된 p태그들이 yellow속성으로 설정된다.

    $(document).ready(function(){
      $("button").click(function(){
        $("p").css("background-color", "yellow");
      });
    });


    <p style="background-color:#ff0000">This is a paragraph.</p>
    <p style="background-color:#00ff00">This is a paragraph.</p>
    <p style="background-color:#0000ff">This is a paragraph.</p>
    <p>This is a paragraph.</p>
    <button>Set background-color of p</button>
    ```

<br>

- #### Set Multiple CSS Properties

  여러가지 CSS 속성을 설정하려면 `css({"propertyname":"value","propertyname":"value",...});` 구문을 사용한다.

  - **Example :**

    ```
    // 버튼을 클릭하면 p태그들의 속성이 yellow로 변하고 동시에 font-size도 200%로 커진다.

    $(document).ready(function(){
      $("button").click(function(){
        $("p").css({"background-color": "yellow", "font-size": "200%"});
      });
    });
    ```

    _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_css_set_multiple_

<br>
<br>
<br>
<br>

## 05. Dimensions(치수)

jQuery를 사용하면 요소 및 브라우저 창의 크기로 작업하기가 쉬워진다.

<br>

### 1) Dimension 함수의 종류

- width()
- height()
- innerWidth()
- innerHeight()
- outerWidth()
- outerHeight()

![jquery-width-height](https://user-images.githubusercontent.com/67410919/101134332-8d8ad600-364d-11eb-9902-547a7feb40d7.png)

<br>
<br>

### 2) width() and height() Methods

- `width()` 함수는 padding, border, margin값을 '제외'한 요소의 너비를 설정하거나 반환한다.
- `height()` 함수는 padding, border, margin값을 '제외'한 요소의 높이를 설정하거나 반환한다.

  <br>

  - **Example :**

    ```
    // 버튼을 클릭하면 txt에 #div1 스타일의 width(300), height(100) 정보가 출력된다.

    $(document).ready(function(){
      $("button").click(function(){
        var txt = "";
        txt += "Width of div: " + $("#div1").width() + "</br>";
        txt += "Height of div: " + $("#div1").height();
        $("#div1").html(txt);
      });
    });


    //아래 예제들과 동일
    #div1 {
      height: 100px;
      width: 300px;
      padding: 10px; // padding, margin 등의 속성은 제외된다.
      margin: 3px;
      border: 1px solid blue;
      background-color: lightblue;
    }

    <div id="div1"></div>
    <button>Display dimensions of div</button>
    ```

<br>
<br>

### 3) innerWidth() and innerHeight() Methods

- `innerWidth()` 함수는 'padding값을 포함'한 요소의 너비를 반환한다.
- `innerHeight()` 함수는 'padding값을 포함'한 요소의 높이를 반환한다.

  <br>

  - **Example :**

    ```
    // 버튼을 클릭하면 txt에 #div1 스타일의 innerWidth(320), innerHeight(120) 정보가 출력된다.

    $(document).ready(function(){
      $("button").click(function(){
        var txt = "";
        txt += "Inner width of div: " + $("#div1").innerWidth() + "</br>";
        txt += "Inner height of div: " + $("#div1").innerHeight();
        $("#div1").html(txt);
      });
    });
    ```

<br>
<br>

### 4) outerWidth() and outerHeight() Methods

- `outerWidth()` 함수는 padding, border값을 포함한 요소의 너비를 반환한다.
- `outerHeight()` 함수는 padding, border값을 포함한 요소의 높이를 반환한다.
- `outerWidth(true)` 함수는 padding, border, margin값을 모두 포함한 요소의 너비를 반환한다.
- `outerHeight(true)` 함수는 padding, border, margin값을 모두 포함한 요소의 높이를 반환한다.

  <br>

  - **Example :**

    ```
    // 버튼을 클릭하면 txt에 #div1 스타일의 outerWidth(322), outerWidth(122) 정보(padding, border값 포함)와
    // outerWidth(true)로 인해 추가로 margin값 까지 포함된 outerWidth(328), outerWidth(128) 정보가 출력된다.

    $(document).ready(function(){
      $("button").click(function(){
        var txt = "";
        txt += "Outer width of div: " + $("#div1").outerWidth() + "</br>";
        txt += "Outer height of div: " + $("#div1").outerHeight()+ "</br>";

        txt += "Outer width of div (margin included): " + $("#div1").outerWidth(true) + "</br>";
        txt += "Outer height of div (margin included): " + $("#div1").outerHeight(true);

        $("#div1").html(txt);
      });
    });
    ```

  <br>
  <br>
  <br>
  <br>

---

### # Complete overview of all jQuery HTML methods

URL : https://www.w3schools.com/jquery/jquery_ref_html.asp
