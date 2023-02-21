import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import { setModalOpen } from '~/store/modalSilce';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 433,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const RegisterModal = () => {
  const isRegisterOpen = useSelector((state) => state.modal.open);
  const [isOpen, setIsOpne] = React.useState(isRegisterOpen);
  const dispatch = useDispatch();
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setIsOpne(false);
        dispatch(setModalOpen());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Form isRegister={'isRegister'} />
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(RegisterModal);
