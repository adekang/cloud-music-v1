(this["webpackJsonpcould-music"]=this["webpackJsonpcould-music"]||[]).push([[7],{132:function(n,t,e){"use strict";e.d(t,"e",(function(){return p})),e.d(t,"c",(function(){return b})),e.d(t,"b",(function(){return u})),e.d(t,"d",(function(){return f})),e.d(t,"a",(function(){return x}));var i,o,r,a,c,s=e(3),d=e(4),l=e(2),p=d.b.div(i||(i=Object(s.a)(["\n  box-sizing: border-box;\n  position: fixed;\n  top: 95px;\n  width: 100%;\n  padding: 5px;\n  overflow: hidden;\n"]))),b=d.b.div(o||(o=Object(s.a)(["\n  position: fixed;\n  top: 160px;\n  left: 0;\n  bottom: 0;\n  overflow: hidden;\n  width: 100%;\n"]))),u=d.b.div(r||(r=Object(s.a)(["\n  display: flex;\n  margin: auto;\n  flex-direction: column;\n  overflow: hidden;\n\n  .title {\n    margin: 10px 0 10px 10px;\n    color: ",";\n    font-size: ",";\n  }\n"])),l.a["font-color-desc"],l.a["font-size-s"]),f=d.b.div(a||(a=Object(s.a)(["\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  margin: 0 5px;\n  padding: 5px 0;\n  align-items: center;\n  border-bottom: 1px solid ",";\n\n  .img_wrapper {\n    margin-right: 20px;\n\n    img {\n      border-radius: 3px;\n      width: 50px;\n      height: 50px;\n    }\n  }\n\n  .name {\n    font-size: ",";\n    color: ",";\n    font-weight: 500;\n  }\n"])),l.a["border-color"],l.a["font-size-m"],l.a["font-color-desc"]),x=d.b.div(c||(c=Object(s.a)(["\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 100px;\n  height: 100px;\n  margin: auto;\n"])))},151:function(n,t,e){"use strict";e.r(t);var i,o,r,a,c=e(0),s=e.n(c),d=e(70),l=e(27),p=e(7),b=e(3),u=e(4),f=e(2),x=u.b.div(i||(i=Object(b.a)(["\n  position: fixed;\n  top: 90px;\n  bottom: 0;\n  width: 100%;\n\n  .offical, .global {\n    margin: 10px 5px;\n    padding-top: 15px;\n    font-weight: 700;\n    font-size: ",";\n    color: ",";\n  }\n"])),f.a["font-size-m"],f.a["font-color-desc"]),g=u.b.ul(o||(o=Object(b.a)(["\n  margin-top: 10px;\n  padding: 0 5px;\n  display: ",";\n  flex-direction: row;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  background: ",';\n\n  &::after {\n    content: "";\n    display: block;\n    width: 32vw;\n  }\n'])),(function(n){return n.globalRank?"flex":""}),f.a["background-color"]),h=u.b.li(r||(r=Object(b.a)(["\n  display: ",";\n  padding: 3px 0;\n  border-bottom: 1px solid ",";\n\n  .img_wrapper {\n    width: ",";\n    height: ",";\n    border-radius: 3px;\n    position: relative;\n\n    .decorate {\n      position: absolute;\n      bottom: 0;\n      width: 100%;\n      height: 35px;\n      border-radius: 3px;\n      background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 43%, .4));\n    }\n\n    img {\n      width: 100%;\n      height: 100%;\n      border-radius: 3px;\n    }\n\n    .update_frequecy {\n      position: absolute;\n      left: 7px;\n      bottom: 7px;\n      font-size: ",";\n      color: ",";\n    }\n  }\n"])),(function(n){return n.tracks.length?"flex":""}),f.a["border-color"],(function(n){return n.tracks.length?"27vw":"32vw"}),(function(n){return n.tracks.length?"27vw":"32vw"}),f.a["font-size-ss"],f.a["font-color-light"]),j=u.b.ul(a||(a=Object(b.a)(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  padding: 10px 10px;\n\n  > li {\n    font-size: ",";\n    color: grey;\n  }\n"])),f.a["font-size-s"]),m=e(47),O=e(33),w=e(35),v=e(132),k=e(1),y=function(n){var t=n.rankList,e=n.loading,i=n.getRankListDataDispatch,o=t?t.toJS():[],r=Object(p.b)(o),a=o.slice(0,r),s=o.slice(r);Object(c.useEffect)((function(){o.length||i()}),[]);var d=function(n){return n.length?Object(k.jsx)(j,{children:n.map((function(n,t){return Object(k.jsxs)("li",{children:[t+1,". ",n.first," - ",n.second]},t)}))}):null},l=function(t,e){return Object(k.jsx)(g,{globalRank:e,children:t.map((function(t){return Object(k.jsxs)(h,{tracks:t.tracks,onClick:function(){return e=t.id,void n.history.push("/rank/".concat(e));var e},children:[Object(k.jsxs)("div",{className:"img_wrapper",children:[Object(k.jsx)("img",{src:t.coverImgUrl,alt:""}),Object(k.jsx)("div",{className:"decorate"}),Object(k.jsx)("span",{className:"update_frequecy",children:t.updateFrequency})]}),d(t.tracks)]},t.coverImgId)}))})},b=e?{display:"none"}:{display:""};return Object(k.jsx)(k.Fragment,{children:Object(k.jsxs)(x,{children:[Object(k.jsx)(O.a,{children:Object(k.jsxs)("div",{children:[Object(k.jsx)("h1",{className:"offical",style:b,children:" \u5b98\u65b9\u699c "}),l(a),Object(k.jsx)("h1",{className:"global",style:b,children:" \u5168\u7403\u699c "}),l(s,!0),e?Object(k.jsx)(v.a,{children:Object(k.jsx)(m.a,{})}):null]})}),Object(w.a)(n.route.routes)]})})};t.default=Object(l.b)((function(n){return{rankList:n.getIn(["rank","rankList"]),loading:n.getIn(["rank","loading"])}}),(function(n){return{getRankListDataDispatch:function(){n(Object(d.a)())}}}))(s.a.memo(y))}}]);
//# sourceMappingURL=7.c96fcdb2.chunk.js.map