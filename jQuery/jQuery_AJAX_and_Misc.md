# jQuery - AJAX

URL : https://www.w3schools.com/jquery/jquery_ajax_intro.asp

---

## 01. AJAX Introduction

**AJAX = Asynchronous Javascript And XML**

AJAX는 서버와 데이터를 교환하고 전체 페이지를 다시로드하지 않고 웹 페이지의 일부를 업데이트하는 기술이다.  
간단히 말해서 AJAX는 전체 페이지를 다시로드하지 않고 백그라운드에서 데이터를로드하고 웹 페이지에 표시하는 것이다.  
AJAX를 사용하는 애플리케이션의 예 : Gmail, Google지도, Youtube, Facebook...

<br>

_AJAX tutorial : https://www.w3schools.com/xml/ajax_intro.asp_

<br>
<br>
<br>

## 02. AJAX Load

### 1) AJAX load() Method

`load()` 함수는 간단하지만 강력한 AJAX Method이다.  
이 `load()` 함수는 서버에서 데이터를 로드하고 반환 된 데이터를 선택한 요소에 넣어준다.

&nbsp;&nbsp; **Syntax:**

&nbsp;&nbsp;&nbsp; `$(selector).load(URL, data, callback);`

- 필수 요소인 URL Method는 로드 할 URL을 지정한다.
- 선택적 요소인 data Method는 요청과 함께 전송할 쿼리 문자열 key/value(키와 값) 한쌍의 집합을 지정한다.
- 선택적 요소인 callback Method는 `load()`Method가 완료된 후 실행할 함수의 이름이다.

<br>
<br>

- **Examples 1 :**

  버튼을 클릭하면 `#div1`의 문구가 `load("demo_test.txt #p1")`의 url에 접속하여 `#p1`내용을 가져와 변경시켜 준다.

  ```
  <script>
    $(document).ready(function(){
      $("button").click(function(){
        $("#div1").load("demo_test.txt #p1");
      });
    });
  </script>


  <div id="div1"><h2>Let jQuery AJAX Change This Text</h2></div>
  <button>Get External Content</button>
  ```

<br>
<br>

- **Examples 2 :**

  callback 매개 변수는 `load()`함수가 완료 될 때 실행할 콜백 함수를 지정해준다.  
  또 callback 함수는 다른 매개 변수를 가질 수 있다.

  - responseTxt : 호출이 성공한 경우 결과를 콘텐츠에 포함시켜 준다.
  - statusTxt : 통화 상태를 포함시켜 준다.
  - xhr : XMLHttpRequest 객체를 포함시켜 준다.

  ```
  <script>
    $(document).ready(function(){
      $("button").click(function(){
        $("#div1").load("demo_test.txt", function(responseTxt, statusTxt, xhr){
          if(statusTxt == "success")
            alert("External content loaded successfully!");
          if(statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
      });
    });
  </script>


  <div id="div1"><h2>Let jQuery AJAX Change This Text</h2></div>
  <button>Get External Content</button>
  ```

  위의 예제에서는 `load()` 함수가 완료된 후 경고 상자를 표시해 준다.  
  if에서 load()가 성공한 경우 "외부 콘텐츠가 성공적으로 로드 됨"을 표시하도록하고  
  실패 할 경우 오류 메시지가 표시되도록 하는 소스이다.

<br>
<br>
<br>

## 03. AJAX Get & Post

### 1) AJAX get() and post() Methods

`get()`과 `post()` 함수는 HTTP GET 또는 POST 요청을 통해 서버에서 데이터를 요청하는 데 사용된다.

<br>

#### # HTTP Request : GET vs POST

클라이언트와 서버 간의 요청과 응답에 일반적으로 사용되는 두 가지 방법은 GET 및 POST가 있다.

- **GET**
  지정된 리소스에서 데이터를 요청 한다.
  get은 기본적으로 서버에서 일부 데이터를 가져 오는 데 사용되며, get 메서드는 캐시 된 데이터를 반환 할 수 있다.

  <br>

- **POST**
  처리 할 데이터를 지정된 리소스에 제출 한다.
  post를 사용하여 서버에서 일부 데이터를 가져올 수도 있다. 그러나 post 메서드는 데이터를 캐시하지 않으며 요청과 함께 데이터를 보내는 데 자주 사용된다.

  <br>

  _Learn More : https://www.w3schools.com/tags/ref_httpmethods.asp_

<br>
<br>

### 2) $.get() Method

`$.get()` 함수는 HTTP GET요청으로 서버의 데이터를 요청한다.

<br>

&nbsp;&nbsp; **Syntax:**

&nbsp;&nbsp;&nbsp; `$.get(URL, callback);`

- 필수 요소인 URL 매개 변수는 요청하려는 URL을 지정한다.
- 선택적 요소인 콜백 매개 변수는 요청이 성공할 경우 실행할 함수의 이름이다.

<br>
<br>

- **Examples 1 :**

  ```
  <script>
    $(document).ready(function(){
      $("button").click(function(){
        $.get("demo_test.asp", function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
        });
      });
    });
  </script>

  <button>Send an HTTP GET request to a page and get the result back</button>

  * alert : [This is some text from an external ASP file.] [Status: success]
  ```

  위 예제에서는 `$.get()` Method를 사용하여 서버의 파일에서 데이터를 검색한다.  
  `$.get()`가 요청하려는 첫 번째 매개 변수는 URL("demo_test.asp")이다.  
  두 번째 매개 변수는 콜백 함수로 첫 번째 콜백 매개 변수에서 '요청 된 페이지의 콘텐츠'를 보유하고, 두 번째 콜백 매개 변수는 '요청 상태를 보유'한다.

  <br>

  **Tip : ASP 파일("demo_test.asp")의 모양**

  ```
  <%
    response.write("This is some text from an external ASP file.")
  %>
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_ajax_get_

<br>
<br>

### 3) $.post() Method

`$.post()` 함수는 HTTP POST요청을 사용하여 서버에서 데이터를 요청한다.

<br>

&nbsp;&nbsp; **Syntax:**

&nbsp;&nbsp;&nbsp; `$.post(URL, data, callback);`

- 필수 요소인 URL 매개 변수는 요청하려는 URL을 지정한다.
- 선택적 요소인 data 매개 변수는 요청과 함께 보낼 일부 데이터를 지정한다.
- 선택적 요소인 콜백 매개 변수는 요청이 성공할 경우 실행할 함수의 이름이다.

<br>
<br>

- **Examples 1 :**

  ```
  <script>
    $(document).ready(function(){
      $("button").click(function(){
        $.post("demo_test_post.asp",
        {
          name: "Donald Duck",
          city: "Duckburg"
        },
        function(data,status){
          alert("Data: " + data + "\nStatus: " + status);
        });
      });
    });
  </script>

  <button>Send an HTTP POST request to a page and get the result back</button>

  * alert : [Dear Donald Duck. Hope you live well in Duckburg.] [Status: success]
  ```

  위 예제에서는 `$.post()`메서드를 사용하여 요청과 함께 일부 데이터를 보내준다.  
  `$.post()`함수로 요청하려는 첫 번째 매개 변수는 URL("demo_test_post.asp")이다.  
  그런 다음 요청(이름 및 도시)과 함께 보낼 데이터를 전달해 준다.  
  `"demo_test_post.asp"`의 ASP 스크립트는 매개 변수를 읽고 처리 한 다음 결과를 반환해 준다.  
  세 번째 매개 변수는 콜백 함수로 첫 번째 콜백 매개 변수는 '요청 된 페이지의 콘텐츠를 보유'하고 두 번째 콜백 매개 변수는 '요청 상태를 보유'합니다.

  <br>

  **Tip : ASP 파일("demo_test_post.asp")의 모양**

  ```
  <%
    dim fname,city
    fname=Request.Form("name")
    city=Request.Form("city")
    Response.Write("Dear " & fname & ". ")
    Response.Write("Hope you live well in " & city & ".")
  %>
  ```

  _url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_ajax_post_

<br>
<br>
<br>

### # Complete overview of all jQuery AJAX methods

URL : https://www.w3schools.com/jquery/jquery_ref_ajax.asp

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# jQuery - AJAX Misc(ETC)

URL : https://www.w3schools.com/jquery/jquery_noconflict.asp

---

## 01. jQuery - The noConflict()

jQuery를 사용하는 동시에 페이지에서 다른 프레임 워크를 사용하기 위한 방법

<br>

#### # jQuery and Other JavaScript Frameworks

jQuery는 `$`기호를 jQuery의 바로 가기로 사용하고 있다.  
하지만 Angular, Backbone, Ember, Knockout 등과 같은 다른 많은 인기있는 JavaScript 프레임 워크에서  
`$`기호를 바로 가기로 사용하면(두 개의 다른 프레임 워크가 동일한 바로 가기를 사용하는 경우) 그 중 하나가 작동을 멈출 수 있다.  
그래서 jQuery는 이를 방지하기 위해 noConflict()방법을 구현하였다.

<br>
<br>

### 1) noConflict() Method

<br>

- **Examples 1 :**

  ```
  // 버튼을 클릭하면 "jQuery is still working!"문구가 p태그에 입력된다.

  <script>
    $.noConflict();

    jQuery(document).ready(function() {
      jQuery("button").click(function() {
        jQuery("p").text("jQuery is still working!");
      });
    });
  </script>


  <p>This is a paragraph.</p>
  <button>Test jQuery</button>
  ```

  위 예제의 `noConflict()` 함수는 바로 가기 식별자 `$`에 대한 보류를 해제하므로 다른 스크립트에서 사용할 수 있다.  
  물론 바로 가기 대신 전체 이름을 작성하여 jQuery를 계속 사용할 수 있다.

<br>

- **Examples 2 :**

  ```
  <script>
    var jq = $.noConflict();

    jq(document).ready(function(){
      jq("button").click(function(){
        jq("p").text("jQuery is still working!");
      });
    });
  </script>
  ```

  또 위 예제 처럼 자신 만의 바로 가기를 매우 쉽게 만들 수도 있다.  
  `noConflict()` 함수는 나중에 사용할 수 있도록 변수에 저장할 수있는 jQuery에 대한 참조를 반환한다.

<br>

- **Examples 3 :**

  ```
  <script>
    $.noConflict();

    jQuery(document).ready(function($){
      $("button").click(function(){
        $("p").text("jQuery is still working!");
      });
    });
  </script>
  ```

  `$` 바로 가기를 사용하는 jQuery 코드 블록이 있는데 모두 변경하지 않으려면, `$`sign을 매개 변수로 ready 메소드에 전달하면 된다.  
  이 기능을 사용하면 `$`를 사용하여 jQuery에 액세스할 수 있으며 외부에서는 "jQuery"를 사용해야 한다.

<br>
<br>
<br>

## 01. jQuery - Filters

jQuery를 사용하여 특정 요소를 필터링 또는 검색한다.

<br>

### 1) Filter Tables

'테이블의 항목'에 대해 대소 문자를 구분하지 않는 '검색 기능'을 구현해보자

<br>

- **Examples :**

  ```
  <script>
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  </script>


  <h2>Filterable Table</h2>
  <input id="myInput" type="text" placeholder="Search.."> // input의 텍스트 필드를 받아 "#myTable tr"에서 검색기능을 수행한다.
  <br><br>

  <table>
    <thead> // 표 제목들
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>

    <tbody id="myTable"> // 표 내용들
      <tr>
        <td>John</td> // 예를 들어 input에 john을 검색하면 해당 내용이 출력된다.
        <td>Doe</td>
        <td>john@example.com</td> // input에 example을 검색하면 해당 내용이 출력된다.
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@mail.com</td> // input에 com을 검색하면 모든 내용이 출력된다(모든 메일에 .com이 들어가므로)
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@greatstuff.com</td>
      </tr>
      <tr>
        <td>Anja</td>
        <td>Ravendale</td>
        <td>a_r@test.com</td>
      </tr>
    </tbody>
  </table>
  ```

  **Example explained:**

  - 각 테이블 행을 반복하여 입력 필드의 값과 일치하는 텍스트 값이 있는지 확인한다.
  - `toggle()`함수의 기능은 검색과 일치하지 않는 행을 'display:none'으로 숨겨준다.
  - `toLowerCase()`함수는 DOM메소드를 사용하여 텍스트를 소문자로 변환하여 검색 대소 문자를 구분하지 않게 해준다.

  - url : https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_filters_table

<br>
<br>

### 2) Filter Lists

'목록의 항목'에 대해 대소 문자를 구분하지 않는 '검색 기능'을 구현해보자.

<br>

- **Examples :**

  ```
  <script>
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myList li").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  </script>


  <h2>Filterable List</h2>
  <input id="myInput" type="text" placeholder="Search..">  // input의 텍스트 필드를 받아 "#myList li"내에서 검색기능을 수행한다.
  <br>

  <ul id="myList">  // 목록(list)
    <li>First item</li>  // first를 input에 검색하면 해당 내용이 출력 된다.
    <li>Second item</li>
    <li>Third item</li>
    <li>Fourth</li>
  </ul>
  ```

<br>
<br>

### 2) Filter Anything

'div 요소 내의 텍스트'에 대해 대소 문자를 구분하지 않는 '검색 기능'을 구현해보자

<br>

- **Examples :**

  ```
  <script>
  $(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myDIV *").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
  </script>


  <h2>Filter Anything</h2>
  <input id="myInput" type="text" placeholder="Search..">  // input의 텍스트 필드를 받아 "#myDIV"의 모든 내용을 검색한다.

  <div id="myDIV">
    <p>I am a paragraph.</p>
    <div>I am a div element inside div.</div>  // div나 inside 등을 검색하면 해당 내용이 출력된다.
    <button>I am a button</button>  // button을 검색하면 해당 내용이 출력된다.
    <button>Another button</button>
    <p>Another paragraph.</p>
  </div>
  ```

<br>
<br>
<br>
<br>

### # Complete overview of all jQuery Misc methods

URL : https://www.w3schools.com/jquery/jquery_ref_misc.asp
