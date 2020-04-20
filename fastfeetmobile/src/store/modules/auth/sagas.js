import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliveryman/${id}/deliveries`);

    // if (response.data.length === 0) {
    //   Alert.alert('Erro no login', 'Usuário não encontrado');
    //   return;
    // }

    const { deliveryman, deliveries } = response.data;

    yield put(signInSuccess(deliveryman, deliveries));

    // history.push('/deliveries');
  } catch (err) {
    Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor');

    yield put(signInFailure());
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
