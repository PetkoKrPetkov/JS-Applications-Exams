import { html } from '../../node_modules/lit-html/lit-html.js';

import * as gamesService from '../api/games.js';

const catalogTemplate = (games) => html`
        <!-- Dashboard page -->
        <h2>Available Motorcycles</h2>
        <section id="dashboard">
            ${games.length > 0 
                ? games.map(cardTemplate) 
                : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
            
        </section>
 
`;

const cardTemplate = (game) => html`
  <div class="motorcycle">
    <img src=${game.imageUrl} alt="example1" />
    <h3 class="model">${game.model}</h3>
    <p class="year">Year: ${game.year}</p>
    <p class="mileage">Mileage: ${game.mileage} km.</p>
    <p class="contact">Contact Number: ${game.contact}</p>
    <a class="details-btn" href="/details/${game._id}">More Info</a>
  </div>
`;
//await api.getAll()
export async function catalogPage(ctx) {
  const games = await gamesService.getAll();
  console.log(games);
  ctx.render(catalogTemplate(games));
}
