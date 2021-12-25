//src/application/Album/index.js
import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container} from './style';

interface outProps {

}

type TParams = { id: string };

type Props = outProps & RouteComponentProps<TParams>

const Album: React.FC<Props> = (props) => {
  const id = props.match.params.id;
  return (
    <Container>
      {id}
    </Container>
  );
};

export default Album;