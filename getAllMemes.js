import { del, get, post } from './ajaxRequiest.js';


export async function getAllmemes(){
    return get('/data/memes?sortBy=_createdOn%20desc')
}


export async function getMemeById(id) {
    return get('/data/memes/' + id)
}
export async function deleteMeme(id){
    return del('/data/memes/' + id)
}

export async function createMeme(meme){
    return post('/data/memes', meme)
}