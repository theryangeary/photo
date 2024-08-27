collection=[ "20240728_0293.jpg", "20240728_0540.jpg", "20240719_0037.jpg", "20240728_0830.jpg", "20240728_0114.jpg", "20240707_0177.jpg", "20240728_0089.jpg", ] 

// load all photos into main page
const photosDiv = document.getElementById("photos");
const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");
cols = [col1, col2]
for (i = 0; i < collection.length; i++) {
    photo = document.createElement("photo-component")
    photo.setAttribute("src", collection[i])
    cols[i % 2].appendChild(photo)
}
