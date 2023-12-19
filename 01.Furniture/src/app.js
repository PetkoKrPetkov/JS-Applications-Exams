import page from '../node_modules/page/page.mjs';
import { userData } from './userDataHelper.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { myFurnitureView } from './views/myFurniture.js';
import { registerView } from './views/registerView.js';

const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');

page('/', catalogView);
page('/catalog', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/create', createView);
page('/myFurniture', myFurnitureView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

updateNav();

page.start();

export  function updateNav() {
    const userInfo = userData.getUserData();
    if(userInfo) {
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
    }
}
