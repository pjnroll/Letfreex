function playByUrl() {
    $("#singleLink").html("");
    $("#singleLink").removeClass("hidden");
    $("#welcome").addClass("hidden");
    $('#bs-example-navbar-collapse-1').collapse('hide');

    swal({
        background: 'rgba(0, 0, 0, 0.568627)',
        title: 'Inserisci l\'indirizzo del video',
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: '#d9941e',
        cancelButtonText: 'Annulla',
        allowOutsideClick: false,
        inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
                    resolve();
            });
        }
    }).then(function (result) {
        manageSingleLink(result);
    }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
            goToHome();
        }
    });
    setTimeout(function () {
        $('.dropdown-toggle').html('<span id="menuDropDownLabel" >Gestione canali </span><span class="caret"></span>');
    }, 1);
}

function manageSingleLink(html) {
    var trovato = false;
    for (var i = 0; i < movieHostsOneLink.length; i++) {
        var patt = new RegExp(movieRegexHostsOneLink[i], 'gi');

        var host = movieHostsOneLink[i].split('|')[1];

        if (!host)
            host = movieHostsOneLink[i];

        while (res = patt.exec(html)) {
            console.log('trovato ' + res[1]);
            var link = "<div class=\"guarda singleLinkPlay\"  >" +
                            "<img class=\"poster play\" onclick=\"chooseHost($(this).parent())\" src=\"img/play_button.png\" />" +
                            "<div  class=\"hidden marginBottom10\" host onclick=\"openVideo('" + movieHostsOneLink[i] + "','" + res[1] + "', false)\"><img width=\"200\" src=\"img/host/" + host + ".png\"></div>";
            $('#singleLink').html($('#singleLink').html() + link + "</div>");
            trovato = true;
        }
    }
    if (!trovato)
        $("#singleLink").html("Nessun video trovato al link " + html);
}