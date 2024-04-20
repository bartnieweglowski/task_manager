import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const validateForm = () => {
        const errors = [];
        if (!username.trim()) errors.push("Username is required.");
        if (!password) errors.push("Password is required.");
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (formErrors.length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });
            setToken(response.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setErrors(['Login failed. Invalid username or password.']);
            } else {
                setErrors(['Login failed due to server error. Please try again later.']);
            }
        }
    };

    return (
        <div className='login-background'>
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
                    {errors.length > 0 && errors.map((error, index) => (
                        <Alert key={index} variant="danger">{error}</Alert>
                    ))}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button className="w-100 mt-3" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </div>
    );
};

export default Login;
