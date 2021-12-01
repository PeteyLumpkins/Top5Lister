import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

export default function LoginButton() {

    return (
        <Link to="/login/"><Button>Login</Button></Link>
    )
}