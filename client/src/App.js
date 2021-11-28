import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import { ViewStoreContextProvider } from './store/view'
import { HomeStoreContextProvider } from './store/home'

import UserListsScreen from './components/screens/UserListsScreen';
import CommunityListsScreen from './components/screens/CommunityListsScreen';
import AllListsScreen from './components/screens/AllListsScreen';

import {
    AppBanner,
    HomeWrapper,
    RegisterScreen,
    
    LoginScreen,
    NavBar,
} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider> 
                    <ViewStoreContextProvider>  
                        <HomeStoreContextProvider>           
                        <AppBanner />
                        <Switch>
                            <Route path="/" exact component={HomeWrapper} />
                            <Route path="/alllists" exact component={AllListsScreen} />
                            <Route path="/userlists" exact component={UserListsScreen} />
                            <Route path="/communitylists" exact component={CommunityListsScreen} />
                            <Route path="/login/" exact component={LoginScreen} />
                            <Route path="/register/" exact component={RegisterScreen} />
                        </Switch>
                        </HomeStoreContextProvider>
                    </ViewStoreContextProvider>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App