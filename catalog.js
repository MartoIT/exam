import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllmemes } from '../requiests/getAllMemes.js';

const catalogTamplete = (memes) => html`<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length == 0 ? html `<p class="no-memes">No memes in database.</p>` : memes.map(memecard)}
        
    </div>
</section>`

const memecard = (meme) => html`<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/memes/${meme._id}">Details</a>
        </div>
    </div>
</div>`

export async function catalogView(ctx) {
    const memes = await getAllmemes();
    ctx.render(catalogTamplete(memes));
}