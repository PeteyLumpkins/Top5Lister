import AllListsScreen from './AllListsScreen';
import { AllListsStoreContextProvider } from '../../stores/AllListsStore'

/**
 * A wrapper for the AllListsScreen and AllListsContext
 * @author PeteyLumpkins
 */
export default function AllListsWrapper() {

    return (
        <AllListsStoreContextProvider>
            <AllListsScreen></AllListsScreen>
        </AllListsStoreContextProvider>
    );
}