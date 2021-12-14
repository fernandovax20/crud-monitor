import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, Image, InputGroup, FormControl, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import Imagen from "../../img/Logo.png"
import RingLoader from "react-spinners/RingLoader";
import './AddUser.css'
import AlertaContext from '../../Context/Alertas/AlertaContext';
import AuthContext from '../../Context/Autenticacion/authContext';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 100px;
  border-color: red;
`;

export default function AddUser() {


    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const {registrarUsuario, mensaje, registrado, estaRegistrado} = authContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(registrado) {
            setLoading(true);
            setTimeout(() => {
                navigate('/usuarios');
                estaRegistrado();
                setLoading(false);
                
            }, 3000);
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, registrado, navigate]);

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '123456',
        rol:'ADMIN'
    });

    // extraer de usuario
    const { nombre, email, password, rol } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if (nombre.trim() === '' ||
            email.trim() === '' ) {

            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');

            return;
        }
        var regex = /\S+@\S+\.\S+/;
        if (regex.test(email) === false) {
            mostrarAlerta('Correo no valido, ingrese nuevamente', 'alerta-error');
            return;
        }

        registrarUsuario({
            "nombre": nombre,
            "correo": email,
            "password": password,
            "rol": rol
        })

    }

    return (
        <div className='AddUser'>

            {loading ?
                (<div>
                    <h2 style={{ marginTop: 200, textAlign: 'center' }}>Usuario agregado exitosamente</h2>
                    <RingLoader color={'#2c69a6'} loading={loading} css={override} size={350} />
                </div>
                )
                :
                (
                    <div className="wave-wraper">
                        <div className="card">
                            <Card className="text-center" style={{ marginTop: 0 }}>

                                <Card.Body>
                                    <Image src={Imagen} style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px', width: 300 }} />
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Nombre"
                                            aria-label="Nombre"
                                            aria-describedby="basic-addon1"
                                            name="nombre"
                                            value={nombre}
                                            onChange={onChange}
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
                                            onChange={onChange}
                                        />
                                    </InputGroup>
                                    <Form.Select aria-label="Default select example" name="rol" style={{marginBottom:15}} onChange={onChange}>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                    </Form.Select>

                                
                                    {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}

                                    <Button style={{ background: '#2c69a6', width: "110px" }} onClick={onSubmit}>Agregar</Button>

                                </Card.Body>
                            </Card>
                        </div>



                        <div className="wave wave1"></div>
                        <div className="wave wave2"></div>
                        <div className="wave wave3"></div>
                    </div>
                )}

        </div>
    );
}
