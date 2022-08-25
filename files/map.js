var element = document.body;

// get theme from local storage and load current theme
var theme = localStorage.getItem('theme')
x = document.getElementById("change-icon")
function page_load(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    document.getElementById("range").value = params.range/2
    document.getElementById("range_p").innerHTML = `Your car's range is ${params.range} kms`
    if (theme != "light-mode"){
        theme_load()
    }
  }

// load current theme
function theme_load(){
    x.classList.toggle("fa-sun");
    element.classList.toggle("dark-mode");
}
 
// change theme
function theme_change() {
    if (theme == "light-mode") {
        x.classList.toggle("fa-sun");
        element.classList.toggle("dark-mode");
        theme = "dark-mode"
    } else { 
        x.classList.toggle("fa-sun");
        element.classList.toggle("dark-mode");
        theme = "light-mode"
    } 
  }
// check for change theme button pressed
window.addEventListener('unload', function(event) {
    localStorage.setItem('theme', theme);
})

// load a map centered at an address. 
// Code based on https://developers.google.com/maps/documentation/javascript/examples/circle-simple 
var geocoder;
var map2;
var rangeCircle;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 7,
    center: latlng
  }
  map2 = new google.maps.Map(document.getElementById('map2'), mapOptions);
  
  rangeCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map2,
    radius: 0,
    center: latlng
  });
}

// make it accesible from html
window.initialize = initialize;

// Function to create a circle of specified radius around an address:
function codeAddress() {
  var address = document.getElementById('address').value;
  var rangekm = document.getElementById('range').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      var centre = results[0].geometry.location; // lat,long of the address 
      map2.setCenter(centre);
      rangeCircle.setCenter(centre);

      rangeCircle.setRadius(rangekm*1000/1.5); // google maps uses metres
      // the value of 1.5 is from this website: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3835347/
      // this value provides a more accurate representation of distance travelled on the road vs as the crow flies
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// stop the user from inputting values that aren't numbers in the input
const input = document.getElementById("range")
input.onkeypress = (evt) => {
  const charCode = evt.keyCode;
  if (charCode != 46 && charCode > 31 &&
    (charCode < 48 || charCode > 57)) {
    evt.preventDefault()
  }
}

// change page 
function changepage(page) {
    // get current parameters from URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var pbrand = params.brand
    var pmodel = params.model
    var pkms = params.kms
    var range = params.range
    window.location.href = (page + '?brand=' + pbrand +'&model=' + pmodel + '&kms=' 
    + pkms + '&range=' + range) // go to specified url
}

window.codeAddress = codeAddress;

