import {$api} from "../api/user";
import {AxiosResponse} from "axios";
export default class AuthService {
    static async login(email:string,password: string):Promise<AxiosResponse<AuthResponse>>{
   return $api.post<AuthResponse>("/api/login",{email,password})
    }
    static async registation(email:string,password: string):Promise<AxiosResponse<AuthResponse>>{
   return $api.post<AuthResponse>("/api/registration",{email,password})
    }
    static async logout():Promise<void>{
   return $api.get("/api/logout")
    }
}

