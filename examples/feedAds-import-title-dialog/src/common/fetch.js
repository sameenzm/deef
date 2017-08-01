export default (path, params = {}) => {
    return fetch('/api', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path,
            params
        })
    }).then(res => {
        return res.json()
    });
};