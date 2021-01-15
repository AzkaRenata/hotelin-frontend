//export const API_BASE_URL = process.env.REACT_APP_SERVER_URL;
export const API_BASE_URL= process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'http://api.hotelin.live/api'
export const ACCESS_TOKEN_NAME = 'login_access_token';
export const IMAGE_URL= process.env.NODE_ENV === 'development' ? 'http://localhost:8000/storage/' : 'http://api.hotelin.live:8000/storage/'
