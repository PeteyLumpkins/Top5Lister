import { useState, useContext } from "react";
import { TextField, Box, Fab, Card } from '@mui/material/';

import {HomeStoreContext} from '../../../stores/HomeListsStore'

import EditIcon from '@mui/icons-material/Edit';

export default function Top5Item(props) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.text);

    const { homeStore } = useContext(HomeStoreContext);

    const toggleEdit = () => {
        homeStore.setIsItemEditActive(!editing)
        setEditing(!editing);
    }

    const handleEditText = (event) => {
        setText(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.code === 'Enter') {
            toggleEdit();
            homeStore.updateCurrentListItem(props.index, text); 
        }
    }

    let item = <Card sx={{ border: 1, borderColor: 'black', padding: "1%", background: "#ffc107", height: '68%', width: "78%" }}>{text}</Card>;
    if (editing) {
        item = <TextField sx={{ 
            width: '80%', height: '65',
            border: 1, borderColor: 'black',
            display: 'flex', 
            margin: 0,
            padding: 0,
            fontSize: '100%',
            background: '#ffc107',
        }}
            onChange={(event) => { handleEditText(event); }}
            onKeyPress={(event) => { handleKeyPress(event); }}
            defaultValue={text}
        >
        </TextField>
    }

    return (
        <Box sx={{ 
            m : 1, 
            paddingLeft: 2, paddingRight: 2, 
            borderRadius: 1, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '200%' ,
            height: '15%'
        }}>
            <Card sx={{border: 1, borderColor: 'black', height: '68%', p : '1%', marginRight: '2%', background: "#ffc107"}}>{(props.index + 1) + "."}</Card>
            {item}
            <Box sx={{ p: 1 }}>
                <Fab
                    aria-label='edit'
                    onClick={toggleEdit}
                    color="primary"
                    disabled={editing || homeStore.isItemEditActive || homeStore.isListNameEditActive}
                    size="small"
                >
                    <EditIcon />
                </Fab>
            </Box>
        </Box>)
}
