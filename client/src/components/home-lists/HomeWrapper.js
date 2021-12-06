import { useContext } from 'react'

import HomeScreen from './HomeScreen'
import SplashScreen from '../splash/SplashScreen'
import AuthContext from '../../auth'

import { HomeStoreContextProvider } from '../../stores/HomeListsStore';

/**
 * Wrapper for the HomeListsScreen.
 * @author PeteyLumpkins
 */
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