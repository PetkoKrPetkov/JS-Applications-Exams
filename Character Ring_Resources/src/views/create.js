import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as gamesService from '../api/games.js';

const createTemplate = (onSubmit) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Add Character</h2>
      <form @submit=${onSubmit} class="create-form">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Character Type"
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="2"
          cols="10"
        ></textarea>
        <textarea
          id="additional-info"
          name="additional-info"
          placeholder="Additional Info"
          rows="2"
          cols="10"
        ></textarea>
        <button type="submit">Add Character</button>
      </form>
      <img class="border" src="./images/border.png" alt="" />
    </div>
  </section>
`;

export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  if (Object.values(data).some((f) => f == '')) {
    //validation
    return alert('all fields are required!');
  }

  await gamesService.create(
    //you must put here the right object for your create case
    {
      category: data.category,
      imageUrl: data["image-url"], 
      description: data.description, 
      moreInfo: data["additional-info"]
    }
  );
  event.target.reset();
  ctx.page.redirect('/catalog');
}
