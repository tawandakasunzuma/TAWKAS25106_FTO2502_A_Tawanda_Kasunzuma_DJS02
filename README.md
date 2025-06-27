# Podcast Preview Web Component

## What This Project Is

You’ll make a reusable **podcast preview** card as a Web Component. That means:

- It’s a new HTML tag (like `<podcast-card>`).
- It works on its own with its own styles.
- You can drop it anywhere without repeating code.

The card shows podcast info and lets the main page open a details modal when you click it.

---

## What You’ll Build

- A custom element called `podcast-card`.
- It takes podcast data (image, title, genres, seasons, last update) as a **property**.
- It uses **Shadow DOM** so its styles don’t clash with the page.
- When you click it or press Enter/Space, it dispatches a `podcast-selected` event.

---

## How It Looks

Each card shows:

- The cover image
- The podcast title
- Genre labels
- Number of seasons
- “Last updated” in a readable date

Cards wrap nicely on different screen sizes.

---

## How to Try It

1. **Clone this repo**

   ```bash
   git clone https://github.com/tawandakasunzuma/TAWKAS25106_FTO2502_A_Tawanda_Kasunzuma_DJS02.git
   cd TAWKAS25106_FTO2502_A_Tawanda_Kasunzuma_DJS02
   ```

2. **Open** `index.html` in your browser.

   - You should see the header, filter section, and all your podcast cards laid out in a grid.
   - Click (or press Enter/Space on) any card to open its details modal.

3. **Play around**
   - Try resizing the browser to see how cards wrap on smaller screens.
   - Click outside the modal or on the close button to dismiss it.

---

## How to Use in Your Own Project

1. **Import the component** in your HTML:

   ```html
   <script type="module">
     import "./scripts/PodcastCard.js";
     import { openModal, closeModal } from "./scripts/modal.js";
     import { podcasts } from "./data.js";

     // Render cards on page load
     document.addEventListener("DOMContentLoaded", () => {
       const container = document.getElementById("card-section");
       podcasts.forEach((podcast) => {
         const card = document.createElement("podcast-card");
         card.podcastData = podcast;
         container.append(card);
       });

       // Listen for card clicks
       container.addEventListener("podcast-selected", (event) =>
         openModal(event.detail)
       );

       // Close modal
       document
         .getElementById("modal-close-btn")
         .addEventListener("click", closeModal);
       document.getElementById("overlay").addEventListener("click", closeModal);
     });
   </script>
   ```

---

## Podcast Data Format

Your podcast data objects should look like this:

```js
{
  id: "10716",
  title: "Something Was Wrong",
  description: "Something Was Wrong is an Iris Award–winning true-crime docuseries about…",
  image: "https://content.production.cdn.art19.com/images/…jpeg",
  seasons: 14,
  genres: [1, 2],
  updated: "2022-11-03T07:00:00.000Z"
}
```

---

## API & Events

- **Property**: `podcastData`  
  Assign a podcast object (as shown above) to this property on your `<podcast-card>` element.

- **Event**: `podcast-selected`
  - Fired whenever the user **clicks** or presses **Enter/Space** on a card.

---

## Accessibility & Support

- **Keyboard**: Cards are focusable (`tabindex="0"`) and respond to **Enter** or **Space** to open the modal.
- **Screen Readers**: Each image uses the podcast’s **description** as its `alt` text for context.
- **Responsive**: Cards and modal adapt to mobile and desktop layouts.

---

## Browser Compatibility

- Works in modern browsers: **Chrome**, **Firefox**, **Edge**, **Safari**.

---

Happy coding! 🎉
