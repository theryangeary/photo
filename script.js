console.log("hello")
// load all photos into main page
const photosDiv = document.getElementById("photos");
const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");
cols = [col1, col2]
collection = ["20240707_0177.jpg", "20240719_0037.jpg"]
for (i = 0; i < collection.length; i++) {
    console.log(i)
    photo = document.createElement("photo-component")
    photo.setAttribute("src", collection[i])
    cols[i % 2].appendChild(photo)
}
