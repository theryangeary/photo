
import {collection} from '/photo/collection.js'
import {Body} from '/photo/components/body.js'
import {Columns} from '/photo/components/columns.js'
import {Fullover} from '/photo/components/fullover.js'
import {Navbar} from '/photo/components/navbar.js'
import {Photo} from '/photo/components/photo.js'
import {Title} from '/photo/components/title.js'

const url = window.location.href

// query based selection
const params = new URLSearchParams(window.location.search);
let queryTagList = params.getAll("tag");
let archiveMonth = params.get("archive");
let selectedWorks = params.get("selectedworks");
let trip = params.get("trip");
let prefix = params.get("prefix");

// path based selection
const fullPath = url.split('/')
const photoIdx = fullPath.indexOf("photo")
// get path after "photo"
const relevantPath = fullPath.splice(photoIdx+1)
    .filter((tag) => tag !== "")
    .filter((tag) => tag[0] !== "?")
relevantPath
    .forEach((tag) => queryTagList.push(tag))

let shouldShowPanos = queryTagList.includes("panorama");
let shouldShowPortfolio = (url.indexOf('?') == -1 || url.indexOf('?') == url.length-1) && relevantPath.length === 0;

const photosDiv = document.getElementById("photos");
const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");
const cols = [col1, col2]
let colHeights = [0, 0]
let nextCol = 0

function emptyCols() {
    while (col1.firstChild) {
        col1.removeChild(col1.lastChild);
    }
    while (col2.firstChild) {
        col2.removeChild(col2.lastChild);
    }
    colHeights = [0, 0]
    nextCol = 0
}

function hideCol2() {
    col1.classList.add("full-width")
    col2.style.display = "none"
}

function showCol2() {
    col1.classList.remove("full-width")
    col2.style.display = "initial"
}

function resizeColumns(smallScreen) {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const scrollInversionConstant = 4.0
    if (smallScreen.matches) { // If media query matches
        hideCol2()
        emptyCols()
        for (let i = 0; i < displayIndex; i++) {
            displayImage(displayCollection[i])
        }
        scroll(0, currentScroll*scrollInversionConstant)
    } else {
        showCol2()
        emptyCols()
        for (let i = 0; i < displayIndex; i++) {
            displayImage(displayCollection[i])
        }
        scroll(0, currentScroll/scrollInversionConstant)
    }
}

let fulloverComponent = document.getElementById("fullover-component")

function displayImage(img) {
    let photo = document.createElement("photo-component")
    photo.setAttribute("src", "/photo/img/"+img.name)
    if (img.title !== undefined) {
        photo.setAttribute("title", img.title)
    }
    cols[nextCol].appendChild(photo)
    colHeights[nextCol] += img.heightRatio
    if (col2.style.display != "none" && cols.length == 2 && colHeights[nextCol] > colHeights[(nextCol + 1) % 2]) {
        nextCol = (nextCol + 1) % 2
    }
}

function pageHeight() {
    var body = document.body;
    var html = document.documentElement;
    return Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );
}

function hasTag(img, tag) {
    for (let tagIdx = 0; tagIdx < img.tags.length; tagIdx++) {
        if (img.tags[tagIdx] == tag) {
            return true
        }
    }
    return false
}

function hasAnyTag(img, tagList) {
    for (let queryTagIdx = 0; queryTagIdx < tagList.length; queryTagIdx++) {
        for (let tagIdx = 0; tagIdx < img.tags.length; tagIdx++) {
            if (img.tags[tagIdx] == tagList[queryTagIdx]) {
                return true
            }
        }
    }
    return false
}

function hasAllTags(img, tagList) {
    each_query_tag:
    for (let queryTagIdx = 0; queryTagIdx < tagList.length; queryTagIdx++) {
        if (img.tags.includes(tagList[queryTagIdx])) {
            continue each_query_tag
        }
        return false
    }
    return true
}

function monthName(monthDigitString) {
    if (monthDigitString==="01") return "January";
    if (monthDigitString==="02") return "February";
    if (monthDigitString==="03") return "March";
    if (monthDigitString==="04") return "April";
    if (monthDigitString==="05") return "May";
    if (monthDigitString==="06") return "June";
    if (monthDigitString==="07") return "July";
    if (monthDigitString==="08") return "August";
    if (monthDigitString==="09") return "September";
    if (monthDigitString==="10") return "October";
    if (monthDigitString==="11") return "November";
    if (monthDigitString==="12") return "December";
    return "";
}

function archiveMonthAsString(archiveMonth) {
    if(!/^(\d){4,}$/.test(archiveMonth)) {
        return ""
    }
    if(/^(\d){4,5}$/.test(archiveMonth)) {
        return archiveMonth.substr(0,4)
    }
    if(/^(\d){6,}$/.test(archiveMonth)) {
        var y = archiveMonth.substr(0,4),
            m = archiveMonth.substr(4,2)
    }

    let month = monthName(m)

    if (month === "") {
        return y
    }

    return month + " " + y
}

function selectedWorksAsTitle(s) {
    if (s==="street") return "Street Photography";
    if (s==="cityscape") return "Cityscapes";
    return ""
}

let titleComponent = document.getElementById("title-component")
if (archiveMonth != null) {
    let archiveLabel = archiveMonthAsString(archiveMonth)
    if (archiveLabel === "") {
        titleComponent.setTitle("Archives")
    } else {
        titleComponent.setTitle("Archives | " + archiveLabel)
    }
}
if (selectedWorks != null) {
    let selectedWorksLabel = selectedWorksAsTitle(selectedWorks)
    if (selectedWorksLabel === "") {
        titleComponent.setTitle("Selected Works")
    } else {
        titleComponent.setTitle(selectedWorksLabel)
    }
}

// filters return true if the image should be filtered out
let filters = [
    archiveMonthFilter,
    selectedWorksFilter,
    tripFilter,
    tagFilter,
    panoFilter,
    portfolioFilter,
    prefixFilter
]

function prefixFilter(img) {
    if (prefix == null) {
        return false
    }
    return !(img.name.startsWith(prefix))
}

function archiveMonthFilter(img) {
    if (archiveMonth == null) {
        return false
    }
    return (!img.name.startsWith(archiveMonth) || !hasTag(img, "archive"))
}

function selectedWorksFilter(img) {
    if (selectedWorks == null) {
        return false
    }
    return (!hasTag(img, "selectedworks") || !hasTag(img, selectedWorks))
}

function tripFilter(img) {
    if (trip == null) {
        return false
    }
    return (!hasTag(img, "trips") || !hasTag(img, trip))
}

function tagFilter(img) {
    if (queryTagList.length == 0) {
        return false
    }
    if (queryTagList.length == 1) {
        return !hasTag(img, queryTagList[0])
    }
    return !hasAllTags(img, queryTagList)
}

function panoFilter(img) {
    let isPano = hasTag(img, "panorama")
    return shouldShowPanos !== isPano
}

function portfolioFilter(img) {
    if (!shouldShowPortfolio) {
        return false
    }
    return !hasTag(img, "portfolio")
}

// sorting
function sortByRating(a, b) {
    return b.rating - a.rating;
}

let displayCollection = []
let displayIndex = 0
function advanceDisplayCollection() {
    if (displayIndex === displayCollection.length) {
        return
    }
    let newImg = displayCollection[displayIndex]
    displayIndex++
    displayImage(newImg)
}


window.onscroll = function() {
    if (window.scrollY+window.innerHeight < pageHeight() - (2*window.innerHeight)) {
        // don't load yet, plenty of other images are already loaded
        return
    }
    advanceDisplayCollection()
};

document.addEventListener("photoNext", (e) => {
    for (let i = 0; i < displayCollection.length ; i++) {
        if ("/photo/img/"+displayCollection[i].name === e.detail.current && i+1 < displayCollection.length) {
            fulloverComponent.setPhoto2(displayCollection[i+1])
        }
    }
});
document.addEventListener("photoPrev", (e) => {
    for (let i = 0; i < displayCollection.length ; i++) {
        if ("/photo/img/"+displayCollection[i].name === e.detail.current && i-1 >= 0) {
            fulloverComponent.setPhoto2(displayCollection[i-1])
        }
    }
});

function main() {
    if (shouldShowPanos) {
        // make col1 full width always
        hideCol2()
    } else {
        // make num cols based on screen size

        // Create a MediaQueryList object
        var smallScreen = window.matchMedia("(max-width: 720px)")

        // Call listener function at run time
        resizeColumns(smallScreen);

        // Attach listener function on state changes
        smallScreen.addEventListener("change", function() {
            resizeColumns(smallScreen);
        });
    }


    eachimg:
    for (let i = 0; i < collection.length; i++) {
        for (let filterIdx = 0; filterIdx < filters.length; filterIdx++) {
            if (filters[filterIdx](collection[i])) {
                continue eachimg
            }
        }
        displayCollection.push(collection[i])
    }

    if (displayCollection.length == 0) {
        return
    }

    if ((prefix == null && archiveMonth == null && trip == null) &&
        (!relevantPath.includes("prefix") && !relevantPath.includes("archive") && !relevantPath.includes("trips"))) {
        // display newest first for collections that are not obligated to be chronological
        displayCollection.reverse()
        // display highest rated first for collections that are not obligated to be chronological
        displayCollection.sort(sortByRating)
    }

    let imgCount = 0
    while (imgCount < 10) {
        advanceDisplayCollection()
        imgCount++
    }
}

main()
