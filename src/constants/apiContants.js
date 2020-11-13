//export const API_BASE_URL = process.env.REACT_APP_SERVER_URL;
export const API_BASE_URL= process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'https://mujir.keren.banget/api'
export const ACCESS_TOKEN_NAME = 'login_access_token';
export const IMAGE_URL= process.env.NODE_ENV === 'development' ? 'http://localhost:8000/storage/' : 'https://mujir.keren.banget/api'