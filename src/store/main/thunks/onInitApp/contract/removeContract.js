import { routes } from '../../../../../config/routes';
import { registerContract } from './registerContract';

const onSuccess = async (state, actions, history, contract) => {
  await registerContract({ state, actions, history, contract });
};

const onError = (actions, history) => {
  actions.main.setError({
    description: 'Applicant was not removed',
  });
  history.replace(routes.createAccount);
};

export const removeContract = async ({ state, actions, history, contract }) => {
  try {
    await contract.remove_applicant();
    await onSuccess(state, actions, history, contract);
  } catch (e) {
    onError(actions, history);
  }
};
