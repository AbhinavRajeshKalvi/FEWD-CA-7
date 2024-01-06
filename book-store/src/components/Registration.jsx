import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Functional component for the registration form
const RegisterForm = () => {
  // Destructuring necessary functions and states from react-hook-form and useState
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isRegistered, setIsRegistered] = useState(false); 

  // Function to handle form submission
  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      setTimeout(() => {
        location.href = "/";
      }, 3000);
      // Display success toast message
      toast.success("Form submitted successfully!");
      setIsRegistered(true);
  
      // Storing form data in local storage
      localStorage.setItem('formData', JSON.stringify(data));
    } else {
      // Display error toast message if form has errors
      toast.error("Form not submitted. Please fix the errors.");
    }
    console.log(data);
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register Now</h2>

      <br/>

      {/* Input field for Name */}
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name should be at least 3 characters' }, maxLength: { value: 30, message: 'Name should not exceed 30 characters' } })}
        />
        {errors.name && <p>{errors.name.message}</p>} {/* Display error message if any */}
      </div>

      <br />

      {/* Input field for Email */}
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email address' } })}
        />
        {errors.email && <p>{errors.email.message}</p>} {/* Display error message if any */}
      </div>

      <br />

      {/* Input field for Password */}
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          {...register('password', { required: 'Password is required', minLength: { value: 10, message: 'Password should be at least 10 characters' }, pattern: { value: /^(?=.*[!@#$%^&*])/, message: 'Password should contain at least one special character' } })}
        />
        {errors.password && <p>{errors.password.message}</p>} {/* Display error message if any */}
      </div>

      <br />

      {/* Input field to repeat Password */}
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeatPassword"
          {...register('repeatPassword', { required: 'Repeat Password is required', validate: value => value === watch('password') || 'Passwords do not match' })}
        />
        {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>} {/* Display error message if any */}
      </div>

      <br />
      <button type="submit">Sign Up</button>
        <ToastContainer /> {/* Component to display toast messages */}
      </form>
    </div>
  );
};

export default RegisterForm;
