import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../stores'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState(props.text);

    function handleEditStart() {
        setEditActive(true);
        store.setIsItemEditActive(true);
    }

    function handleEditText(event) {
        setText(event.target.value);
    }

    function handleEditEnd(event) {
        console.log("Hit key")
        if (event.code === "Enter") {
            console.log("Hit enteer")
        }
    }

    let { index } = props;

    let itemClass = "top5-item";

    if (editActive) {

        return (
            <TextField
                margin="normal"
                required
                fullWidth
                id={"item-" + (index + 1)}
                label="Top 5 List Item"
                name="name"
                autoComplete="Top 5 List Item"
                onKeyPress={(event) => {
                    handleEditEnd(event);
                }}
                onChange={(event) => {
                    handleEditText(event);
                }}
                defaultValue={props.text}
                inputProps={{style: {fontSize: "100%"}}}
                InputLabelProps={{style: {fontSize: "100%"}}}
                autoFocus
            />
        );
    } else {
        return (
                <ListItem
                    id={'item-' + (index+1)}
                    key={props.key}
                    sx={{ display: 'flex'}}
                    style={{
                        fontSize: "100%",
                        width: '100%'
                    }}
                >
                <Box sx={{ p: 1 }}>
                    <IconButton aria-label='edit'
                        onClick={handleEditStart}
                    >
                        <EditIcon style={{fontSize: "100%"}}  
                        />
                    </IconButton>
                </Box>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
                </ListItem>
        );
    }

}

export default Top5Item;