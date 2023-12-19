import page  from '../../node_modules/page/page.mjs';
import { updateNav } from '../app.js';
import { get } from '../api.js';
import { userData } from '../userDataHelper.js';


export async function logoutView() {
    await get("users/logout");
    userData.clearUserData();
    updateNav();
    page.redirect("/");
}