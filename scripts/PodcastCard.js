import { genres } from '../scripts/data.js';

/**
 * `<podcast-card>` displays a podcast card
 *
 * @property {Object} podcastData — expects { id, title, image, description, seasons, genres, updated }
 */
export class PodcastCard extends HTMLElement {
    constructor () {
        super ();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("podcast-selected", {
                detail: this._data,
                bubbles: true,
                composed: true
            }))
        })
        this.shadowRoot.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                this.dispatchEvent(new CustomEvent('podcast-selected', {
                    detail: this._data,
                    bubbles: true, 
                    composed: true
                }));
            }
        });

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
                return `<span class="genre-name">${genreName}</span>`
            })
            .join("");
        this.shadowRoot.innerHTML = `
            <style>
                /* Podcast container */

                .podcast-container {
                    margin-top: 1rem;
                    background-color: var(--white-color);
                    padding: var(--normal-padding);
                    border-radius: var(--normal-border-radius);
                    box-shadow: 0 2px 4px var(--light-gray-color);
                    width: 100%;
                    transition: all 300ms ease-in-out;
                }

                .podcast-container:hover,
                .podcast-container:active {
                    box-shadow: 0 4px 8px var(--medium-gray-color);
                    transform: translateY(-2px);
                }

                /* Podcast image */

                .image-container {
                    width: 100%;
                    max-width: 100%;
                }

                .podcast-image {
                    height: auto;
                    width: 100%;
                    border-radius: var(--normal-border-radius);
                    cursor: pointer;
                    object-fit: cover;
                }

                /* Podcast title */

                .podcast-title {
                    font-size: 1rem;
                    cursor: pointer;
                }

                /* Seasons section */

                .seasons-section {
                    display: flex;
                    align-items: center;
                    gap: var(--small-gap);
                    margin: 0.5rem 0;
                }

                .seasons-icon {
                    width: 20px;
                    cursor: auto;
                }

                .num-seasons {
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                /* Genre section */

                .genre-section {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem var(--small-gap);
                    margin: 0.5rem 0;
                }

                .genre-name {
                    background-color: var(--light-gray-color);
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 0.125rem 0.5rem;
                    border-radius: var(--small-border-radius);
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 300ms ease-in-out;
                }

                .genre-name:hover {
                    background-color: rgba(128, 128, 128, 0.075);
                }

                /* Updated Status */

                .updated-status {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--dark-gray-color);
                    margin-top: 1rem;
                }
                
                /*===============
                    Media Quires
                ===============*/

                @media (max-width: 480px) {
                    .podcast-cover-title {
                        height: 94%;
                    }
                }

                @media (min-width: 481px) and (max-width: 767px) {
                    .podcast-cover-title {
                        height: 94%;
                    }
                }

            </style>
            
                <article class="podcast-container" tabindex="0">
                    <div class="image-container">
                        <img
                        class="podcast-image"
                        src="${podcastData.image}"
                        alt="${podcastData.description}"
                        />
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