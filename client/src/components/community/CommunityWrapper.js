import CommunityScreen from './CommunityScreen';
import { CommunityStoreContextProvider } from '../../store/community'

export default function CommunityWrapper(props) {

    return (
        <CommunityStoreContextProvider>
            <CommunityScreen></CommunityScreen>
        </CommunityStoreContextProvider>
    );
}