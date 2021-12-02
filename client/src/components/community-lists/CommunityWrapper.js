import CommunityScreen from './CommunityScreen';
import { CommunityStoreContextProvider } from '../../stores/CommunityListsStore'

export default function CommunityWrapper(props) {

    return (
        <CommunityStoreContextProvider>
            <CommunityScreen></CommunityScreen>
        </CommunityStoreContextProvider>
    );
}