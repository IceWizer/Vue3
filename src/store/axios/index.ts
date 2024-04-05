import axios from "axios";
import useJwt from "../../auth/utils/useJwt";

const apiRequest = (
    url: string,
    method: string = 'GET',
    onSuccess = () => { },
    data = null,
    headers =
        {
            'accept': 'application/ld+json',
            'Authorization': 'Bearer ' + useJwt.getJwt(),
        }
) => {
    url = env.API_URL + url;

    if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
        method = 'GET';
    }

    if (method === 'GET') {
        // Format data to query string
        let queryString = '';
        if (data) {
            queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
        }
        if (queryString) {
            url += '?' + queryString;
        }
    }

    return new Promise((resolve, reject) => {
        axios({
            url,
            method,
            data: data,
            headers
        })
            .then((response) => {
                onSuccess && onSuccess(response);
                resolve(response.data['hydra:member'] || response.data || response);
            })
            .catch((error) => {
                reject(error);
            });
    }
    );
}

export {
    apiRequest
};
