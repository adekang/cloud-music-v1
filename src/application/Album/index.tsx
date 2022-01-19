//src/application/Album/index.js
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container, TopDesc, Menu, SongList, SongItem} from './style';
import {CSSTransition} from 'react-transition-group';
import Header from './../../baseUI/header/index';
import {getCount, getName, isEmptyObject} from '../../api/utils';
import Scroll from '../../baseUI/scroll';
import style from '../../assets/global-style';
import {connect} from 'react-redux';
import Loading from '../../baseUI/loading';
import {changeEnterLoading, getAlbumList} from './store/actionCreators';
import MusicNote from '../../baseUI/music-note';
import SongsList from '../SongList';

export const HEADER_HEIGHT = 45;


interface outProps {
  getAlbumDataDispatch: any;
  currentAlbum: any;
  enterLoading: any;
}

type TParams = { id: string };

type Props = outProps & RouteComponentProps<TParams>

const Album: React.FC<Props> = (props) => {
  const id = props.match.params.id;

  const {currentAlbum: currentAlbumImmutable, enterLoading} = props;
  const {getAlbumDataDispatch} = props;

  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false);
  const [title, setTitle] = useState('歌单');
  const headerEl = useRef<any>();

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

// 同时将 mock 数据的代码删除
  let currentAlbum = currentAlbumImmutable.toJS();


  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current;
    //滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style['theme-color'];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = '';
      headerDom.style.opacity = 1;
      setTitle('歌单');
      setIsMarquee(false);
    }
  }, [currentAlbum]);


  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"/>
        </div>
        <div className="img_wrapper">
          <div className="decorate"/>
          <img src={currentAlbum.coverImgUrl} alt=""/>
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt=""/>
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  const musicNoteRef = useRef<any>();

  const musicAnimation = (x: any, y: any) => {
    musicNoteRef.current.startAnimation({x, y});
  };

  return (
    <>
      <CSSTransition
        in={showStatus}
        timeout={300}
        classNames="fly"
        appear={true}
        unmountOnExit
        onExited={props.history.goBack}
      >
        <Container>
          <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}/>
          <hr/>
          {!isEmptyObject(currentAlbum) ? (
            <Scroll
              bounceTop={false}
              onScroll={handleScroll}
            >
              {renderTopDesc()}
              {renderMenu()}
              <SongsList
                songs={currentAlbum.tracks}
                collectCount={currentAlbum.subscribedCount}
                showCollect={true}
                showBackground={true}
                musicAnimation={musicAnimation}
              />
            </Scroll>) : null}
          {enterLoading ? <Loading/> : null}
          <MusicNote ref={musicNoteRef}/>
        </Container>
      </CSSTransition>
    </>
  );
};

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAlbumDataDispatch(id: number) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));