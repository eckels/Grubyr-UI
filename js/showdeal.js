var socket = io.connect("http://localhost:3000");
var userCity = "";
var cityFilled = false;
var foodCount = [];

socket.on("showDeals", function(data)
{
    document.getElementById("sidebar").innerHTML = "<h1> Deals Near You </h1>";

    foodCount = data.slice(0);

    foodCount.forEach(function(element)
        {
            if(element.city.toLowerCase() == userCity.toLowerCase())
               {
                    var div = document.createElement("div");

                    div.className = "item";

                    div.innerHTML = "<div class='item'><div class='item-vote'><img src='img/arrow.svg' alt='upvote' class='upvote'><p class='vote-num'>" + element.votes + "</p><img src='img/arrow.svg' alt='downvote' class='downvote'></div><img src='" + element.image + "' class='item-img' alt=''><div class='item-center'><div class='item-left'><h3 class='item-name'>" + element.name + "</h3><p class='item-desc'>" + element.deal + "</p></div><div class='item-right'><p class='item-distance-num'>0.3</p><p class='item-dist-end'>Miles</p></div></div></div>"

                    div.addEventListener("click", function()
                        {
                            socket.emit("upvote", element);
                        });

                    document.getElementById("sidebar").appendChild(div);


               }
        });
});

socket.on("addFood", function(data)
{

    if(data.city.toLowerCase() == userCity.toLowerCase())
       {

            foodCount.push(data);
            var div = document.createElement("div");
            div.className = "item";

              div.innerHTML = "<div class='item'><div class='item-vote'><img src='img/arrow.svg' alt='upvote' class='upvote'><p class='vote-num'>" + data.votes + "</p><img src='img/arrow.svg' alt='downvote' class='downvote'></div><img src='" + data.image + "' class='item-img' alt=''><div class='item-center'><div class='item-left'><h3 class='item-name'>" + data.name + "</h3><p class='item-desc'>" + data.deal + "</p></div><div class='item-right'><p class='item-distance-num'>0.3</p><p class='item-dist-end'>Miles</p></div></div></div>"

            div.addEventListener("click", function()
                {
                    socket.emit("upvote", data);
                });

            document.getElementById("sidebar").appendChild(div);
       }

        });

socket.on("upvote", function(data)
{
    document.getElementById("sidebar").innerHTML = "<h1> Deals Near You </h1>";
    foodCount = data.slice(0);
    foodCount.forEach(function(element)
        {
            var div = document.createElement("div");
            div.className = "item";

            div.innerHTML = "<div class='item'><div class='item-vote'><img src='img/arrow.svg' alt='upvote' class='upvote'><p class='vote-num'>" + element.votes + "</p><img src='img/arrow.svg' alt='downvote' class='downvote'></div><img src='" + element.image + "' class='item-img' alt=''><div class='item-center'><div class='item-left'><h3 class='item-name'>" + element.name + "</h3><p class='item-desc'>" + element.deal + "</p></div><div class='item-right'><p class='item-distance-num'>0.3</p><p class='item-dist-end'>Miles</p></div></div></div>"
            div.addEventListener("click", function()
            {
                socket.emit("upvote", element);
            });

            document.getElementById("sidebar").appendChild(div);
        });
});







(function() {

	window.onload = function() {



    var map = new google.maps.Map(document.getElementById("map"), {

          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0052ff"
            },
            {
                "gamma": "0.57"
            },
            {
                "lightness": "26"
            },
            {
                "saturation": "54"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3f3f3f"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f3f3f3"
            },
            {
                "weight": "1.57"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0563C1"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#5880f4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#0a41cb"
            }
        ]
    }
]
        });

        var geocoder = new google.maps.Geocoder;


            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude - .12
              };
              map.setCenter(pos);

              var realCoords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              geocoder.geocode({'location': realCoords}, function(results, status) {
                if (status === 'OK') {

                  userCity = results[0].address_components[2].long_name;
                  // This will work
                  console.log(userCity);
                  socket.emit("getCity");
                }
              });

            });






		// Creating the JSON data
		var json = [
		    {
		        "title": " ",
		        "lat": 42.1088,
		        "lng": -88.0344,
		        "description": "<div class='blurb'><img src='img/rest/agioitalian.jpg' alt='dee'><div class='righta'><h6>Agio Italian Bistro</h6><span>two plates of Bruschetta for $8.00</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1259,
		        "lng": -88.0622,
		        "description": "<div class='blurb'><img src='img/rest/asahi.jpeg' alt='dee'><div class='righta'><h6>Asahi Japanese Restaurant</h6><span>Full White Dragon roll for $8.00</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1246,
		        "lng": -88.0635,
		        "description": "<div class='blurb'><img src='img/rest/brants.jpg' alt='dee'><div class='righta'><h6>Brandt’s of Palatine</h6><span>Two trays of onion rings $6.00</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1236664,
		        "lng": -88.0502197,
		        "description": "<div class='blurb'><img src='img/rest/brianna.jpg' alt='dee'><div class='righta'><h6>Briana’s Restaurant</h6><span>4 Blueberry pancakes for $7.00</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1116,
		        "lng": -88.0446,
		        "description": "<div class='blurb'><img src='img/rest/gianna.jpg' alt='dee'><div class='righta'><h6>Gianni’s Cafe</h6><span>3 plates of Fried Ravioli $7.00</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1100,
		        "lng": -88.0471,
		        "description": "<div class='blurb'><img src='img/rest/hengweng.jpg' alt='dee'><div class='righta'><h6>Heng Wing Restaurant</h6><span>4 egg rolls for $3.40</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1070,
		        "lng": -88.0343,
		        "description": "<div class='blurb'><img src='img/rest/jjtwigs.jpg' alt='dee'><div class='righta'><h6>JJ Twig’s Pizza & Pub</h6><span>Two small pizzas for $6.50</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1163,
		        "lng": -88.0333,
		        "description": "<div class='blurb'><img src='img/rest/loumalnatis.jpg' alt='dee'><div class='righta'><h6>Lou Malnati’s Pizzeria</h6><span>Three slices for $3</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1108,
		        "lng": -88.0459,
		        "description": "<div class='blurb'><img src='img/rest/mexicouno.jpg' alt='dee'><div class='righta'><h6>Mexico Uno</h6><span>3 Chilaquiles for $8.00</span></div></div>"
		    },
		    {
		        "title": " ",
		        "lat": 42.1115,
		        "lng": -88.0459,
		        "description": "<div class='blurb'><img src='img/rest/taphousegrill.jpg' alt='dee'><div class='righta'><h6>Tap House Grill</h6><span>3 pork tacos $ 10.00</span></div></div>"
		    }
		]

		// Creating a global infoWindow object that will be reused by all markers
		var infoWindow = new google.maps.InfoWindow();

		// Looping through the JSON data
		for (var i = 0, length = json.length; i < length; i++) {
			var data = json[i],
				latLng = new google.maps.LatLng(data.lat, data.lng);

			// Creating a marker and putting it on the map
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: data.title
			});

			// Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
			(function(marker, data) {

				// Attaching a click event to the current marker
				google.maps.event.addListener(marker, "click", function(e) {
					infoWindow.setContent(data.description);
					infoWindow.open(map, marker);
				});


			})(marker, data);

		}


}
})();
