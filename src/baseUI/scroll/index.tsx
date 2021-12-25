import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from 'react';

import BScroll from 'better-scroll';
import styled from 'styled-components';
import Loading from '../loading/index';
import LoadingV2 from '../loading-v2/index';

interface Props {
  direction?: 'vertical' | 'horizontal',// 滚动的方向
  click?: true,// 是否支持点击
  refresh?: boolean,// 是否刷新
  onScroll?: (v: any) => void,// 滑动触发的回调函数
  pullUp?: () => void,// 上拉加载逻辑
  pullDown?: () => void,// 下拉加载逻辑
  pullUpLoading?: boolean,// 是否显示上拉 loading 动画
  pullDownLoading?: boolean,// 是否显示下拉 loading 动画
  bounceTop?: boolean,// 是否支持向上吸顶
  bounceBottom?: boolean,// 是否支持向下吸底
}

const defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;


const Scroll: React.FC<Props> = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState<any>();

  const scrollContainerRef = useRef<any>();

  const {
    direction = 'vertical',
    click = true,
    refresh = true,
    onScroll = null,
    pullUpLoading = false,
    pullDownLoading = false,
    pullUp = null,
    pullDown = null,
    bounceTop = true,
    bounceBottom = true,
  } = props;


  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll: any) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off('scroll');
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    };
  }, [pullUp, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos: { y: number; }) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    };
  }, [pullDown, bScroll]);


  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  const PullUpdisplayStyle = pullUpLoading ? {display: ''} : {display: 'none'};
  const PullDowndisplayStyle = pullDownLoading ? {display: ''} : {display: 'none'};
  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}><Loading/></PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}><LoadingV2/></PullDownLoading>
    </ScrollContainer>
  );

});


export default Scroll;