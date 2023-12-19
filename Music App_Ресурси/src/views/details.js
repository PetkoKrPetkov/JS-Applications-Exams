import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gamesService from '../api/songs.js';

const detailsTemplate = (game, onDelete) => html`
  <!--Details Page-->
  <section id="detailsPage">
    <div class="wrapper">
      <div class="albumCover">
        <img src=${game.imgUrl} />
      </div>
      <div class="albumInfo">
        <div class="albumText">
          <h1>Name: ${game.name}</h1>
          <h3>Artist: ${game.artist}</h3>
          <h4>Genre: ${game.genre}</h4>
          <h4>Price: ${game.price}</h4>
          <h4>Date: ${game.releaseDate}</h4>
          <p>Description: ${game.description}</p>
        </div>

        <!-- Only for registered user and creator of the album-->

        ${game.isOwner
          ? html` <div class="actionBtn">
              <a href="/edit/${game._id}" class="edit">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" class="remove"
                >Delete</a
              >
            </div>`
          : nothing}
      </div>
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
