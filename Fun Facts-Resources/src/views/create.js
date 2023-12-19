import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as gamesService from '../api/games.js';

const createTemplate = (onSubmit) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <h2>Add Fact</h2>
      <form @submit=${onSubmit} class="create-form">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
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
          rows="10"
          cols="50"
        ></textarea>
        <textarea
          id="additional-info"
          name="additional-info"
          placeholder="Additional Info"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Fact</button>
      </form>
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
      imageUrl: data.imageUrl, 
      description: data.description, 
      moreInfo: data.moreInfo
    }
  );
  event.target.reset();
  ctx.page.redirect('/');
}
