import { Box, Button, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const CreateApplicant = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('First Name is required'),
    second_name: Yup.string().required('Second name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const onVerifyAccount = useStoreActions((actions) => actions.main.onVerifyAccount);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => verifyAccount(data);

  const verifyAccount = (data) => {
    onVerifyAccount(data);
  };

  const handleClick = (e) => {
    console.log(e);
  };

  const useStyles = makeStyles(() => ({
    container: {
      width: '100%',
      maxWidth: 560,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    },
    wrapper: {
      display: 'flex',
      paddingLeft: 40,
      paddingRight: 40,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 16,
      marginTop: 24,
      marginBottom: 24,
    },
    formTitle: {
      fontSize: '20px !important',
      fontWeight: '700 !important',
    },
    formDescription: {
      textAlign: 'left',
      fontSize: '16px !important',
    },
    inputGroup: {
      marginBottom: '24px !important',
      textAlign: 'left',
    },
    input: {
      '& .MuiFilledInput-root': {
        borderRadius: 4,
        '& input': {
          paddingTop: 16,
          paddingRight: 36,
          paddingBottom: 14,
          paddingLeft: 14,
        },
      },
    },
    formFooter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      paddingRight: '49px !important',
      paddingLeft: '49px !important',
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <Box className={classes.form}>
          <Box className={classes.formHeader}>
            <Typography className={classes.formTitle} variant="h6">
              Verify your account
            </Typography>
            <Typography variant="body2" className={classes.formDescription}>
              Before ypu start, please prepare you identity document and make sure it is valid.
            </Typography>
          </Box>
          <Box className={classes.inputGroup}>
            <TextField
              required
              id="filled-name"
              label="Name"
              variant="filled"
              fullWidth
              className={classes.input}
              InputProps={{ disableUnderline: true }}
              {...register('name')}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              as={<span className="error-message" style={{ color: 'red' }} />}
            />
          </Box>
          <Box className={classes.inputGroup}>
            <TextField
              required
              id="filled-secondname"
              fullWidth
              label="Second name"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className={classes.input}
              {...register('second_name')}
            />
            <ErrorMessage
              errors={errors}
              name="second_name"
              as={<span className="error-message" style={{ color: 'red' }} />}
            />
          </Box>
          <Box className={classes.inputGroup}>
            <TextField
              required
              id="filled-email"
              fullWidth
              type="email"
              label="Email"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className={classes.input}
              {...register('email')}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as={<span className="error-message" style={{ color: 'red' }} />}
            />
          </Box>
          <Box className={classes.formFooter}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disableElevation
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateApplicant;