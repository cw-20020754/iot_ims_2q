import { makeStyles } from '@mui/styles';

const IotProtocolStyle = makeStyles((theme) => ({
  headerTitle: {
    padding: '5px',
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    position: 'sticky',
    top: 0,
    minHeight: 50,
  },
  itemContent: {
    overflow: 'auto',
    height: 'auto',
    maxHeight: 400,
  },
  itemExpanded: {
    height: 50,
  },
  headerAvatar: {
    marginRight: '5px',
  },
  cCard: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 1,
    margin: 1,
  },
  CButton: {
    borderWidth: 2,
    fontSize: '1.2rem',
    minWidth: '70px',
    '&.Mui-disabled': {
      borderWidth: 2,
      fontSize: '1.2rem',
    },
    '&:hover': {
      borderWidth: 2,
      fontSize: '1.2rem',
    },
  },
  formLabel: {
    width: '100%',
  },
}));

export default IotProtocolStyle;
