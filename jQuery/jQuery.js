$(document).ready(function () {
  $(".pHide").click(function () {
    $("p").hide();
  });
});

$(document).ready(function () {
  $(".idHide").click(function () {
    $("#test").hide();
  });
});

$(document).ready(function () {
  $(".classHide").click(function () {
    $(".test").hide();
  });
});

$(document).ready(function () {
  $(".liHide").click(function () {
    $("ul li:last-child").hide();
    $("ul li:first-child").hide();
  });
});
