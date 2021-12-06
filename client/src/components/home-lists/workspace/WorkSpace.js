import {Dialog, Card, Box, List, TextField} from '@mui/material/';
import { useContext } from 'react';

import {HomeStoreContext} from '../../../stores/HomeListsStore'

import Top5Name from './Top5Name';
import Top5Item from './Top5Item';
import SaveButton from '../buttons/SaveButton'
import PublishButton from '../buttons/PublishButton'

/**
 * The Workspace where a user is able to edit the name and items of one of their 
 * top5lists.
 * @author PeteyLumpkins
 */
export default function WorkSpace() {

    const { homeStore } = useContext(HomeStoreContext);

    return (
        <Card sx={{
            marginLeft: "5%", 
            marginRight: "5%", 
            overflow: 'scroll',
            maxHeight: '100%',
            height: "100%", 
            width: "90%", 
            backgroundColor: "#e0e0e0",
            border: 1,
            borderColor: 'black'
        }}>
            <Top5Name text={homeStore.currentList.name}></Top5Name>
                <Card sx={{

                    marginLeft: '5%', 
                    marginRight: '5%',
                    height: "70%", width: "90%", 
                    background: "#0277bd"
                }}>
                    {
                    homeStore.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5item-' + (index + 1)} 
                            text={item} 
                            index={index}
                        />
                    ))
                    }
                </Card>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                <Box sx={{m : 2, width: "40%", justifyContent: 'space-around', alignItems: 'center', display: 'flex'}}> 
                    <SaveButton></SaveButton> 
                    <PublishButton></PublishButton>
                </Box>
            </Box>
        </Card>
    )
}