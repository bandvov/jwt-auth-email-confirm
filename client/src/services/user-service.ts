import { $api } from "../api/user"
import { AxiosResponse } from 'axios';

export default class UserService {
    static fetchUsers():Promise<AxiosResponse<IUser[]>>{
    return $api.get<IUser[]>("/api/users");
    }
}