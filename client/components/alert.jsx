import React from 'react';

import Alert from 'react-bootstrap/Alert';

 const Alerts = (props) => {
  return (
    <Alert variant="danger" onClose={() => props.setShow(false)} dismissible>
      <Alert.Heading>You got an error!</Alert.Heading>
      <p>Try again in a minute (probably the request limit) </p>
    </Alert>
  );
}

export default Alerts;