import { useContext } from 'react'

import HomeScreen from './HomeScreen'
import SplashScreen from '../screens/SplashScreen'
import AuthContext from '../../auth'

import { HomeStoreContextProvider } from '../../store/home';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);

    if (auth.loggedIn)
        return (
            <HomeStoreContextProvider>
                <HomeScreen />
            </HomeStoreContextProvider>
        );
    else
        return <SplashScreen />
}