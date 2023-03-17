import dotenv from 'dotenv';
dotenv.config();

export const useHttp = () => {
    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(
                `${BACKEND_BASE_URL}${url}`, {
                method,
                headers,
                body,
                // withCredentials: true,
                // credentials: "include",
            });
            if (response.status === 422 || response.status === 401) {
                return response;
            }
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
                throw err;
        }
    };
    return {request};
}