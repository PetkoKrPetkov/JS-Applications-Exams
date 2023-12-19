import { html } from '../../node_modules/lit-html/lit-html.js';

import * as songsService from '../api/songs.js';

const catalogTemplate = (albums) => html`
  <!-- Dashboard page -->
  <h2>Products</h2>
  <section id="dashboard">
    ${albums.length > 0
      ? albums.map(cardTemplate)
      : html`<h2>No products yet.</h2>`}
  </section>
`;

const cardTemplate = (album) => html`
  <div class="product">
    <img src=${album.imageUrl} alt="example1" />
    <p class="title">${album.name}</p>
    <p><strong>Price:</strong><span class="price">${album.price}</span>$</p>
    <a class="details-btn" href="/details/${album._id}">Details</a>
  </div>
`;

export async function catalogPage(ctx) {
  const albums = await songsService.getAll();
  console.log(albums);
  ctx.render(catalogTemplate(albums));
}
