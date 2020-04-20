import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Delivery from '~/components/Delivery';

import {
  SafeArea,
  Container,
  WelcomeView,
  WelcomeMessage,
  ProfileView,
  WelcomeName,
  List,
  ProfilePicture,
} from './styles';

export default function Dashboard() {
  const deliveryman = useSelector((state) => state.auth.deliveryman);

  return (
    <SafeArea>
      <Container>
        <ProfileView>
          <ProfilePicture />
          <WelcomeView>
            <WelcomeMessage>Bem vindo de volta,</WelcomeMessage>
            <WelcomeName>{deliveryman.name}</WelcomeName>
          </WelcomeView>
        </ProfileView>
        <List
          data={[]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Delivery data={item} />}
        />
      </Container>
    </SafeArea>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="reorder" size={20} color={tintColor} />
  ),
};
