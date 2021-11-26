import { useContext, useEffect } from 'react'
import {ViewStoreContext} from '../store/view'
import {ViewStorePageType} from '../store/view'

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