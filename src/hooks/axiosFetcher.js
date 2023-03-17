import {useState, useEffect} from 'react';
import axios from 'axios';

export const BACKEND_BASE_URL = 'http://localhost:8000';

const axiosFetcher = ({url, method, headers = null, body = null}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const $api = axios.create({
        withCredentials: true,
        baseURL: BACKEND_BASE_URL
    });

    $api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config;
    });

    const fetchData = () => {
       $api[method](url, JSON.parse(headers), JSON.parse(body))
           .then(res => setResponse(res.data))
           .catch(err => setError(err))
           .finally(() => setLoading(false));
    };
    fetchData();
    // useEffect(() => {
    //     fetchData();
    // }, [method, url, body, headers]);

    return {response, error, loading};
};

export default axiosFetcher;