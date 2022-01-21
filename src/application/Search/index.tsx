import React, {useState, useEffect, useCallback, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Container, HotKey, ShortcutWrapper} from './style';
import SearchBox from '../../baseUI/search-box';
import {changeEnterLoading, getHotKeyWords, getSuggestList} from './store/actionCreators';
import {connect} from 'react-redux';
import Scroll from '../../baseUI/scroll';
import LazyLoad, {forceCheck} from 'react-lazyload';
import Loading from '../../baseUI/loading';
import {List, ListItem} from '../Singers/style';
import {getName} from '../../api/utils';
import {SongItem} from '../SongList/style';
import {getSongDetail} from '../Player/store/actionCreators';
import MusicalNote from '../../baseUI/music-note';

function Search(props: any) {
  const {
    hotList,
    enterLoading,
    suggestList: immutableSuggestList,
    songsCount,
    songsList: immutableSongsList
  } = props;

  const suggestList = immutableSuggestList.toJS();
  const songsList = immutableSongsList.toJS();
  // 音符下落动画
  const musicNoteRef = useRef<any>();

  const {
    getHotKeyWordsDispatch,
    changeEnterLoadingDispatch,
    getSuggestListDispatch,
    getSongDetailDispatch
  } = props;


  // 控制动画
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  // 组件内部
  const [query, setQuery] = useState('');

// 由于是传给子组件的方法，尽量用 useCallback 包裹，以使得在依赖未改变，始终给子组件传递的是相同的引用
  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = (q: any) => {
    setQuery(q);
    if (!q) return;
    changeEnterLoadingDispatch(true);
    getSuggestListDispatch(q);
  };

  useEffect(() => {
    setShow(true);
    // 用了 redux 缓存，不再赘述
    if (!hotList.size)
      getHotKeyWordsDispatch();
  }, []);

  //Search 组件内
  const renderHotKey = () => {
    let list = hotList ? hotList.toJS() : [];
    return (
      <ul>
        {
          list.map((item: any) => {
            return (
              <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                <span>{item.first}</span>
              </li>
            );
          })
        }
      </ul>
    );
  };
  const renderSingers = () => {
    let singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title">相关歌手</h1>
        {
          singers.map((item: { accountId: string; id: any; picUrl: string | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, index: string) => {
            return (
              <ListItem key={item.accountId + '' + index} onClick={() => props.history.push(`/singers/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="singer"/>}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">歌手: {item.name}</span>
              </ListItem>
            );
          })
        }
      </List>
    );
  };
  const renderAlbum = () => {
    let albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {
          albums.map((item: { accountId: string; id: any; coverImgUrl: string | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, index: string) => {
            return (
              <ListItem key={item.accountId + '' + index} onClick={() => props.history.push(`/album/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                    <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">歌单: {item.name}</span>
              </ListItem>
            );
          })
        }
      </List>
    );
  };

  const selectItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: React.Key | null | undefined) => {
    getSongDetailDispatch(id);
    musicNoteRef.current.startAnimation({x: e.nativeEvent.clientX, y: e.nativeEvent.clientY});
  };

  const renderSongs = () => {
    return (
      <SongItem style={{paddingLeft: '20px'}}>
        {
          songsList.map((item: { id: React.Key | null | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; artists: any; album: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; }) => {
            return (
              <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.artists)} - {item.album.name}
                  </span>
                </div>
              </li>
            );
          })
        }
      </SongItem>
    );
  };
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container play={songsCount}>
        <div className="search_box_wrapper">
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}/>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </HotKey>
              {/* <SearchHistory>
                <h1 className="title">
                  <span className="text">搜索历史</span>
                  <span className="clear">
                    <i className="iconfont">&#xe63d;</i>
                  </span>
                </h1>
                {renderHistoryList()}
              </SearchHistory> */}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {/* 下面为搜索结果 */}
        <ShortcutWrapper show={query}>
          <Scroll onScroll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? <Loading/> : null}
        <MusicalNote ref={musicNoteRef}/>
      </Container>
    </CSSTransition>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
  hotList: state.getIn(['search', 'hotList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsCount: state.getIn(['player', 'playList']).size,
  songsList: state.getIn(['search', 'songsList'])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotKeyWordsDispatch() {
      dispatch(getHotKeyWords());
    },
    changeEnterLoadingDispatch(data: any) {
      dispatch(changeEnterLoading(data));
    },
    getSuggestListDispatch(data: any) {
      dispatch(getSuggestList(data));
    },
    getSongDetailDispatch(id: number) {
      dispatch(getSongDetail(id));
    }
  };
};
// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));