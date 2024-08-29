collection=[ {"name": "20240728_0293.jpg" , "tags": [ "pnw" ]}, {"name": "20240728_0540.jpg" , "tags": [ "critters" , "pnw" ]}, {"name": "20240719_0037.jpg" , "tags": [ "nyc" ]}, {"name": "20240728_0830.jpg" , "tags": [ "pnw" ]}, {"name": "20240728_0114.jpg" , "tags": [ "anna" , "pnw" ]}, {"name": "20240707_0177.jpg" , "tags": [ "longbranch" , "nj" ]}, {"name": "20240728_0089.jpg" , "tags": [ "pnw" ]}, ]

// load all photos into main page
const photosDiv = document.getElementById("photos");
const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");
cols = [col1, col2]
for (i = 0; i < collection.length; i++) {
    photo = document.createElement("photo-component")
    photo.setAttribute("src", "./img/"+collection[i].name)
    cols[i % 2].appendChild(photo)
}
