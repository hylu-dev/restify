export async function post(url, payload, token="") {
    return await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
        });
}

export async function get(url, token="") {
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
        });
}