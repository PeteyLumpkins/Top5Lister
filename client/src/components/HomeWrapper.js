import { useContext } from 'react'
import { HomeStoreContextProvider } from '../store/home'

import HomeScreen from './screens/HomeListsScreen'
import SplashScreen from './screens/SplashScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);

    if (auth.loggedIn)
        return <HomeScreen />
    else
        return <SplashScreen />
}