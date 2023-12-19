import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gamesService from '../api/games.js';

const detailsTemplate = (game, onDelete) => html`
  <!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${game.imageUrl} alt="example1" />
      <div>
        <p id="details-category">${game.category}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${game.description}</p>
            <p id="more-info">${game.moreInfo}</p>
          </div>
        </div>
        <h3>Is This Useful:<span id="likes">0</span></h3>
      </div>

      ${game.isOwner
        ? html` <div id="action-buttons">
            <a href="/edit/${game._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >

            <!--Bonus - Only for logged-in users ( not authors )-->
             <a href="" id="like-btn">Like</a> 
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
      ctx.page.redirect('/catalog');
    }
  }
}
