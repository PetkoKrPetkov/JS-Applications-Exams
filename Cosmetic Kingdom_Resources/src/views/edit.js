import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gamesServices from '../api/songs.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (game, onSubmit) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <h2>Edit Product</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Product Name"
          .value=${game.name}
        />
        <input
          type="text"
          name="imageUrl"
          id="product-image"
          placeholder="Product Image"
          .value=${game.imageUrl}
        />
        <input
          type="text"
          name="category"
          id="product-category"
          placeholder="Category"
          .value=${game.category}
        />
        <textarea
          id="product-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
          .value=${game.description}
        ></textarea>

        <input
          type="text"
          name="price"
          id="product-price"
          placeholder="Price"
          .value=${game.price}
        />
        <button type="submit">post</button>
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
      name: data.name,
      imageUrl: data.imageUrl,
      category: data.category,
      description: data.description,
      price: data.price,
    }
  );
  event.target.reset();
  ctx.page.redirect('/details/' + gameId);
}
