 import axios from "axios"


 const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true // we use this for ... now if we want to give any request from backend with help of axios then server has the accesss to read and set data into cookies
 })
 
 export async function register({ username, email, password }){
    try {
        const response = await api.post('api/auth/register', { username, email, password }) 
        return response.data
    } catch (err) {
        console.log(err) 
    }
 }

 export async function login({ email, password }){
    try {
        const response = await api.post('api/auth/login', { email, password }) 
        return response.data
    } catch (err) {
        console.log(err) 
    }
 }
 
 export async function logout(){
    try {
        const response = await api.get('api/auth/logout') 
        return response.data
    } catch (err) {
        console.log(err) 
    }
 }
 
export async function getMe(){
    try {
        const response = await api.get('api/auth/get-me') 
        return response.data
    } catch (err) {
        console.log(err) 
    }
 }
