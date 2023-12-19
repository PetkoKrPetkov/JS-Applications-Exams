import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gamesServices from '../api/games.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (game, onSubmit) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <h2>Edit Motorcycle</h2>
    <div class="form">
      <h2>Edit Motorcycle</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input type="text" name="model" id="model" placeholder="Model" .value=${game.model}/>
        <input
          type="text"
          name="imageUrl"
          id="moto-image"
          placeholder="Moto Image"
          .value=${game.imageUrl}
        />
        <input type="text" name="year" id="year" placeholder="Year" .value=${game.year}/>
        <input
          type="number"
          name="mileage"
          id="mileage"
          placeholder="mileage"
          .value=${game.mileage}
        />
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="contact"
          .value=${game.contact}
        />
        <textarea
          id="about"
          name="about"
          placeholder="about"
          rows="10"
          cols="50"
          .value=${game.about}
        ></textarea>
        <button type="submit">Edit Motorcycle</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const gameId = ctx.params.id;
  const game = await gamesServices.getById(gameId);
  console.log(Number(game.year));
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
      model: data.model,
      imageUrl: data.imageUrl, 
      year: data.year, 
      mileage: data.mileage,
      contact: data.contact,
      about: data.about  
    }
  );
  event.target.reset();
  ctx.page.redirect('/details/' + gameId);
}
