import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js'
import { homeView } from './views/home.js';
import { catalogView } from './views/catalog.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { getUserData } from './utils.js';
import { logout } from './requiests/users.js';
import { create } from './views/create.js';
import { detailsView } from './views/details.js';

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onlogOut)

page(decoratorContext);
page('/', homeView);
page('/allmemes', catalogView);
page('/memes/:id', detailsView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/create', create);
page('/profile', () => console.log(`Profile`));

updateNav();
page.start();

function myRender(resultTamplete){
    render(resultTamplete, main)
}

function decoratorContext(ctx, next){
    ctx.render = myRender;
    ctx.updateNav = updateNav;
    next()
}

function updateNav(){
    const userData = getUserData();
    if(userData){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`;

    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}


function onlogOut(){
    logout();
    updateNav();
    page.redirect('/');
}
