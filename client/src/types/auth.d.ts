interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
interface IUser {
    _id: string;
    email: string;
    isActivated: boolean
}