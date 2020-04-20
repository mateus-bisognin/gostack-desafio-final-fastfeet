import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
export const Container = styled.View`
  padding: 0 20px;
`;

export const ProfileView = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;
export const ProfilePicture = styled.View`
  border-radius: 34px;
  width: 68px;
  height: 68px;
  background: #f4effc;
`;
export const WelcomeView = styled.View`
  margin-left: 12px;
`;
export const WelcomeMessage = styled.Text`
  font-size: 12px;
  color: #666;
`;
export const WelcomeName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
