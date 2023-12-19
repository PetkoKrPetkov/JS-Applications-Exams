import { html } from '../../node_modules/lit-html/lit-html.js';

import * as gamesService from '../api/games.js';

const catalogTemplate = (games) => html`
  <!-- Dashboard page -->
  <h2>Fun Facts</h2>
  <section id="dashboard">
    ${games.length > 0
    ? games.map(cardTemplate)
    : html`<h2>No Fun Facts yet.</h2>`
    }
  </section>
`;

const cardTemplate = (game) => html`
  <div class="fact">
    <img src=${game.imageUrl} />
    <h3 class="category">${game.category}</h3>
    <p class="description">${game.description}</p>
    <a class="details-btn" href="/details/${game._id}">More Info</a>
  </div>
`;
//await api.getAll()
export async function catalogPage(ctx) {

  const games = await gamesService.getAll();
  console.log(games);
  ctx.render(catalogTemplate(games));
}
