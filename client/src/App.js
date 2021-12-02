import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './auth';

import {
    AppBanner,
    HomeWrapper,
    CommunityWrapper,
    AllListsWrapper,
    UserListsWrapper,
    RegisterScreen,
    LoginScreen,
} from './components'

/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author PeteyLumpkins
*/
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>          
                <AppBanner />
                <Switch>
                    <Route path="/" exact component={HomeWrapper} />
                    <Route path="/alllists" exact component={AllListsWrapper} />
                    <Route path="/userlists" exact component={UserListsWrapper} />
                    <Route path="/communitylists" exact component={CommunityWrapper} />
                    <Route path="/login/" exact component={LoginScreen} />
                    <Route path="/register/" exact component={RegisterScreen} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App