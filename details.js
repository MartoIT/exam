import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteMeme, getMemeById } from '../requiests/getAllMemes.js';
import { getUserData } from '../utils.js';

const detailsTamplete = (meme, isOwner, onDelete) => html`<section id="meme-details">
<h1>Meme Title: ${meme.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src="${meme.imageUrl}">
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${meme.description}
        </p>
        ${isOwner ? html `<!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        <a class="button warning" href="#">Edit</a>
        <button @click=${onDelete} class="button danger">Delete</button>` : ''}
        

    </div>
</div>
</section>`

export async function detailsView(ctx) {
    const meme = await getMemeById(ctx.params.id);
    const getUserData1 = getUserData()
    const isOwner = getUserData1?.id == meme._ownerId;
    ctx.render(detailsTamplete(meme, isOwner, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this meme?');

        if(choice) {
            await deleteMeme(ctx.params.id);
            ctx.page.redirect('/allmemes');
        }
    }


}