import TextField from '@mui/material/TextField';

export default function SearchBar(props) {

    let searchPrompt = ""

    return ( 
        <TextField
            disabled={props.disabled}
            sx={{background: "white", width: "50%"}}
            variant="standard"
        />
   );
}