import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '40px',
  },
  '& .MuiInputLabel-root': {
    top: '-10%',
    height: '30px',
    fontSize: '14px',
  },
});

export default CustomTextField;
