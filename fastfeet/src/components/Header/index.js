import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user.name);
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavLink activeStyle={{ color: '#444' }} to="/deliveries">
            ENCOMENDAS
          </NavLink>
          <NavLink activeStyle={{ color: '#444' }} to="/deliverymen">
            ENTREGADORES
          </NavLink>
          <NavLink activeStyle={{ color: '#444' }} to="/recipients">
            DESTINATÁRIOS
          </NavLink>
          <NavLink activeStyle={{ color: '#444' }} to="/problems">
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <strong>{userName}</strong>
            <Link onClick={handleSignOut}>sair do sistema</Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
