import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/games.js';

const searchTemplate = (searchHandler, result) => html`
  <!-- Search page -->
  <section id="search">
    <div class="form">
      <h4>Search</h4>
      <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list" @click=${searchHandler}>Search</button>
      </form>
    </div>
    <h4 id="result-heading">Results:</h4>
    <div class="search-result">
      <!--If there are matches display a div with information about every motorcycle-->
      ${result.length > 0
        ? result.map(cardTemplate)
        : html`<h2 class="no-avaliable">No result.</h2>`}
    </div>
  </section>
`;

const cardTemplate = (motor) => html`
  <div class="motorcycle">
    <img src=${motor.imageUrl} alt="example1" />
    <h3 class="model">${motor.model}</h3>
    <a class="details-btn" href="/details/${motor._id}">More Info</a>
  </div>
`;

export async function searchView(ctx) {
  
  async function searchHandler(e) {
    e.preventDefault();
    let searchEl = document.getElementById('search-input');
    console.log(searchEl.value);
    let result = await search(searchEl.value);
    console.log(result);
    ctx.render(searchTemplate(searchHandler, result))
  }
  ctx.render(searchTemplate(searchHandler, []));
}
