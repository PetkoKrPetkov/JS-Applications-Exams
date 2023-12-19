import * as api from './api.js';

//must be changed with the real endpoints
const endpoints = {
    games: '/data/characters?sortBy=_createdOn%20desc',
    create: '/data/characters',
    byId: '/data/characters/',
    deleteById: '/data/characters/',
    update: '/data/characters/',
};

export async function getRecent() {
    return api.get(endpoints.recent);
}

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