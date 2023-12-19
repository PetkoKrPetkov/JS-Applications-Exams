import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gamesService from '../api/games.js';

const homeTemplate = () => html`
  <!-- Home page -->
  <section id="home">
    <h1>
      Welcome to <span>Samurider</span> moto market, your premier destination
      for Japanese motorcycles.
    </h1>
    <img src="./images/motorcycle.png" alt="home" />
  </section>
`;

export async function homePage(ctx) {
  ctx.render(homeTemplate());
}
