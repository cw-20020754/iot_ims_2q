import { makeStyles } from '@mui/styles';

const fotaStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 500,
    fontSize: 20,
    paddingRight: 8,
    borderLeftStyle: 'solid',
    borderLeftWidth: '8px',
    borderLeftColor: theme.palette.primary.main,
  },
  hide: {
    display: 'none',
  },
  bottomFooter: {
    position: 'fixed',
    bottom: 0,
    paddingBottom: 10,
  },
  test: {
    backgroundColor: 'black',
  },
  title: {
    fontSize: '1.2rem',
  },
}));

export default fotaStyles;
