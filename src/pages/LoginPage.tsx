import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
} from 'mdb-react-ui-kit';

interface FormValues {

    email: string;
    password: string;

}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axios.post('https://my-json-server.typicode.com/typicode/demo/posts', data);
            console.log('Response:', response.data);

            // If login is successful, navigate to a different page
            if (response.status === 200) {
                navigate('/'); // Change '/dashboard' to the route you want
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            // You can also display an error message to the user here
        }
    };
    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center">Login</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                                <p className="text-white-50 mb-3">Please enter your login and password!</p>

                                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email address"
                                        }
                                    })} />
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}


                                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"

                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}


                                <div className="d-flex justify-content-between mx-4 mb-4">
 

                                    <a href="#!">Forgot password?</a>
                                </div>
                                <MDBBtn size='lg'>
                                    Login
                                </MDBBtn>
                            </form>

                            <hr className="my-4" />

                            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }} onClick={() => navigate("/signup")}>
                                <MDBIcon fab className="mx-2" />
                                Not Registered? Sign Up
                            </MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default LoginPage;
