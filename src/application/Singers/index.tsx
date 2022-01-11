import React, {useState} from 'react';
import {alphaTypes, categoryTypes} from '../../api/config';
import Horizon from '../../baseUI/horizen-item';
import Scroll from '../../baseUI/scroll';
import {
  NavContainer,
  ListContainer,
  List,
  ListItem
} from './style';
import Loading from '../../baseUI/loading';
import {renderRoutes} from 'react-router-config';
import {connect} from 'react-redux';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';
import {Data} from './data';

// 渲染函数，返回歌手列表

const Singers = (props: any) => {

  const {
    singerList,
    pageCount,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
    songsCount,
    pullUpLoading,
    pullDownLoading,
    enterLoading
  } = props;

  const {updateDispatch, getHotSinger, updateCategory, updateAlpha, pullUpRefresh, pullDownRefresh} = props;

  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  let handleUpdateAlpha = (val: string) => {
    setAlpha(val);
    updateDispatch(category, val);
  };


  let handleUpdateCategory = (val: string) => {
    setCategory(val);
    updateDispatch(val, alpha);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };
  const enterDetail = (id: number) => {
    console.log(props);
    props.history.push(`/singers/${id}`);
  };

  const renderSingerList = () => {
    const {singerList} = props;
    const singerListJS = singerList ? singerList.toJS() : [];
    return (
      <List>
        {
          singerListJS.map((item: { id: number; accountId: string; picUrl: any; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, index: string) => {
            return (
              <ListItem key={item.accountId + '' + index} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            );
          })
        }
      </List>
    );
  };


  return (
    <>
      <Data>
        <NavContainer>
          <Horizon list={categoryTypes}
                   title={'分类 (默认热门):'}
                   handleClick={handleUpdateCategory}
                   oldVal={category}/>
          <Horizon list={alphaTypes}
                   title={'首字母:'}
                   handleClick={handleUpdateAlpha}
                   oldVal={alpha}
          />
        </NavContainer>
        <ListContainer>
          <Loading show={enterLoading}/>
          <Scroll
            pullUp={handlePullUp}
            pullDown={handlePullDown}
            pullUpLoading={pullUpLoading}
            pullDownLoading={pullDownLoading}
          >
            {renderSingerList()}
          </Scroll>
        </ListContainer>
      </Data>
      {renderRoutes(props.route.routes)}
    </>
  );
};

const mapStateToProps = (state: { getIn: (arg0: string[]) => any; }) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category: any, alpha: any) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category: any, alpha: any, hot: any, count: number) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category: string, alpha: string) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
