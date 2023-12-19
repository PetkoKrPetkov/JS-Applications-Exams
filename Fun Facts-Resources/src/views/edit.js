import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gamesServices from '../api/games.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (game, onSubmit) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <h2>Edit Fact</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          .value=${game.category}
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
          .value=${game.imageUrl}
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
          .value=${game.description}
        ></textarea>
        <textarea
          id="additional-info"
          name="additional-info"
          placeholder="Additional Info"
          rows="10"
          cols="50"
          .value=${game.moreInfo}
        ></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const gameId = ctx.params.id;
  const game = await gamesServices.getById(gameId);
  ctx.render(editTemplate(game, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  const gameId = ctx.params.id;

  if (Object.values(data).some((f) => f == '')) {
    //validation
    return alert('all fields are required!');
  }

  await gamesServices.update(
    gameId, //you must put here the right object for your create case
    {
      category: data.category,
      imageUrl: data.imageUrl, 
      description: data.description, 
      moreInfo: data.moreInfo   
    }
  );
  event.target.reset();
  ctx.page.redirect('/details/' + gameId);
}
