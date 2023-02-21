import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { css, keyframes } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '~/store/alertSlice';
import { clear } from '@testing-library/user-event/dist/clear';


const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const AlertCusttom = () => {
  const dispatch = useDispatch()
  const alertState = useSelector(state => state.alert)
  const [alert, setAlert] = useState({})
  console.log("alert")
  useEffect(() => {
    setAlert(alertState)
    const timeId = setTimeout(() => {
    setAlert({})
    }, 2000);
    return () => clearTimeout(timeId)
  },[alertState])
  return (
    <>
     {/* success alert */}
      {alert?.success && <Alert
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: '1000000',
          animation: css`
            ${fadeOut} 1s linear 2s both
          `,
        }}
        severity="success"
      >
        action success
      </Alert>}
      
      { alert?.error && <Alert
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: '1000000',
          animation: css`
            ${fadeOut} 1s linear 2s both
          `,
        }}
        severity="error"
      >
        action not validate, try again
      </Alert>}
    </>
  );
};

export default AlertCusttom