import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/caledarApi";
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        
        dispatch(onChecking());

        try{
            const {data} = await calendarApi.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            dispatch(onLogin({name: data.name, uid: data.uid}));
           
        } catch(error){
            console.log(error)
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {dispatch(clearErrorMessage())}, 10)
        }
    }

    const startRegister = async({name, email, password}) => {

        dispatch(onChecking());

        try{
            const {data} = await calendarApi.post('/auth/new', {email, password, name});
            localStorage.setItem('token', data.token);
            dispatch(onLogin({name: data.name, uid: data.uid}));
           
        } catch(error){
            console.log(error)
            dispatch(onLogout(error.response.data?.msg || 'Error'));
            setTimeout(() => {dispatch(clearErrorMessage())}, 10)
        }
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegister
    }
}
