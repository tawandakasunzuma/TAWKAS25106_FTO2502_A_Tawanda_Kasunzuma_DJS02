import './PodcastCard.js';
import { podcasts } from '../scripts/data.js';

document.addEventListener('DOMContentLoaded', () => {
  const cardSection = document.getElementById('card-section');
  podcasts.forEach(podcast => {
    const card = document.createElement('podcast-card');
    card.podcastData = podcast;
    cardSection.append(card);
  });
});
