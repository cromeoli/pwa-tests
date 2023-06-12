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


}