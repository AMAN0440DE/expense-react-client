import axios from "axios";
import { store } from "./store";
import { SET_USER } from "./redux/user/action";

const setupAxios = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            // Check if error is 401 and not already retried
            // Also avoid infinite loop by checking if the failed request was the refresh verify itself
            if (error.response && error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/is-user-logged-in')) {
                originalRequest._retry = true;

                try {
                    // Attempt to refresh token (is-user-logged-in basically acts as refresh endpoint now)
                    const response = await axios.post('http://localhost:5001/auth/is-user-logged-in', {}, { withCredentials: true });

                    if (response.status === 200) {
                        // Update store with fresh user data
                        store.dispatch({
                            type: SET_USER,
                            payload: response.data.user
                        });

                        // Retry the original request
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh failed (refresh token expired or invalid)
                    console.log("Session expired completely.");
                    // Optionally dispatch logout here if needed, but App.jsx handles null user
                    // store.dispatch({ type: SET_USER, payload: null });
                }
            }
            return Promise.reject(error);
        }
    );
};

export default setupAxios;
