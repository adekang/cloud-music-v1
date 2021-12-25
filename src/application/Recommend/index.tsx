import React, {useEffect} from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import {Content} from './style';
import Scroll from '../../baseUI/scroll';
import {connect} from 'react-redux';
import * as actionFetch from '../Recommend/store/actionCreators';
import {forceCheck} from 'react-lazyload';
import Loading from '../../baseUI/loading/index';

function Recommend(props: any) {
  const {bannerList, recommendList, enterLoading} = props;

  const {getBannerDataDispatch, getRecommendListDataDispatch} = props;

  useEffect(() => {
      if (!bannerList.size) {
        getBannerDataDispatch();
      }
    },
    [bannerList.size, getBannerDataDispatch]);
  useEffect(() => {
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, [recommendList.size, getRecommendListDataDispatch]);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];


  return (
    <Content>
      {enterLoading ? <Loading show/> : null}
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}/>
          <RecommendList recommendList={recommendListJS}/>
        </div>
      </Scroll>
    </Content>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: { getIn: (arg0: string[]) => any; }) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionFetch.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionFetch.getRecommendList());
    },
  };
};

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));