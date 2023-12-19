import * as api from './api.js';

//must be changed with the real endpoints
const endpoints = {
    games: '/data/motorcycles?sortBy=_createdOn%20desc',
    create: '/data/motorcycles',
    byId: '/data/motorcycles/',
    deleteById: '/data/motorcycles/',
    update: '/data/motorcycles/',
    search: '/data/motorcycles?where='
};

// export async function getRecent() {
//     return api.get(endpoints.recent);
// }

export async function getAll() {
    return api.get(endpoints.games);
}

export async function getById(id){
    return api.get(endpoints.byId + id);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function update(id, data) {
    return api.put(endpoints.update + id, data);
}

export async function deleteById(id) {
    return api.del(endpoints.deleteById + id);
}

export async function search(searched) {
    const query = encodeURIComponent(`model LIKE "${searched}"`);
    return api.get(`${endpoints.search}${query}`);
}