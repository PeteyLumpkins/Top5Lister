import UserListsScreen from './UserListsScreen';
import { UserListsStoreContextProvider } from '../../stores/UserListsStore'

export default function UserListsWrapper(props) {

    return (
        <UserListsStoreContextProvider>
            <UserListsScreen></UserListsScreen>
        </UserListsStoreContextProvider>
    );
}