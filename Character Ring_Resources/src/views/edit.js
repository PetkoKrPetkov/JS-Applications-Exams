import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gamesServices from '../api/games.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (game, onSubmit) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Edit Character</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Character Type"
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
          rows="2"
          cols="10"
          .value=${game.description}
        ></textarea>
        <textarea
          id="additional-info"
          name="additional-info"
          placeholder="Additional Info"
          rows="2"
          cols="10"
          .value=${game.moreInfo}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
      <img class="border" src="./images/border.png" alt="" />
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
      imageUrl: data['image-url'], 
      description: data.description, 
      moreInfo: data['additional-info']
    }
  );
  event.target.reset();
  ctx.page.redirect('/details/' + gameId);
}
