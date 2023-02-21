import { memo } from 'react';
import { Box, Button, TextField, Typography, useTheme, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';

import { setLogin } from '~/store/authSlice';
import { setAlert } from '~/store/alertSlice';
import { setModalOpen } from '~/store/modalSilce';
import FlexBetween from '~/components/FlexBetween';
import { URL } from '~/utils/fetchData';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Email invalid').required('required'),
  password: yup.string().required('required'),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};
const Form = ({ isRegister }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let name in values) {
      formData.append(name, values[name]);
    }
    formData.append('picturePath', values.picture.name);
    const savedUserResponse = await fetch(`${URL}/api/auth/register`, {
      method: 'POST',
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    console.log(savedUser);
    // onSubmitProps.resetForm();
    if (savedUser) {
      dispatch(setAlert({ success: true }));
      dispatch(setModalOpen());
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn.user) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }),
        navigate('/home'),
      );
    } else {
      navigate('/');
      dispatch(setAlert({ error: true }));
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (!isRegister) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={!isRegister ? initialValuesLogin : initialValuesRegister}
        validationSchema={!isRegister ? loginSchema : registerSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => {
          return (
            <form onSubmit={handleSubmit}>
              {/* Login */}
              {!isRegister && (
                <>
                  <Box padding="15px" display="grid" gap="20px" gridTemplateColumns="auto">
                    <TextField
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email || ''}
                      name="email"
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password || ''}
                      name="password"
                      error={Boolean(touched.password) && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                  {/* BUTTONS */}
                  <Box
                    sx={{
                      padding: '0px 15px 15px',
                      textAlign: 'center',
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                      sx={{
                        padding: '15px',
                        letterSpacing: '1px',
                        borderRadius: '5px',
                      }}
                    >
                      LOGIN
                    </Button>
                    <Typography my={2}>
                      <Link to="/">
                        <span
                          style={{
                            color: palette.primary.main,
                          }}
                        >
                          Forgotten password
                        </span>
                      </Link>
                    </Typography>
                    <Divider />
                    <Button
                      color="success"
                      variant="contained"
                      size="large"
                      sx={{
                        marginTop: '10px',
                        padding: '1em 2.5em',
                      }}
                      onClick={() => {
                        dispatch(setModalOpen());
                        resetForm();
                      }}
                    >
                      Create New Account
                    </Button>
                  </Box>
                </>
              )}
              {isRegister && (
                <Box padding="15px" display="grid" gap="16px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                  <Box sx={{ gridColumn: 'span 4' }}>
                    <FlexBetween>
                      <Typography variant="h2">Sign Up</Typography>
                      <CloseIcon cursor="pointer" onClick={() => dispatch(setModalOpen())} />
                    </FlexBetween>
                    <Typography>It's quick and easy</Typography>
                  </Box>
                  <TextField
                    label="FristName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName || ''}
                    name="firstName"
                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="LastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName || ''}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email || ''}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password || ''}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location || ''}
                    name="location"
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation || ''}
                    name="occupation"
                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Box
                    sx={{ gridColumn: 'span 4' }}
                    border={`1px solid ${palette.secondary.dark}`}
                    borderRadius="5px"
                    p={2}
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        return setFieldValue('picture', acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ '&:hover': { cursor: 'pointer' } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{ p: 2, gridColumn: 'span 4' }}
                  >
                    REGISTER
                  </Button>
                </Box>
              )}
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default memo(Form);
