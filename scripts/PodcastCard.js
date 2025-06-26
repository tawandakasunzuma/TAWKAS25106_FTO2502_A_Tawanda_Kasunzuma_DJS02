import { genres } from '../scripts/data.js';

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

        const podcastData = this._data;
        
        // Days since last update
        const date = new Date (podcastData.updated);
        const day = String(date.getDate()).padStart(2, "0"); // Get day of month
        const month = date.toLocaleString("en", { month: "long" }); // Get the fill month
        const year = date.getFullYear(); // Get full year
        const updatedDate = `${day} ${month} ${year}`
        
        // Genre titles
        const genreMap = new Map (genres.map(genre => [genre.id, genre.title]));
        const genreSpans = podcastData.genres
            .map((id,index,array) => {
                const genreName = genreMap.get(id);
                const separator = index < array.length - 1 ? ", " : ""; // Add comma and space to each genre except the last one
                return `<span class="genre-name">${genreName}</span>${separator}`
            })
            .join("");
        this.shadowRoot.innerHTML = `
            <style></style>
            <article class="podcast-container">
                <div class="image-container">
                    <img
                    class="podcast-image"
                    src="${podcastData.image}"
                    alt="${podcastData.description}"
                    />
                    <p class="podcast-cover-title">${podcastData.title}</p>
                </div>
                <h3 class="podcast-title">${podcastData.title}</h3>
                <div class="seasons-section">
                    <img class="icon seasons-icon" src="./images/seasons-icon.svg" alt="Seasons" />
                    <p class="num-seasons">${podcastData.seasons} seasons</p>
                </div>
                <div class="genre-section">
                    ${genreSpans}
                </div>
                <p class="updated-status">Updated ${updatedDate}</p>
            </article>
        `;
    }

    connectedCallback () {
        if (this._data) {
            this.render();
        }
    }
}

customElements.define ("podcast-card",PodcastCard);