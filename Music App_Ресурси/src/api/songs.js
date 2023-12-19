import * as api from './api.js';

//must be changed with the real endpoints
const endpoints = {
    albums: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    byId: '/data/albums/',
    deleteById: '/data/albums/',
    update: '/data/albums/',
};

export async function getAll() {
    return api.get(endpoints.albums);
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