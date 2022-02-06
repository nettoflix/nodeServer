var data = new Object();
var video;

function setup()
{
    video = createCapture(VIDEO);
    video.size(320,240);
    console.log('a');
    getLatLon();
    noCanvas();
  
    
}
function getLatLon()
{
    if('geolocation' in navigator)
{
    console.log("geolocation availableee");
    var options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(function(position){
       
        const lat =position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById("latitude").textContent = lat;
        document.getElementById("longitude").textContent = lon;
        //send the latitude and longitude as data to the server with a POST request
        data.lat = lat;
        data.lon = lon;
    }, function(error){
    console.log("error on geolocation.getCurrentPosition");
    }, options);
}
else
{
    console.log("geolocation not available");
}
}
async function doPost()
{
    
    data.animalFavorito = document.getElementById("input-animal").value;
    video.loadPixels();
    const image64 = video.canvas.toDataURL(); //turn the image data into a string represensation base64
    data.image = image64;
    const options = 
    {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    };
   // fetch('/api', options).then(response =>{ //'then' will run when the server answers this post request
    //    console.log(response);
   // });
   const response = await fetch('/api', options); //as i made this function to be async, I can use wait to block further exxecution of the funciton until i get the response back
   const json = await response.json();
   console.log(json);
}