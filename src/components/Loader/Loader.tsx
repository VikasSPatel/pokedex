import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  ball: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    position: 'relative',
    background:
      'linear-gradient(to bottom, #e83e35 0%, #e83e35 50.5%, #ffffff 50.51%, #ffffff 100%)',
    boxShadow: '-6px 0 rgba(0, 0, 0, 0.1) inset',
    animation: '$roll 1s ease-in-out infinite',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 'calc(30px - 2px)',
      left: 0,
      width: 60,
      height: 4,
      background: '#3f3f3f',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 20,
      left: 20,
      width: 15,
      height: 15,
      border: '3px solid #3f3f3f',
      borderRadius: '50%',
      background: 'white',
      zIndex: 1,
      boxShadow: '0 0 8px -1px #c62828 inset',
      animation: '$button 3s ease infinite',
    },
  },

  '@keyframes roll': {
    from: { transform: 'rotate(0)' },
    '90%': { transform: 'rotate(720deg)' },
    to: { transform: 'rotate(720deg)' },
  },

  '@keyframes button': {
    from: { boxShadow: '0 0 8px -1px #c62828 inset' },
    '25%': { boxShadow: '0 0 6px -1px #1300ea inset' },
    '50%': { boxShadow: '0 0 8px -1px #c62828 inset' },
    '75%': { boxShadow: '0 0 6px -1px #1300ea inset' },
    to: { boxShadow: '0 0 8px -1px #c62828 inset' },
  },
});

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.ball}></div>
    </div>
  );
};

export default Loader;
