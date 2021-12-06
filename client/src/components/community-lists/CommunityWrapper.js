import CommunityScreen from './CommunityScreen';
import { CommunityStoreContextProvider } from '../../stores/CommunityListsStore'

/**
 * Providees a wrapper for the community lists screen and context.
 * @author PeteyLumpkins
 */
export default function CommunityWrapper() {

    return (
        <CommunityStoreContextProvider>
            <CommunityScreen></CommunityScreen>
        </CommunityStoreContextProvider>
    );
}