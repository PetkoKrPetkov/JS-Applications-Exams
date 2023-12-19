import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gamesService from '../api/songs.js';

const detailsTemplate = (game, onDelete) => html`
  <!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${game.imgUrl} alt="example1" />
      <p id="details-title">${game.name}</p>
      <p id="details-category">
        Category: <span id="categories">${game.category}</span>
      </p>
      <p id="details-price">
        Price: <span id="price-number">${game.price}</span>$
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Bought: <span id="buys">0</span> times.</h4>
          <span>${game.description}</span>
        </div>
      </div>

      <!--Edit and Delete are only for creator-->
      ${game.isOwner
        ? html` <div id="action-buttons">
            <a href="/edit/${game._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >
          </div>`
        : nothing}
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const gameId = ctx.params.id;
  const game = await gamesService.getById(gameId);

  if (ctx.user) {
    const isOwner = ctx.user._id == game._ownerId;
    game.isOwner = isOwner;
  }
  ctx.render(detailsTemplate(game, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete ?');
    if (choice) {
      await gamesService.deleteById(gameId);
      ctx.page.redirect('/');
    }
  }
}
