$(document).ready(function () {
    $("#random").on('click', function () {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
    });

    $('input[name=search]').keyup(function (e) {
        if (e.keyCode == 13) {
            triggerSearch();
        }
    });
    $("input[name=submit]").on('click', function () {
        triggerSearch();
    });

    function triggerSearch() {
        var input = $("input[name=search]").val();
        if (input) { search(input); }
    }

    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
    var cb = "&format=json&callback=?";

    function search(input) {
        var apiURL = url + input + cb;
        $.ajax({
                url: apiURL,
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data, status, jqXHR) {
                    var res = $(".results")
                    res.html(" ");
                    res.append(`<h1>You searched "${data[0]}"</h1> `)
                    var len = data[1].length;
                    for (var i = 0; i < len; i++) {
                        res.append(`
                			<section>
                				<h3>
                					<a href="${data[3][i]}">${data[1][i]}</a>
                				</h3>
                			<p>
                				${data[2][i]}
                			</p>
                			`)
                    }
                    if (len == 0) {
                        res.append("<h2>The term you searched didn't provide any results. Try again.");
                    }
                }
            })
            .done(function () {
                console.log("Sucess");
            })
            .fail(function () {
                console.log("Error");
            })
            .always(function () {
                console.log("Complete");
            })
    }

})