import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = (user) => html`
  <!-- Navigation -->
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

  <nav>
    <div>
      <a href="/catalog">Motorcycles</a>
      <a href="/search">Search</a>
    </div>
    ${user
      ? html` <!-- Logged-in users -->
          <div class="user">
            <a href="/create">Add Motorcycle</a>
            <a href="/logout">Logout</a>
          </div>`
      : html` <!-- Guest users -->
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
  </nav>
`;
const header = document.querySelector('header'); // make class on the header in html
const root = document.querySelector('main');

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(navTemplate(ctx.user), header);
  ctx.render = ctxRender;

  next();
}
