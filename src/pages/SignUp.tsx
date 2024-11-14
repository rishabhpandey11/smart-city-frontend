import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import useAppStore from '../appStore';

// Define the shape of form data
interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser); // Access the setUser function from Zustand


 // Define the form submission handler
 const onSubmit: SubmitHandler<FormValues> = async (data) => {
  try {
    const response = await axios.post('https://my-json-server.typicode.com/typicode/demo/posts', {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    console.log('Response:', response.data);

    setUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    // If the sign-up is successful, navigate to the login page or another page
    if (response.status === 201) {  // Assuming 201 is the success status code for creation
      navigate('/login');
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    // Handle error (e.g., display an error message to the user)
  }
};

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput
                    label='Your Name'
                    id='form1'
                    type='text'
                    className='w-100'
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && <p className="text-danger">{errors.name.message}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput
                    label='Your Email'
                    id='form2'
                    type='email'
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput
                    label='Password'
                    id='form3'
                    type='password'
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                  />
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput
                    label='Repeat your password'
                    id='form4'
                    type='password'
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === watch('password') || "Passwords do not match"
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                <MDBBtn type="submit" className='mb-4' size='lg'>Register</MDBBtn>

                <div className="text-center">
                  <p>Already Registered? <a href="#!" onClick={() => navigate("/login")}>Login</a></p>
                </div>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
