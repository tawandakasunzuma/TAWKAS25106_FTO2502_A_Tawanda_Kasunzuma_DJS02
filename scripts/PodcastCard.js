export class PodcastCard extends HTMLElement {
    constructor () {
        super ();
        this.attachShadow({ mode: "open" });
    }

    set podcastData (data) {
        this._data = data;
        if (this.isConnected) {
            this.render();
        }
    }

    render () {
        this.shadowRoot.innerHTML = `
            <div>
                ${JSON.stringify(this._data)}
            </div>
        `;
    }

    connectedCallback () {
        if (this._data) {
            this.render();
        }
    }
}

customElements.define ("podcast-card",PodcastCard);