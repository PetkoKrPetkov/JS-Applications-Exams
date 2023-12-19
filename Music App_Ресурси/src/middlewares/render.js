import { render, html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = (user) => html`
  <nav>
    <img src="./images/headphones.png" />
    <a href="/">Home</a>
    <ul>
      <!--All user-->
      <li><a href="/catalog">Catalog</a></li>
      <li><a href="/search">Search</a></li>
      ${!user
        ? html`<!--Only guest-->
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>`
        : html`<!--Only user-->
            <li><a href="/create">Create Album</a></li>
            <li><a href="/logout">Logout</a></li>`}
    </ul>
  </nav>
`;
const header = document.querySelector('.my-header');
const root = document.getElementById('main-content');

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
  render(navTemplate(ctx.user), header)
  ctx.render = ctxRender;

  next();
}
