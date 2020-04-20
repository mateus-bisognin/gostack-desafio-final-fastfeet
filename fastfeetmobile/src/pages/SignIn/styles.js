import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
`;
export const Form = styled.View`
  align-self: stretch;
  margin-top: 37px;
`;

export const SubmitButton = styled(Button)`
  background: #82bf18;
  margin-top: 5px;
`;
export const FormInput = styled(Input)`
  height: 45px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;
