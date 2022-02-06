getData();
async function getData()
{
    const response = await fetch("/api"); //doing a GET request
    const data = await response.json();
    console.log(data);
    const container = document.getElementById("container1");
    for (item of data)
    {
        const root = document.createElement('p');
        root.classList.add("root");
        const animal = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');
        geo.classList.add("item");
        date.classList.add("item");
        animal.classList.add("item");
        image.classList.add("item");

        image.src = item.image;
        animal.textContent = "Animal favorito: "+ item.animalFavorito;
        geo.textContent = "Latitude: " + item.lat + '°,' + " Longitude: " + item.lon+'°';
        date.textContent = new Date(item.timestamp).toLocaleString();
        root.append(animal, geo, date, image);
        container.append(root);
    }
}