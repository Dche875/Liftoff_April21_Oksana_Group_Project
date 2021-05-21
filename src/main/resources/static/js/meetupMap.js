//called with onclick on HTML element for filter result title.
//function setZoom(id) {
//    let selectedTrail = trails.find(trail => trail.id === id)
//    let currentLat = selectedTrail.lat;
//    let currentLng = selectedTrail.lng;
//    selectedCenter = {lat: currentLat, lng: currentLng}
//    selectedZoom = 13;
//    selectedId = id;
//    initialLoad = false;
//    initMap();
//    console.log(selectedId)
//}


let initialLoad = true;
let map;
let selectedId;

function initMap(id) {
    let meetupTrail = meetups.trail.id;
    //console.log(meetupTrail)
    let selectedTrail = trails.find(trail => trail.id === meetupTrail);
    console.log(trails.id);
    selectedId = id;
    let currentLat = selectedTrail.lat;
    let currentLng = selectedTrail.lng;


    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: {lat: currentLat, lng: currentLng },
        mapTypeId: google.maps.MapTypeId.HYBRID,
        mapId: '59da3fe57cf0042e',
        mapTypeControl: false
    });

    new google.maps.Marker({
        position: {lat: currentLat, lng: currentLng },
        map,
        title: "Test"
    })
}








//let userLocation;
//const searchLocationInput = document.getElementById('search-location');
//
//function setZoom(id) {
//    let selectedTrail = trails.find(trail => trail.id === id)
//
//    selectedZoom = 13;
//    lastSelectedId = selectedId;
//    selectedId = id;
//
//    initialLoad = false;
//
//    //If search location has been changed, recalculate with search map so distances don't recalculated to default/userLoc when you click on a trail result
//    if (searchLocation){
//        initSearchMap()
//    } else {
//        initDefaultMap()
//    }
//
//}
//
//function calculateDistance(trails, userLocation){
//    const service = new google.maps.DistanceMatrixService();
//
//    for (let i = 0; i < trails.length; i++){
//
//        service.getDistanceMatrix({
//            origins: [userLocation],
//            destinations: [{lat: trails[i].lat, lng: trails[i].lng}],
//            travelMode: 'DRIVING',
//            unitSystem: google.maps.UnitSystem.IMPERIAL
//        }, callback)
//
//        const distanceAwayLi = document.getElementById(`distance-from-${trails[i].id}`)
//
//        function callback(response, status) {
//            let origin = response.originAddresses[0];
//            let destination = response.destinationAddresses[0]
//            let element = response.rows[0].elements[0]
//            let distance = element.distance.text
//            let duration = element.duration.text
//
//            distanceAwayLi.innerHTML = `${distance} away (${duration} drive)`;
//        }
//    };
//}
//
//function initSearchMap() {
//    const geocoder = new google.maps.Geocoder();
//
//    geocoder.geocode({ address: searchLocation }, (results, status) => {
//        if (status === "OK") {
//              const {lat, lng} = results[0].geometry.location;
//              userLocation = {lat: lat(), lng: lng()}
//        } else {
//            alert(status)
//        }
//         map = new google.maps.Map(document.getElementById("map"), {
//            zoom: selectedZoom,
//            center: userLocation,
//            mapTypeId: 'hybrid',
//            mapId: '59da3fe57cf0042e',
//            mapTypeControl: false
//        });
//        processResults(trails,map)
//    })
//}
//
//function initDefaultMap() {
//    userLocation = new Object();
//    const geocoder = new google.maps.Geocoder();
//
//    navigator.geolocation.getCurrentPosition(function(position) {
//        userLocation.lat = position.coords.latitude,
//        userLocation.lng = position.coords.longitude,
//
//        geocoder.geocode({ location: userLocation }, (results, status) => {
//                if (status === "OK") {
//                      const zip = results[0].address_components[6].long_name;
//                      searchLocationInput.value = zip;
//                } else {
//                    alert(status)
//                }
//            })
//
//        map = new google.maps.Map(document.getElementById("map"), {
//            zoom: 10,
//            center: userLocation,
//            mapTypeId: 'hybrid',
//            mapId: '59da3fe57cf0042e',
//            mapTypeControl: false
//        });
//        processResults(trails, map)
//    })
//}
//
//function processResults(trails, map){
//
//    const marker = new google.maps.Marker({
//        position: userLocation,
//        map,
//        title: `You are here`,
//        icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
//        optimized: false
//    });
//
//    let allResults = [];
//
//    calculateDistance(trails, userLocation)
//
//    const infoWindow = new google.maps.InfoWindow();
//
//    for (let trail of trails){
//        const infoWindowContent =
//            `<div style="background-color: #091E05; color: white; padding: 3rem; margin: 0; width: auto; height: auto">
//                <h3>${trail.name}</h3>
//                <h4>${trail.length} mi, Level ${trail.difficulty}</h4>
//                <div id="min-rating" class="rating" style="margin:0 auto;overflow:hidden">
//                    <input disabled type="radio" name="rating" value="5" id="5">
//                    <label for="5">☆</label>
//                    <input disabled type="radio" name="rating" value="4" id="4">
//                    <label for="4">☆</label>
//                    <input disabled type="radio" name="rating" value="3" id="3">
//                    <label for="3">☆</label>
//                    <input disabled type="radio" name="rating" value="2" id="2">
//                    <label for="2">☆</label>
//                    <input disabled type="radio" name="rating" value="1" id="1">
//                    <label for="1">☆</label>
//                </div>
//                <button class="btn btn-primary" style="width: 100%; margin: 0.5rem 0">Add to Favorites</button><br />
//                <button class="btn btn-primary" style="width: 100%; margin: 0.5rem 0">Plan a Meetup</button>
//            </div>`
//
//        const markerPosition = {lat: trail.lat, lng: trail.lng}
//        const title = trail.name
//        allResults.push({markerPosition, title, infoWindowContent, id: trail.id})
//    }
//
//    allResults.forEach((result, i) => {
//        const marker = new google.maps.Marker({
//            position: result.markerPosition,
//            map,
//            title: `${i + 1}. ${result.title}`,
//            label: `${i + 1}`,
//            optimized: false
//        });
//
//        if (!initialLoad && selectedId === result.id){
//            infoWindow.setContent(result.infoWindowContent);
//            infoWindow.open(marker.getMap(), marker);
//        }
//
//        marker.addListener("click", () => {
//            infoWindow.close();
//            infoWindow.setContent(result.infoWindowContent);
//            infoWindow.open(marker.getMap(), marker);
//        });
//
//    });
//}








//    //Initialize array that will still the marker location and info window information for every trail in the left column
//    let allResults = [];
//
//    for (let i = 0; i < trails.length; i++){
//        //In a string, store the div that will appear as the info window for a given trail.
//        const infoWindowContent =
//            `<div style="background-color: #091E05; color: white; padding: 3rem; margin: 0; width: auto; height: auto">
//                <h3>${trails[i].name}</h3>
//                <h4>${trails[i].length} mi, Level ${trails[i].difficulty}</h4>
//            </div>`
//
//        //prepare data that will be needed to establish markers, including the trail object's ID so marker will recognize if trail's ID matches selected ID
//        const markerPosition = {lat: trails[i].lat, lng: trails[i].lng}
//        const title = trails[i].name
//        allResults.push({markerPosition, title, infoWindowContent, id: trails[i].id})
//    }



//var map, infoWindow;
//
//function initMeetupMap() {
//    var options = {
//        center: { lat: 43.654, lng: -79.383 },
//        zoom: 10,
//        disableDefaultUI: true,
//        mapTypeId: google.maps.MapTypeId.HYBRID
//
//    };
//
//    map = new google.maps.Map(document.getElementById('map')), options);
//
//    var input = document.getElementById('search');
//    var searchBox = new google.maps.places.SearchBox(input);
//
//    map.addListener('bounds_changed', function() {
//        searchBox.setBounds(map.getBounds());
//    });
//
//    var markers = [];
//
//    searchBox.addListener('places_changed', function() {
//
//    })
//
//}


//infoWindow = new google.maps.infoWindow;
//
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(function (p) {
//            var position = {
//            lat: p.coords.latitude,
//            lng: p.coords.longitude
//            };
//            infoWindow.setPosition(position);
//            infoWindow.setContent('Your location!');
//            infoWindow.open(map);
//       }, function () {
//            handleLocationError("Geolocation service failed", map.center());
//       })
//    } else {
//        handleLocationError('No geolocation available', map.center());
//    }
//function handleLocationError (content, position) {
//    infoWindow.setPosition(position);
//    infoWindow.setContent(content);
//    infoWindow.open(map);
//}