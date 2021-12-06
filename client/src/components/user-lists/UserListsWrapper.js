import UserListsScreen from './UserListsScreen';
import { UserListsStoreContextProvider } from '../../stores/UserListsStore'

/**
 * Wrapper for the UserListsScreen page. Basically it just wraps the page
 * around it's corresponding store.
 * 
 * @author PeteyLumpkins
 */
export default function UserListsWrapper() {

    return (
        <UserListsStoreContextProvider>
            <UserListsScreen></UserListsScreen>
        </UserListsStoreContextProvider>
    );
}