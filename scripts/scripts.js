import './PodcastCard.js';
import { podcasts } from '../scripts/data.js';
import { openModal, closeModal } from '../scripts/modal.js'

document.addEventListener('DOMContentLoaded', () => {
  const cardSection = document.getElementById('card-section');
  // Render cards
  podcasts.forEach(podcast => {
    const card = document.createElement('podcast-card');
    card.podcastData = podcast;
    cardSection.append(card);
  });
  // Selection event listener
  cardSection.addEventListener("podcast-selected", event => {
    openModal(event.detail);
  });
  // Close modal listeners
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const overlay = document.getElementById("overlay");
  modalCloseBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
});
