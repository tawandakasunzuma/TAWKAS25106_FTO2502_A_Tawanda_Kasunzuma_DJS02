import './PodcastCard.js';
import { podcasts } from './data.js';

const cardSection = document.getElementById('card-section');

podcasts.forEach (podcast => {
    const card = document.createElement("podcast-card");
    card.podcastData = podcast;
    cardSection.append(card);
})

console.log("Rendered",podcasts.length,"cards");