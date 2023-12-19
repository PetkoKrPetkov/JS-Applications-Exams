import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gamesServices from '../api/songs.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (game, onSubmit) => html`
  <!--Edit Page-->
  <section class="editPage">
    <form @submit=${onSubmit}>
      <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
          <label for="name" class="vhide">Album name</label>
          <input
            id="name"
            name="name"
            class="name"
            type="text"
            .value=${game.name}
          />

          <label for="imgUrl" class="vhide">Image Url</label>
          <input
            id="imgUrl"
            name="imgUrl"
            class="imgUrl"
            type="text"
            .value=${game.imgUrl}
          />

          <label for="price" class="vhide">Price</label>
          <input
            id="price"
            name="price"
            class="price"
            type="text"
            .value=${game.price}
          />

          <label for="releaseDate" class="vhide">Release date</label>
          <input
            id="releaseDate"
            name="releaseDate"
            class="releaseDate"
            type="text"
            .value=${game.releaseDate}
          />

          <label for="artist" class="vhide">Artist</label>
          <input
            id="artist"
            name="artist"
            class="artist"
            type="text"
            .value=${game.artist}
          />

          <label for="genre" class="vhide">Genre</label>
          <input
            id="genre"
            name="genre"
            class="genre"
            type="text"
            .value=${game.genre}
          />

          <label for="description" class="vhide">Description</label>
          <textarea
            name="description"
            class="description"
            rows="10"
            cols="10"
            .value=${game.description}
          ></textarea>

          <button class="edit-album" type="submit">Edit Album</button>
        </div>
      </fieldset>
    </form>
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
      imgUrl: data.imgUrl,
      price: data.price,
      releaseDate: data.releaseDate,
      artist: data.artist,
      genre: data.genre,
      description: data.description,
    }
  );
  event.target.reset();
  ctx.page.redirect('/details/' + gameId);
}
