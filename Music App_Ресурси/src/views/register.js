import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from  '../api/user.js';

const registerTemplate = (onSubmit) => html`
  <!--Registration-->
  <section id="registerPage">
    <form @submit=${onSubmit}>
      <fieldset>
        <legend>Register</legend>

        <label for="email" class="vhide">Email</label>
        <input
          id="email"
          class="email"
          name="email"
          type="text"
          placeholder="Email"
        />

        <label for="password" class="vhide">Password</label>
        <input
          id="password"
          class="password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <label for="conf-pass" class="vhide">Confirm Password:</label>
        <input
          id="conf-pass"
          class="conf-pass"
          name="conf-pass"
          type="password"
          placeholder="Confirm Password"
        />

        <button type="submit" class="register">Register</button>

        <p class="field">
          <span>If you already have profile click <a href="/login">here</a></span>
        </p>
      </fieldset>
    </form>
  </section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  
  if (data.email == '' || data.password == '') {
    alert('All fields are requered!')
    return 
  }
  if(data.password !== data['conf-pass']) {
    alert('Password don\'t match!');
    return
  }

  await userService.register(data.email, data.password);
  event.target.reset();
  ctx.page.redirect('/')
}
