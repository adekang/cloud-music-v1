import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import {prefixStyle} from './../../api/utils';

const ProgressBarWrapper = styled.div`
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);

    .progress {
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style['border-color']};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`;

function ProgressBar(props: any) {
  const {percent} = props;
  const {percentChange} = props;
  const transform = prefixStyle('transform');

  const progressBar = useRef<any>();
  const progress = useRef<any>();
  const progressBtn = useRef<any>();
  const [touch, setTouch] = useState<any>({});

  const progressBtnWidth = 8;

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
    // eslint-disable-next-line
  }, [percent]);

  // 处理进度条的偏移
  const _offset = (offsetWidth: number) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };
  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth;
    percentChange(curPercent);
  };

  const progressTouchStart = (e: any) => {
    const startTouch = {
      startX: undefined,
      initiated: true,
      left: undefined
    };
    startTouch.initiated = true;//initial 为 true 表示滑动动作开始了
    startTouch.startX = e.touches[0].pageX;// 滑动开始时横向坐标
    startTouch.left = progress.current.clientWidth;// 当前 progress 长度
    // @ts-ignore
    setTouch(startTouch);
  };
  const progressTouchMove = (e: any) => {
    if (!touch.initiated) return;
    // 滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
    _changePercent();
  };
  const progressTouchEnd = (e: any) => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
  };

  const progressClick = (e: any) => {
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}/>
        <div className="progress-btn-wrapper" ref={progressBtn}
             onTouchStart={progressTouchStart}
             onTouchMove={progressTouchMove}
             onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"/>
        </div>
      </div>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;