import { makeAutoObservable } from 'mobx';
import authService from '../services/auth-service';
import axios from 'axios';

class UserStore {
    isAuth = false;
    user = {}  as IUser;
    loading = false;
    users = [] as IUser[];
constructor(){
    makeAutoObservable(this)
}
setIsAuth(isAuth: boolean){
    this.isAuth = isAuth;
}
setUser(user: IUser){
    this.user= user;
}
setUsers =(users:IUser[])=> {
    this.users = users;
}
 login =async(email:string,password: string) => {
    try{
    const response = await authService.login(email, password);
        localStorage.setItem("accessToken",response.data.accessToken);
        this.setIsAuth(true);
        this.setUser(response.data.user);
    }catch(e){
        console.log(e);
    }
}
 registration = async (email:string,password: string)=> {
    try{
    const response = await authService.registation(email, password);
        localStorage.setItem("accessToken",response.data.accessToken);
        this.setIsAuth(true);
        this.setUser(response.data.user);
    }catch(e){
        console.log(e);
    }
}
 logout = async () => {
   try {
       authService.logout()
       this.setIsAuth(false)
       this.setUser({} as IUser)
    }catch(e){
        console.log(e);
        
    }
}
setLoading = (loading: boolean) => {
    this.loading = loading
}
checkAuth = async() => {
    this.setLoading(true)
    axios.post<AuthResponse>( "http://localhost:5000/api/refresh",
    {},{withCredentials:true}    
).then((res)=>{
        this.setUser(res.data.user)
        this.setIsAuth(true)
    }).catch((err) => {
        console.log(err);
    }).finally(()=>this.setLoading(false));
    }
}
export default new UserStore()