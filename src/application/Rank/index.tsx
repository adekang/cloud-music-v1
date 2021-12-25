import React, {useEffect} from 'react';
import {getRankList} from './store';
import {connect} from 'react-redux';
import {filterIndex} from '../../api/utils';
import {Container, List, ListItem, SongList} from './style';
import Loading from '../../baseUI/loading';
import Scroll from '../../baseUI/scroll';
import {renderRoutes} from 'react-router-config';
import {EnterLoading} from '../Singers/style';

const Rank = (props: any) => {
  const {rankList: list, loading} = props;

  const {getRankListDataDispatch} = props;
  let rankList = list ? list.toJS() : [];


  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch();
    }
  }, []);

  const enterDetail = (name: string) => {
    const idx = filterIndex(name);
    if (idx === null) {
      alert('暂无相关数据');
      return;
    }
  };
  const renderSongList = (list: any[]) => {
    return list.length ? (
      <SongList>
        {
          list.map((item: any, index: any) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>;
          })
        }
      </SongList>
    ) : null;
  };


  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list: any, global?: any) => {
    // @ts-ignore
    return (
      <List globalRank={global}>
        {
          list.map((item: any) => {
            // @ts-ignore
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item.name)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt=""/>
                  <div className="decorate"/>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            );
          })
        }
      </List>
    );
  };
// 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? {'display': 'none'} : {'display': ''};
  return (
    <>
      <Container>
        <Scroll>
          <div>
            <h1 className="offical" style={displayStyle}> 官方榜 </h1>
            {renderRankList(officialList)}
            <h1 className="global" style={displayStyle}> 全球榜 </h1>
            {renderRankList(globalList, true)}
            {loading ? <EnterLoading><Loading/></EnterLoading> : null}
          </div>
        </Scroll>
        {renderRoutes(props.route.routes)}
      </Container>
    </>
  );
};

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
