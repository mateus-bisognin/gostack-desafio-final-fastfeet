import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import DeliveryCreation from '~/pages/Forms/Delivery';
import DeliveryList from '~/pages/Lists/Delivery';
import DeliveryEdition from '~/pages/Edits/Delivery';
import DeliverymanList from '~/pages/Lists/Deliveryman';
import DeliverymanCreation from '~/pages/Forms/Deliveryman';
import DeliverymanEdition from '~/pages/Edits/Deliveryman';
import RecipientList from '~/pages/Lists/Recipient';
import RecipientEdition from '~/pages/Edits/Recipient';
import RecipientCreation from '~/pages/Forms/Recipient';
import ProblemList from '~/pages/Lists/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" exact component={DeliveryList} isPrivate />
      <Route
        path="/deliveries/new"
        exact
        component={DeliveryCreation}
        isPrivate
      />
      <Route
        path="/deliveries/:id/edition"
        exact
        component={DeliveryEdition}
        isPrivate
      />
      <Route path="/deliverymen" exact component={DeliverymanList} isPrivate />
      <Route
        path="/deliverymen/new"
        component={DeliverymanCreation}
        isPrivate
      />
      <Route
        path="/deliverymen/:id/edition"
        exact
        component={DeliverymanEdition}
        isPrivate
      />
      <Route path="/recipients" exact component={RecipientList} isPrivate />
      <Route path="/recipients/new" component={RecipientCreation} isPrivate />
      <Route
        path="/recipients/:id/edition"
        exact
        component={RecipientEdition}
        isPrivate
      />
      <Route path="/problems" component={ProblemList} isPrivate />
    </Switch>
  );
}
