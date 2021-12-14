import React, {useState, useContext} from 'react';
import { Button, Card, InputGroup, FormControl, Form } from 'react-bootstrap';
import AlertaContext from '../../Context/Alertas/AlertaContext';
import usuariosContext from '../../Context/Usuarios/usuariosContext';



const EditUser = ({usuarios, close}) => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const usuarioContext = useContext(usuariosContext);
    const {editarUsuario} = usuarioContext;


    const [usuario, guardarUsuario] = useState({
        nombre: usuarios.nombre,
        email: usuarios.correo,
        rol: usuarios.rol,
        password: '123456',
        confirmar: '123456'
    });

    

    // extraer de usuario
    const { nombre, email, password, confirmar, rol } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }
    
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if( nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === '' ) {
                
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
                
                return;
        }
        var regex = /\S+@\S+\.\S+/;
        if (regex.test(email) === false) {
            mostrarAlerta('Correo no valido, ingrese nuevamente', 'alerta-error');
            return;
        }

        // Password minimo de 6 caracteres
        if(password.length < 6) {
            mostrarAlerta('La contraseña debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        // Los 2 passwords son iguales
        if(password !== confirmar) {
            mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');
            return;
        }
        
        editarUsuario(usuarios.uid,{
            "nombre": nombre,
            "correo": email,
            "password":password,
            "rol": rol
        })
        close();

    }

    return (
        <div>
                
                    <div className="card">
                        <Card className="text-center" style={{marginTop:0}}>

                            <Card.Body>
                               
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Nombre"
                                        aria-label="Nombre"
                                        aria-describedby="basic-addon1"
                                        name="nombre"
                                        value={nombre}
                                        onChange = {onChange}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Correo"
                                        aria-label="Correo"
                                        aria-describedby="basic-addon1"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange = {onChange}
                                    />
                                </InputGroup>
                                <Form.Select aria-label="Default select example" name="rol" value={rol} style={{marginBottom:15}} onChange={onChange}>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                </Form.Select>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Contraseña"
                                        aria-label="Contraseña"
                                        aria-describedby="basic-addon1"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange = {onChange}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Contraseña nuevamente"
                                        aria-label="Contraseña"
                                        aria-describedby="basic-addon1"
                                        type="password"
                                        name="confirmar"
                                        value={confirmar}
                                        onChange = {onChange}
                                    />
                                </InputGroup>
                                {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
                                <Button style={{ background: '#2c69a6', width:"110px"}} onClick={onSubmit}>Editar</Button>
                                
                            </Card.Body>
                        </Card>
                    </div>
                
            

        </div>
    );
}

export default EditUser;