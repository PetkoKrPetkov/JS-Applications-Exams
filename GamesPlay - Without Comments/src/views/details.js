import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gamesService from '../api/games.js';

const detailsTemplate = (game, onDelete) => html`
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src=${game.imageUrl} />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
      </div>

      <p class="text">${game.summary}</p>

      <!-- Bonus ( for Guests and Users )
      <div class="details-comments">
        <h2>Comments:</h2>
        <ul>
          <li class="comment">
            <p>Content: I rate this one quite highly.</p>
          </li>
          <li class="comment">
            <p>Content: The best game.</p>
          </li>
        </ul>
        <p class="no-comment">No comments.</p>
      </div> -->

      <!-- Edit/Delete buttons ( Only for creator of this game )  -->
      ${game.isOwner
      ? html`
        <div class="buttons">
          <a href="/edit/${game._id}" class="button">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>`
        : nothing}

    </div>

    <!-- Bonus -->
    <!--     
    <article class="create-comment">
      <label>Add new comment:</label>
      <form class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment" />
      </form>
    </article>-->
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
      if(choice) {
        await gamesService.deleteById(gameId);
        ctx.page.redirect('/');
      } 
  }
}
