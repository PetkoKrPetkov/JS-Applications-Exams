import {userData} from './userDataHelper.js';

const host = "http://localhost:3030/";

async function requester(method, url, data) {
    const option = {
        method,
        headers:{}
    }

    if(data) {
        option.headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    const userInfo = userData.getUserData();

    if(userInfo) {
        option.headers["X-Authorization"] = userInfo.accessToken;
    }

    try {
        const response = await fetch(host + url, option);
        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message)
        }

        if(response.status === 204) {
            return response
        }

        return await response.json();
    } catch (error) {
        alert(error);
        throw error

    }
}

// const host = 'http://localhost:3030/'; kostadinov

// async function requester(method, url, data) {
//     const options = {
//         method,
//         headers: {}
//     }

//     if(data != undefined) {
//         options.headers['Content-Type'] = 'application/json' ;
//         options.body = JSON.stringify(data);
//     }

//     const user = JSON.parse(localStorage.getItem('user'));
//     if(user) {
//         const token = user.accessToken;
//         options.headers['X-Authorization'] = token;
//     }

//     try {
//         const response = await fetch (host + url, options);
        
//         if(response.ok != true) {
//             if(response.status == 403) {
//                 localStorage.removeItem('user');
//             }
//             const error = await response.json();
//             throw new Error(error.message);
//         }

//         if(response.status == 204) {
//             return response;
//         } else {
//             return response.json();
//         }
        
//     } catch (err) {
//         alert(err.message);
//         throw err;
//     }
// }
export function get(url) {
    return requester("GET", url)
}

export function post(url, data) {
    return requester("POST", url, data)
}

export function put(url,data) {
    return requester("PUT", url, data)
}

export function del(url) {
    return requester("delete", url)
}