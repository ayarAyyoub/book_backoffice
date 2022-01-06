import axios from 'axios';

let instance = axios.create();

instance.defaults.headers.common['Accept']  = 'application/json';
instance.defaults.headers.common['Content-Type']  = 'application/json'; 
export default instance;