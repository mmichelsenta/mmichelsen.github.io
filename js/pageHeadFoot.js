$.ajaxSetup({async:false});
$.get("/js/header.html", function(data){header = data;}, "text");
main = $("body").html().split("</main>")[0] + "</main>";
$.get("/js/footer.html", function(data){footer = data;}, "text");
$("body").html(header + main + footer);
$.ajaxSetup({async:true});
