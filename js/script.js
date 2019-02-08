$(function () {
    var muralesURL = 'http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json'


    var map = L.map('muralsMap', {
        scrollWheelZoom: false
    }); //.setView([45.508840, -73.587810, 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/buzz/cj0pqs7cp009g2smriyh1lh6t/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnV6eiIsImEiOiJKTVUzWTFvIn0.A01VRud__gMrpKS3LzAYuw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'buzz.5rt4dtds',
        accessToken: 'pk.eyJ1IjoiYnV6eiIsImEiOiJKTVUzWTFvIn0.A01VRud__gMrpKS3LzAYuw'
    }).addTo(map);

    //var muralesLayer = L.geoJSON(murales).addTo(map);



    $.getJSON(muralesURL, function (data) {
        //        var artIcon = L.icon({
        //            iconUrl: 'images/art.png',
        //            iconSize: [10, 10]
        //        });

        var ml = L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                var m = L.marker(latlng, {
                    //                    icon: artIcon
                });
                var content = 'Artist: <b>' + feature.properties.artiste +
                    '</b><br><img height="250px" src="' + feature.properties.image +
                    '" alt="' + feature.properties.addresse + '">';

                m.bindPopup(content)
                return m;
            }
        }).addTo(map);
        map.fitBounds(ml.getBounds());
    });


})
