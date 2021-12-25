import React from 'react';
import {
  ListWrapper,
  ListItem,
  List
} from './style';
import LazyLoad from 'react-lazyload';
import {getCount} from '../../api/utils';
import {withRouter} from 'react-router-dom';

interface Props {
  recommendList: any[];
  history?: any;
}

const RecommendList: React.FC<Props> = (props) => {

  const {recommendList, history} = props;

  const enterDetail = (id: number) => {
    history.push(`/recommend/${id}`);
  };

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          recommendList.map(item => {
            return (
              <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <div className="decorate"/>
                  <LazyLoad
                    placeholder={<img width="100%" height="100%" src={require('./music.png').default} alt="music"/>}>
                    <img src={item.picUrl + '?param=300x300'} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            );
          })
        }
      </List>
    </ListWrapper>
  );
};

// @ts-ignore
export default React.memo(RecommendList);