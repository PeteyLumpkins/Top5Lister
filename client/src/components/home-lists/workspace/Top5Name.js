import { useContext, useState } from "react";
import { TextField, Box, Fab, Card } from '@mui/material/';

import {HomeStoreContext} from '../../../stores/HomeListsStore'

import EditIcon from '@mui/icons-material/Edit';

export default function Top5Name(props) {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.text);

    const { homeStore } = useContext(HomeStoreContext);

    const toggleEdit = () => {
        homeStore.setIsListNameEditActive(!editing);
        setEditing(!editing);
    }

    const handleEditText = (event) => {
        setText(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.code === 'Enter') {
            toggleEdit();
            homeStore.updateCurrentListName(text);
        }
    }

    let item = <Card sx={{p : '1%', height: '100%', background: "white", width: "45%" }}>{text}</Card>
    if (editing) {
        item = <TextField sx={{ 
            width: '45%',
            display: 'flex', 
            fontSize: '200%',
            background: 'white',
        }}
            onChange={(event) => { handleEditText(event); }}
            onKeyPress={(event) => { handleKeyPress(event); }}
            defaultValue={text}
        >
        </TextField>
    }
    
    
    return (
        <Box sx={{marginTop: 1, marginBottom: 1, borderRadius: 1, marginLeft: "5%", display: 'flex', alignItems: 'center', fontSize: '200%' }}>
            {item}
            <Box sx={{ p: 1 }}>
                <Fab
                    aria-label='edit'
                    onClick={toggleEdit}
                    color="primary"
                    disabled={editing || homeStore.isListNameEditActive || homeStore.isItemEditActive}
                    size="small"
                >
                    <EditIcon />
                </Fab>
            </Box>
        </Box>
    )
    
}