import {Dialog, Card, Box, List, TextField} from '@mui/material/';
import { useContext } from 'react';

import {HomeStoreContext} from '../../store/home'

import Top5Name from './Top5Name';
import Top5Item from './Top5Item';
import SaveButton from '../buttons/SaveButton'
import PublishButton from '../buttons/PublishButton'

export default function WorkSpace() {

    const { homeStore } = useContext(HomeStoreContext);

    console.log(homeStore.isItemEditActive);
    return (
        <Box sx={{marginLeft: "5%", marginRight: "5%", height: "100%", width: "90%", backgroundColor: "lightblue"}}>
            <Top5Name marginLeft="5%" text={homeStore.currentList.name}></Top5Name>
                <List sx={{marginLeft: "5%", height: "75%", width: "100%"}}>

                    {
                    homeStore.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5item-' + (index + 1)} 
                            text={item} 
                            index={index}
                        />
                    ))
                    }
                </List>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                <Box sx={{width: "25%", justifyContent: 'space-around', alignItems: 'center', display: 'flex'}}> 
                    <SaveButton></SaveButton> 
                    <PublishButton></PublishButton>
                </Box>
            </Box>
        </Box>
    )
}