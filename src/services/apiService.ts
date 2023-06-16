import { environment } from "../enviroments/enviroment.ts"
import axios, {AxiosInstance} from "axios";

export class apiService {
    private api: AxiosInstance;
    private token: string = '';

    constructor() {
        this.api = axios.create({
            baseURL: environment.API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        this.setToken();
    }

    /**
     * token related
     */
    public getToken() {
        this.token = localStorage.getItem('token') || '';
    }

    public setToken() {
        this.getToken();
        this.api.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    }

    /////////// Auth

    public async checkNickname(nickname: string) {
        return this.api.get(`/user/checkNickname/${nickname}`);
    }

    public async checkEmail(email: string) {
        return this.api.get(`/user/checkEmail/${email}`);
    }

    public async register(nick: string, email: string, password: string){
        return this.api.post('/user/register', {
            nickname: nick,
            email: email,
            password: password,
        });
    }

    public async login(email: string, password: string) {
        return this.api.post('/user/login', {
            email: email,
            password: password,
        });
    }


    ////////// Circle

    public async getMyCircles() {
        this.setToken();
        return this.api.get('/circle/myCircles');
    }

    public async getOneCircle(id: number) {
        this.setToken();
        return this.api.get(`/circle/circle/${id}`);
    }

    public async leaveCircle(id: number) {
        this.setToken();
        return this.api.delete(`/circle/leaveCircle/${id}`);
    }

    public async createCircle(name: string) {
        this.setToken();
        return this.api.post('/circle/createCircle', {
            name: name,
            description: 'a',
            is_private: 0,
        });
    }

    ////////// Posts

    public async getPostsByCircle(id: number) {
        this.setToken();
        return this.api.get(`/post/postsByCircle/${id}`);
    }

    public async sendPost(post_content: string, type: number, circle_id: number | undefined) {
        this.setToken();
        return this.api.post('/post/createPost', {
            post_content: post_content,
            type: type,
            circle_id: circle_id,
        });
    }

    public async uploadImage(formData: FormData, circle_id: number | undefined){
        this.setToken();

        formData.append('circle_id', String(circle_id)); // Añade circle_id al formData

        return this.api.post('/post/createImagePost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Cambia el encabezado solo para esta solicitud
                'Accept': 'application/json',
            },
        });
    }

    ////////// User

    public async getUserInfo(id: number) {
        return this.api.get(`/user/user/${id}`);
    }

    public async checkAuth() {
        this.setToken();
        return this.api.post('/user/verify');
    }

}