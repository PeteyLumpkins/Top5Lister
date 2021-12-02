import AllListsScreen from './AllListsScreen';
import { AllListsStoreContextProvider } from '../../stores/AllListsStore'

export default function AllListsWrapper(props) {

    return (
        <AllListsStoreContextProvider>
            <AllListsScreen></AllListsScreen>
        </AllListsStoreContextProvider>
    );
}