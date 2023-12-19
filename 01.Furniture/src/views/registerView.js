import {html, render} from '../../node_modules/lit-html/lit-html.js'
import { post } from '../api.js';
import { userData } from '../userDataHelper.js';
import  page  from '../../node_modules/page/page.mjs';
import { updateNav } from '../app.js';
const root = document.querySelector('.container')

const registerTemp = () => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${submitHandler}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
        `

export function registerView() {
    render(registerTemp(), root);
}

async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {email, password, rePass} = Object.fromEntries(formData);
    if(!email || !password || !rePass || rePass !== password) {
        return
    }
    const data = await post("users/register", {email, password});
    userData.setUserData(data);
    updateNav();
    page.redirect('/')
}