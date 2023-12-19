import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const registerTemplate = (onSubmit) => html`
  <!-- Register Page (Only for Guest users) -->
  <section id="register">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Register</h2>
      <form @submit=${onSubmit} class="register-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
      </form>
      <img class="border" src="./images/border.png" alt="" />
    </div>
  </section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  if (data.email == '' || data.password == '') {
    alert('All fields are requered!');
    return;
  }
  if (data.password !== data['re-password']) {
    alert("Password don't match!");
    return;
  }

  await userService.register(data.email, data.password);
  event.target.reset();
  ctx.page.redirect('/');
}
