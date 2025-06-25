export class PodcastCard extends HTMLElement {
    constructor () {
        super ();
        this.attachShadow({ mode: "open" });
    }

    set podcastData (data) {
        this._data = data;
        this.render();
    }

    render () {
        this.shadowRoot.innerHTML = `
            <div>
                ${JSON.stringify(this._data)}
            </div>
        `;
    }

    connectedCallback () {}
}

customElements.define ("podcast-card",PodcastCard);