import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as gamesService from '../api/games.js';

const createTemplate = (onSubmit) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <h2>Add Motorcycle</h2>
    <div class="form">
      <h2>Add Motorcycle</h2>
      <form @submit=${onSubmit} class="create-form">
        <input type="text" name="model" id="model" placeholder="Model" />
        <input
          type="text"
          name="imageUrl"
          id="moto-image"
          placeholder="Moto Image"
        />
        <input type="number" name="year" id="year" placeholder="Year" />
        <input
          type="number"
          name="mileage"
          id="mileage"
          placeholder="mileage"
        />
        <input type="text" name="contact" id="contact" placeholder="contact" />
        <textarea
          id="about"
          name="about"
          placeholder="about"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Motorcycle</button>
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
      model: data.model,
      imageUrl: data.imageUrl, 
      year: data.year, 
      mileage: data.mileage,
      contact: data.contact,
      about: data.about
    }
  );
  event.target.reset();
  ctx.page.redirect('/catalog');
}
