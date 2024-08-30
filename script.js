collection=[ {"name": "20240728_0293.jpg" , "tags": [ "pnw" ]}, {"name": "20240728_0540.jpg" , "tags": [ "critters" , "pnw" ]}, {"name": "20240719_0037.jpg" , "tags": [ "nyc" ]}, {"name": "20240728_0830.jpg" , "tags": [ "pnw" ]}, {"name": "20240728_0114.jpg" , "tags": [ "anna" , "pnw" ]}, {"name": "20240707_0177.jpg" , "tags": [ "longbranch" , "nj" ]}, {"name": "20240728_0089.jpg" , "tags": [ "pnw" ]}, ]

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let queryTag = params.tag;
let archiveMonth = params.archive;

const photosDiv = document.getElementById("photos");
const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");
const cols = [col1, col2]

function displayImage(path, column) {
    photo = document.createElement("photo-component")
    photo.setAttribute("src", "./img/"+collection[i].name)
    cols[column].appendChild(photo)
}

function main() {
eachimg:
    for (i = 0; i < collection.length; i++) {
        console.log(collection[i].name.startsWith(archiveMonth))
        if (archiveMonth != null) {
            if (!collection[i].name.startsWith(archiveMonth)) {
                continue
            }
        }
        if (queryTag != null) {
            for (tag = 0; tag < collection[i].tags.length; tag++) {
                if (!collection[i].tags[tag] == queryTag) {
                    continue eachimg
                }
            }
        }
        displayImage(collection[i].name, i % 2)
    }
}

main()
