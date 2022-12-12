import { html } from '../../node_modules/lit-html/lit-html.js';
import { createMeme } from '../requiests/getAllMemes.js';

const createTamplete = (onSubmit) => html`<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`

export function create(ctx) {

    ctx.render(createTamplete(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const meme = {
            title: form.get('title'),
            description: form.get('description'),
            imageUrl: form.get('imageUrl')
        }

        if (meme.title == '' || meme.description == '' || meme.imageUrl == '') {
            return alert('All fileds are requierd!');
        }

        await createMeme(meme);
        ctx.page.redirect('/allmemes')
    }
}