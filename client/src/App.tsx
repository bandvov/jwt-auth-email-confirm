import React,{createContext, useEffect} from 'react';

import './App.css';
import store from './store/user-store'
import Login from './components/Login';
import { observer } from 'mobx-react-lite';
import {useContext} from 'react';
import UserService from './services/user-service';
export const Context = createContext(store)

const token = localStorage.getItem("accessToken")
function App() {
const {
  isAuth,
  user,
  logout,
  checkAuth,
  loading, 
  setUsers,
  users,
} = useContext(Context)

useEffect(()=>{
  
  if (token) {
    checkAuth()
  }
},[])

if (loading) {
 return <div>loading...</div>
}
if (!isAuth) {
  return <Login />
}
const getUsers = async () =>{
 UserService.fetchUsers().then(response=>{
   setUsers(response.data)
 }).catch(err=>{
   console.log(err);
 })
}
  return (
    <Context.Provider value={store}>
      <div><h2>User Authentificated</h2>
      {user.isActivated
      ? <h2>Account activated</h2>
      : <h2>Activate Account</h2>}
      <h3>Email: {user.email}</h3>
      <button onClick={()=>{        
        logout()}}>Log out!</button>
        <button onClick={getUsers}>Get users</button>
      </div>
     {users.length > 0 && <div>{users?.map(user=>{
        return (
        <div key={user._id}>
          {user.email}
        </div>
        )
      })}</div>}
    </Context.Provider>
  );
}

export default observer(App);
