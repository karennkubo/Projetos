import { Img } from "../styles/Login-style";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { goToLogin } from "../routes/Coordinator";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button variant='dark' onClick={()=>goToLogin(navigate)} style={{ alignSelf: "center", marginTop: '10px' }}>Voltar</Button>

            <Img src="https://httpstatusdogs.com/img/404.jpg" alt="error 404 - not found" />
            <h2>404 Not Found: The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible.</h2>
        </>
    )
}

export default Error;