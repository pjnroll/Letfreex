﻿function nowvideoExtract(id, success, error) {
    cordovaHTTP.headers = [];
    cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
    
    cordovaHTTP.get("http://embed.nowvideo.sx/embed/?v=" + id , {}, {}, function (response) {
        console.log(response);

        var patt = new RegExp('<source src="([^<]+)"', 'gi');
        var url = "";
        var found = false;
        while (matches = patt.exec(response.data)) {
            url = matches[1];
            found = true;
        }

        try {
            if (matches == null) {
                url = response.data.split("src: '")[1].split("',")[0];
                url = url.split("dash/")[1].split("/")[0],
                url = "http://www.nowvideo.sx/download.php?file=mm" + url + ".mp4";
                found = true;
            }
        } catch (e) {
        }

        if(found)
            success(url);
        else
            error("Not found");

    }, function (response) {
        error(response);
    });
}