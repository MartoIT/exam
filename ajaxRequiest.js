import { clearUserData, getUserData } from '../utils.js';

 
const host = 'http://localhost:3030'

async function fetchRequiest(url, method, data){

    const options = {
        method,
        headers: {}
    }

    
    if(data != undefined){
        options.headers['Content-Type'] = 'aplication/json',
        options.body = JSON.stringify(data)
    }

    const userData = getUserData();
    if(userData){
        options.headers['X-Authorization'] = userData.accessToken;
    }


    try{
        const response = await fetch(host + url, options);
        if(response.ok == false) {
            if(response.status == 403) {
               clearUserData()
            }

            const error = await response.json();
            throw new Error(error.message)
        }

        if(response.status == 204) {
            return response;
        }else{
            return response.json()
        }

    }catch(error){
        alert(error.message);
        throw error;
    }

}

export async function get(url){
    return fetchRequiest(url, 'GET')
}

export async function post(url, data){
    return fetchRequiest(url, 'POST', data)
}

export async function put(url, data){
    return fetchRequiest(url, 'PUT', data)
}

export async function del(url){
    return fetchRequiest(url, 'DELETE')
}