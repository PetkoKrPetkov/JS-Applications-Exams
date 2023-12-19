import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = (user) => html`
  
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

  <nav>
    <div>
      <a href="catalog">Products</a>
    </div>
    ${!user
      ? html` <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`
      : html` <div class="user">
          <a href="/create">Add Product</a>
          <a href="/logout">Logout</a>
        </div>`}
  </nav>
`;
const header = document.querySelector('.my-header');
const root = document.querySelector('main');

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(navTemplate(ctx.user), header);
  ctx.render = ctxRender;

  next();
}
