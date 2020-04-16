import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import DeliveryList from '~/pages/DeliveryList';
import DeliverymanList from '~/pages/DeliverymanList';
import RecipientList from '~/pages/RecipientList';
import ProblemList from '~/pages/ProblemList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" component={DeliveryList} isPrivate />
      <Route path="/deliverymen" component={DeliverymanList} isPrivate />
      <Route path="/recipients" component={RecipientList} isPrivate />
      <Route path="/problems" component={ProblemList} isPrivate />
    </Switch>
  );
}
