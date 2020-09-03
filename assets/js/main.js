class Main {

    constructor(){
        this.handleIframeErrors()
        this.handleTheme()
    }

    createPopup(title, innerHTML){
        const popupContainer = document.createElement("div"),
            backdrop = document.createElement("div"),
            popup = document.createElement("div"),
            popupTitle = document.createElement("h2"),
            closeBtn = document.createElement("button")

        popupContainer.className = "popup-container"
        backdrop.className = "popup-backdrop"
        backdrop.onclick = this.closePopup
        popup.className = "popup-box"
        popup.innerHTML = innerHTML
        popupTitle.innerHTML = title
        closeBtn.innerHTML = "Sluiten"
        closeBtn.onclick = this.closePopup

        popup.prepend(popupTitle)
        popup.appendChild(closeBtn)
        popupContainer.appendChild(backdrop)
        popupContainer.appendChild(popup)

        document.body.appendChild(popupContainer)
    }

    closePopup(){
        document.body.removeChild(document.getElementsByClassName("popup-container")[0])
        this.openPopup = false;
    }

    handleIframeErrors() {
        this.openPopup = false

        const iframes = document.getElementsByTagName("iframe")

        for(const iframe of iframes){
            const iframeOnloadEvent = () => {
                if (iframe.src.startsWith('https://drive.google.com') && iframe.contentWindow.length == 0 && !this.openPopup) {
                    this.openPopup = true

                    this.createPopup("Embeds kunnen niet geladen worden", `
                        <p>
                            <b>Let op:</b>
                            Om de content van de Hogeschool Rotterdam te kunnen zien, moet je ingelogd zijn in je browser met een Google account van de Hogeschool Rotterdam.
                            <a href="https://accounts.google.com/AddSession" target="_blank">Klik hier om in te loggen bij Google (nieuw account)</a>
                        </p>
                    `)
                }
            } 

            if (iframe.attachEvent) {
                iframe.attachEvent('onload', iframeOnloadEvent);
            } else {
                iframe.onload = iframeOnloadEvent;
            }
        }
    }

    handleTheme(){
        const switchElement = document.querySelector('#dark-mode-switch')
        this.theme = sessionStorage.getItem('theme')

        if(!this.theme){
            const systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            this.theme = systemInitiatedDark ? 'dark-theme' : 'light-theme'
        }

        if(this.theme == "dark-theme"){
            switchElement.checked = true
            document.body.className = "dark-mode"
        }

        switchElement.onclick = () => {
            this.theme = switchElement.checked ? "dark-theme" : "light-theme"
            document.body.className = this.theme == "dark-theme"? "dark-mode" : ""

            sessionStorage.setItem("theme", this.theme)
        }
    }
}

new Main
