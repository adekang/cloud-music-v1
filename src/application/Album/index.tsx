//src/application/Album/index.js
import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container} from './style';
import {CSSTransition} from 'react-transition-group';
import Header from './../../baseUI/header/index';

interface outProps {

}

type TParams = { id: string };

type Props = outProps & RouteComponentProps<TParams>

const Album: React.FC<Props> = (props) => {
  const id = props.match.params.id;

  const [showStatus, setShowStatus] = useState(true);
  const handleBack = () => {
    setShowStatus(false);
  };
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header title={'返回'} handleClick={handleBack}/>
        {id}
      </Container>
    </CSSTransition>
  );
};


export default React.memo(Album);