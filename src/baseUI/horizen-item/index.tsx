import React, {useState, useRef, useEffect, memo} from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index';
import style from '../../assets/global-style';

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;

  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style ['font-size-m']};
    vertical-align: middle;
  }
`;
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style ['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;

  &.selected {
    color: ${style ['theme-color']};
    border: 1px solid ${style ['theme-color']};
    opacity: 0.8;
  }
`;

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
interface Props {
  list?: any[],
  oldVal?: string,
  title?: string,
  handleClick?: (v: any) => void
}

const Horizon: React.FC<Props> = (props) => {
  const {
    list = [],
    oldVal = '',
    title = '',
    handleClick = null
  } = props;

  const CategoryRef = useRef<any>(null);

  // 加入初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = CategoryRef.current;
    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      // @ts-ignore
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={'horizontal'}>
      <div ref={CategoryRef}>
        <List>
          <span>{title}</span>
          {
            list.map((item: any) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick && handleClick(item.key)}>
                  {item.name}
                </ListItem>
              );
            })
          }
        </List>
      </div>
    </Scroll>
  );
};


export default memo(Horizon);