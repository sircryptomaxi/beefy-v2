const styles = theme => ({
  vaultContainer: {
    marginTop: '40px',
  },
  title: {
    marginTop: '40px',
    '& .MuiTypography-h1': {
      fontSize: '48px',
      lineHeight: '54px',
      fontWeight: 600,
      paddingLeft: '10px',
    },
    '& .MuiTypography-h2': {
      fontSize: '48px',
      lineHeight: '54px',
      fontWeight: 600,
      color: '#E88225',
    },
    '& .MuiAvatar-root:not(.MuiAvatarGroup-avatar)': {
      width: 54,
      height: 54,
    },
  },
  btnGoBack: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 600,
    color: '#6B7199',
    backgroundColor: '#14182B',
    letterSpacing: '0.2px',
    textTransform: 'inherit',
    borderRadius: '20px',
    padding: '6px 20px 6px 10px',
  },
  summary: {
    '& .MuiTypography-h1': {
      fontSize: '42px',
      lineHeight: '54px',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    '& .MuiTypography-body1': {
      fontSize: '18px',
      lineHeight: '24px',
      color: '#8585A6',
      letterSpacing: '0.2px',
    },
  },
  partner: {
    padding: '32px',
    borderRadius: '20px',
  },
  social: {
    textAlign: 'right',
    '& .MuiLink-root': {
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: '0.1px',
      marginLeft: '10px',
    },
  },
  partnerBody: {
    marginTop: '20px',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '32px',
  },
  splitPaper: {
    borderRadius: '20px',
    '& .MuiTypography-root': {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '30px',
      textAlign: 'center',
      '& span': {
        fontSize: '16px',
      },
    },
    '& .MuiTypography-h2': {
      fontSize: '15px',
      fontWeight: 400,
      color: '#8585A6',
      marginBottom: '30px',
    },
  },
  splitA: {
    backgroundColor: '#272B4A',
    width: '50%',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    padding: '32px',
  },
  splitB: {
    backgroundColor: '#313759',
    width: '50%',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    padding: '32px',
  },
  btnSubmit: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '0.2px',
    textTransform: 'none',
    color: '#ffffff',
    backgroundColor: '#54995C',
    borderRadius: '30px',
    padding: '6px 33px',
    '&:hover': {
      backgroundColor: '#389D44',
    },
  },
  btnClaim: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '0.2px',
    textTransform: 'none',
    color: '#ffffff',
    backgroundColor: 'none',
    borderRadius: '30px',
    borderColor: '#54995C',
    borderWidth: '2px',
    borderStyle: 'solid',
    padding: '6px 33px',
    '&:hover': {
      backgroundColor: 'rgba(20, 24, 43, 0.5)',
      borderColor: '#389D44',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0,0,0,0.9)',
    },
  },
  dw: {
    backgroundColor: '#272B4A',
    borderRadius: '20px',
    width: 400,
  },
  tabs: {
    backgroundColor: '#14182B',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    '& .MuiButton-root': {
      fontSize: '16px',
      fontWeight: 600,
      letterSpacing: '0.1px',
      textTransform: 'capitalize',
      color: '#6B7199',
      background: 'none',
      width: '50%',
      padding: 0,
      margin: 0,
      height: '60px',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      '&:hover': {
        background: 'none',
      },
    },
  },
  selected: {
    color: '#ffffff !important',
    borderBottom: 'solid 3px #3F466D',
  },
  balanceContainer: {
    '& .MuiAvatar-root:not(.MuiAvatarGroup-avatar)': {
      height: 16,
      width: 16,
    },
    '& .MuiTypography-body1': {
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'inherit',
      color: '#ffffff',
    },
    '& .MuiTypography-body2': {
      fontSize: '14px',
      fontWeight: 400,
      color: '#8585A6',
      letterSpacing: '0.2px',
      lineHeight: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
    },
    '& .MuiButton-root': {
      fontSize: '16px',
      fontWeight: 600,
      color: '#6B7199',
      backgroundColor: '#232743',
      borderRadius: '20px',
      textTransform: 'capitalize',
      letterSpacing: '0.1px',
      padding: '3px 15px',
      transition: 'color 0.2s',
      '&:hover': {
        color: '#ffffff',
        backgroundColor: '#3F466D',
        transition: 'color 0.1s',
      },
    },
  },
  inputContainer: {
    paddingTop: '10px',
    '& .MuiPaper-root': {
      position: 'relative',
      backgroundColor: '#14182B',
      border: 'solid 2px #3F466D',
      borderRadius: '30px',
      boxShadow: 'none',
      padding: 0,
      margin: 0,
      '& .MuiInputBase-input': {
        padding: '10px 5px 8px 40px',
        fontSize: '21px',
        fontWeight: 600,
      },
    },
    '& .MuiTextField-root': {
      backgroundColor: '#14182B',
      border: 'solid 2px #3F466D',
      borderRadius: '30px',
      padding: '3px 10px',
    },
    '& .MuiButton-root': {
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.5px',
      color: '#ffffff',
      backgroundColor: '#313759',
      borderRadius: '30px',
      margin: 0,
      padding: '5px 12px',
      position: 'absolute',
      top: '6px',
      right: '5px',
      minWidth: 0,
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  inputLogo: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    '& .MuiAvatar-root:not(.MuiAvatarGroup-avatar)': {
      height: 20,
      width: 20,
    },
  },
});

export default styles;
