import produce from 'immer';

const INITIAL_STATE = {
  deliveryman: null,
  deliveries: [],
  loading: false,
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.deliveryman = action.payload.deliveryman;
        draft.deliveries = action.payload.deliveries;
        draft.loading = false;
        draft.signed = true;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.deliveryman = null;
        draft.deliveries = [];
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
