collection=[ {"name": "20240829_0182.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240809_0062.jpg" , "tags": [ "archive" , "website" ]}, {"name": "20240829_0169.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0235.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0143.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240813_0001.jpg" , "tags": [ "archive" , "boston" , "website" ]}, {"name": "20240829_0208.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0184.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240813_0004.jpg" , "tags": [ "archive" , "boston" , "website" ]}, {"name": "20240728_0293.jpg" , "tags": [ "pnw" ]}, {"name": "20240813_0012.jpg" , "tags": [ "archive" , "boston" , "website" ]}, {"name": "20240809_0098.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0150.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0240.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240728_0540.jpg" , "tags": [ "critters" , "pnw" ]}, {"name": "20240804_0089.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240719_0037.jpg" , "tags": [ "nyc" ]}, {"name": "20240829_0101.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0115.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0129.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240813_0090.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240728_0830.jpg" , "tags": [ "pnw" ]}, {"name": "20240813_0045.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0149.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240728_0114.jpg" , "tags": [ "anna" , "pnw" ]}, {"name": "20240829_0148.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240707_0177.jpg" , "tags": [ "longbranch" , "nj" ]}, {"name": "20240813_0021.jpg" , "tags": [ "archive" , "boston" , "website" ]}, {"name": "20240809_0096.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240728_0089.jpg" , "tags": [ "pnw" ]}, {"name": "20240829_0167.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240829_0198.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240809_0127.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240804_0154.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, {"name": "20240809_0126.jpg" , "tags": [ "archive" , "nyc" , "website" ]}, ] 

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

function hasTag(img, tag) {
    for (tagIdx = 0; tagIdx < img.tags.length; tagIdx++) {
        if (img.tags[tagIdx] == tag) {
            return true
        }
    }
    return false
}

function main() {
eachimg:
    for (i = 0; i < collection.length; i++) {
        if (archiveMonth != null) {
            if (!collection[i].name.startsWith(archiveMonth) || !hasTag(collection[i], "archive")) {
                continue
            }
        }
        if (queryTag != null) {
            if (!hasTag(collection[i], queryTag)) {
                continue eachimg
            }
        }
        displayImage(collection[i].name, i % 2)
    }
}

main()
