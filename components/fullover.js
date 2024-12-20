class Fullover extends HTMLElement {
    static observedAttributes = ["src", "description"];

    constructor() {
        super();
    }

    id() {
        return "zoomCheck-"+this.getAttribute("src")+"-fullover"
    }

    getDescription() {
        if (this.getAttribute("description") == "undefined" || this.getAttribute("description") == "null" || this.getAttribute("description") == null ) {
            return ""
        }
        return `<p>${this.getAttribute("description")}</p>`
    }

    photoNext() {
        const photoNext = new CustomEvent("photoNext", {
            detail: {
                name: "next",
                current:  this.getAttribute("src"),
            },
        });
        document.dispatchEvent(photoNext);
    }

    clickPhotoNext(event) {
        event.stopPropagation()
        this.photoNext()
    }

    photoPrev() {
        const photoPrev = new CustomEvent("photoPrev", {
            detail: {
                name: "prev",
                current:  this.getAttribute("src"),
            },
        });
        document.dispatchEvent(photoPrev);
    }

    clickPhotoPrev(event) {
        event.stopPropagation()
        this.photoPrev()
    }

    checkDirection(touchstartX, touchstartY, touchendX, touchendY) {
        if (Math.abs(touchendX - touchstartX) > Math.abs(touchendY - touchstartY)) {
            if (touchendX < touchstartX) this.photoNext()
            if (touchendX > touchstartX) this.photoPrev()
        }
    }

    connectedCallback() {
        let touchstartX = 0
        let touchstartY = 0
        let touchendX = 0
        let touchendY = 0

        document.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX
            touchstartY = e.changedTouches[0].screenY
        })

        document.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX
            touchendY = e.changedTouches[0].screenY
            this.checkDirection(touchstartX, touchstartY, touchendX, touchendY)
        })

        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 27) {
                // Escape key pressed
                this.hide()
            }
            if (event.keyCode === 39) {
                this.photoNext()
            }
            if (event.keyCode === 37) {
                this.photoPrev()
            }
        });

        document.addEventListener('photoclick', (event) => {
            this.setPhoto(event.detail.photo)
            this.show()
        });

        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
    }

    hide() {
        document.getElementById("fullover").classList.remove("show")
    }

    show() {
        document.getElementById("fullover").classList.add("show")
    }

    setPhoto(photo) {
        this.setAttribute("src", photo.getAttribute("src"))
        this.setAttribute("description", photo.getAttribute("title"))
    }

    setPhoto2(collectionEntry) {
        this.setAttribute("src", "/photo/img/"+collectionEntry.name)
        this.setAttribute("description", collectionEntry.title)
        this.show()
    }

    render() {
        const src = this.getAttribute('src')
        if (src === null) {
            return
        }
        const description = this.getDescription()
        this.innerHTML = `
<div id="fullover" onclick="document.getElementById('fullover-component').hide()">
    <div onclick="document.getElementById('fullover-component').hide()" class="fullover-icon x-out">
        <a>&#x2715;</a>
    </div>
    <div onclick="document.getElementById('fullover-component').clickPhotoPrev()" class="fullover-icon arrow arrow-left">
        <i class="fa fa-arrow-left"></i>
    </div>
    <div onclick="document.getElementById('fullover-component').clickPhotoNext(event)" class="fullover-icon arrow arrow-right">
        <i class="fa fa-arrow-right"></i>
    </div>
    <img src="${src}"/>
    ${description}
</div>
`
    }
}

customElements.define('fullover-component', Fullover);
export {Fullover}
