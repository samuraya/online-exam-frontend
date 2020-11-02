import axios from "axios";
import { local } from "./localStorage.service";
import httpErrorHandler from "./httpErrorHandler";

const API = '/api';
const IS_TOKEN_BASED = false; //change to false if session based auth

const ApiService = {

	init() {
		axios.interceptors.response.use(
			(response)=>response,
			(error)=>httpErrorHandler(error)
		);
		axios.defaults.baseURL = API;
		
	},

	setHeader(contentType = `application/json`) {
		if(IS_TOKEN_BASED){
			if(local.read('auth_token')!==null) {
				axios.defaults.headers.common["Authorization"] = 
				"Token "+local.read('auth_token');
			}

		}
		axios.defaults.
			headers.common["Content-Type"] 
			= contentType;
	},

	get(url) {
		return axios.get(url);
    },

	post(url, credentials = null, config = null) {
		return axios.post(url, credentials, config);		
	},

	update(url, data = null) {
		return axios.put(url, data);
	},

	delete(url, data = null) {
		return axios.delete(url, data);
	}


};
export default ApiService;