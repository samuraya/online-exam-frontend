import axios from "axios";
//import API from "../config/config";
//import TokenService from "./token.service";
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
		//alert(local.read('auth_token'));
		if(IS_TOKEN_BASED){
			if(local.read('auth_token')!==null) {
				axios.defaults.headers.common["Authorization"] = 
				"Token "+local.read('auth_token');
			}

		}
		
		console.log(contentType);
		axios.defaults.
			headers.common["Content-Type"] 
			= contentType;
	},

	get(url) {
		//console.log('get request')
		return axios.get(url);
    },

	post(url, credentials = null, config = null) {
		//console.log('post request', credentials, API+url);			
		return axios.post(url, credentials, config);		
	},

	update(url, data = null) {
		//console.log(data);
		return axios.put(url, data);
	},

	delete(url, data = null) {
		return axios.delete(url, data);
	}


};


// const UserService = {


// }


export default ApiService;