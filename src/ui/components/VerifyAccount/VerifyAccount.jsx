import { useEffect } from 'react';
import * as OnfidoSDK from 'onfido-sdk-ui/dist/onfido.min.js';
import 'onfido-sdk-ui/dist/style.css';
import { makeStyles } from '@mui/styles';

const VerifyAccount = () => {
  const onfidoToken = 'onfido-jwt';
  const onfidoContainerId = 'onfido-sdk-wrapper';

  const useStyles = makeStyles((theme) => ({
    onfidoSdk: {
      '& .ods-button.-action--primary': {
        backgroundColor: theme.palette.primary.main,
        textTransform: 'uppercase',
        border: 0,
      },
      '& .onfido-sdk-ui-Modal-inner': {
        border: 0,
      },
      '& .onfido-sdk-ui-Welcome-instructions': {
        textAlign: 'left',
      },
    },
  }));

  const Onfido = () => {
    useEffect(() => {
      if (onfidoToken)
        OnfidoSDK.init({
          token: onfidoToken,
          containerId: onfidoContainerId,
          onComplete: function (data) {
            console.log('everything is complete');
          },
          onUserExit: function (userExitCode) {
            console.log(userExitCode);
          },
          steps: [
            'welcome',
            {
              type: 'document',
              options: {
                documentTypes: {
                  /*               driving_licence: {
                    country: null,
                  },*/
                  driving_licence: true,
                  passport: true,
                  national_identity_card: true,
                  residence_permit: true,
                  showCountrySelection: false,
                },
              },
            },
            'face',
            'complete',
          ],
        });
    }, []);

    return <div id={onfidoContainerId} />;
  };

  const classes = useStyles();

  return (
    <div className={classes.onfidoSdk}>
      <Onfido />
    </div>
  );
};

export default VerifyAccount;