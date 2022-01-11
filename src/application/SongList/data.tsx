import React, {createContext, useReducer} from 'react';
import {fromJS} from 'immutable';

//context
export const CategoryDataContext = createContext({});

// 相当于之前的 constants
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

//reducer 纯函数
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('category', action.data);
    case CHANGE_ALPHA:
      return state.set('alpha', action.data);
    default:
      return state;
  }
};

//Provider 组件
export const Data = (props: any) => {
  //useReducer 的第二个参数中传入初始值
  const [data, dispatch] = useReducer(reducer, fromJS({
    category: '',
    alpha: ''
  }));
  return (
    <CategoryDataContext.Provider value={{data, dispatch}}>
      {props.children}
    </CategoryDataContext.Provider>
  );
};

// 然后在 Singers/index.js 来运用：

// 首先需要引入 useContext
// 将之前的 useState 代码删除
// const {data, dispatch} = useContext (CategoryDataContext);
// 拿到 category 和 alpha 的值
// const {category, alpha} = data.toJS ();
// 而且 handleUpdatexxx 函数也要修改:

//CHANGE_ALPHA 和 CHANGE_CATEGORY 变量需要从 data.js 中引入
//   let handleUpdateAlpha = (val) => {
//     dispatch ({type: CHANGE_ALPHA, data: val});
//     updateDispatch (category, val);
//   };
//
// let handleUpdateCatetory = (val) => {
//   dispatch ({type: CHANGE_CATEGORY, data: val});
//   updateDispatch (val, alpha);
// };