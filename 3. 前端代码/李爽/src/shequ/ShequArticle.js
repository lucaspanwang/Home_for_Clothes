import React, { Component } from 'react';
import { NavBar,Popover,Grid,WingBlank,WhiteSpace } from 'antd-mobile';
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import '../css/shequ.css';

import fanhui from '../images/返回 (1).png';
import touxiang from '../images/头像.png';
import xiala from '../images/下拉.png';
import fenxiang from '../images/分享.png';
import shoucang from '../images/收藏.png';
import pingbi from '../images/屏蔽.png';
import guanzhu from '../images/关注.png';
import pinglun from '../images/评论.png';
import dianzan from '../images/点赞.png';
import photo1 from '../images/photo1.png';
import photo2 from '../images/photo2.png';

const Item = Popover.Item;
const menu = [
    {key:'1',value:'分享',image:`${fenxiang}`},
    {key:'2',value:'关注',image:`${guanzhu}`},
    {key:'3',value:'收藏',image:`${shoucang}`},
    {key:'4',value:'屏蔽',image:`${pingbi}`}
];

const data = [
  {
    name: 'Han Solo',
    photo: `${touxiang}`,
    content: (
      <p>
        说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(1, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
  {
    name: 'Han Solo',
    photo: `${photo1}`,
    content: (
      <p>
       丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(2, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
];
const user = {
  id:"0",
  photo:touxiang,
  name:"一二",
  article:"说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。",
  time:'2019/11/27 21:20:12',
  review:data.length,
  like:45,
  collect:0,
  artPhoto:[`${photo1}`,`${photo2}`]
  // artPhoto:[`${photo1}`,`${photo2}`,`${photo1}`,`${photo2}`,`${photo1}`],
}
export default class ShequArticle extends Component {
    state = {
        visible: false,
        selected: '',
        photoNum:3
    };
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    standardTime = (time) => {
      var date = new Date();
      var nowDate = [date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
      var myDate = time.split(/[ /:]/);
      var timeDate = [];
      var times;
      var str = ['年前','月前','天前','小时前','分钟前','秒前']
      for(var i=0;i<6;i++){
        timeDate[i] = nowDate[i] - Number(myDate[i]);
      }
      for(var j=0;j<5;j++){
        if(timeDate[j] > 1){
          return timeDate[j]+str[j];
        }else if(timeDate[j] == 1){
          if(timeDate[j+1] >= 0){
            return timeDate[j]+str[j];
          }else{
            if(j == 0){
              timeDate[j+1] = timeDate[j+1]+12;
            }else if(j == 1){
              timeDate[j+1] = timeDate[j+1]+30;
            }else if(j == 2){
              timeDate[j+1] = timeDate[j+1]+24;
            }else{
              timeDate[j+1] = timeDate[j+1]+60;
            }
            return timeDate[j+1]+str[j+1];
          }
        }
      }
    }
    componentDidMount(){
        let len = user.artPhoto.length;
        console.log(len)
        if(len <= 2 || len === 4){
            this.setState({
                photoNum:2
            })
        }else{
            this.setState({
                photoNum:3
            })
        }
    }
    render() {
        return (
            <div>
              <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <img src={fanhui} style={{width:'30px'}} key="fan"/>
                ]}
                >社区</NavBar>
              <div className="article">
                  <div className='artUser'>
                      <img className='userImg' src={user.photo} alt=""/>
                      <span className='userName'>{user.name}</span>
                      <Popover mask
                          visible={this.state.visible}
                          overlay={[menu.map(it => (
                              (<Item key={it.key} value={it.value} style={{padding:'10px 25px'}}>
                                  <img src={it.image} alt='' style={{width:'25px'}}/>
                                  <span style={{padding:'0 20px',fontSize:'18px'}}>{it.value}</span>
                              </Item>)
                          ))]}
                          onSelect={this.onSelect}
                      ><img src={`${xiala}`} alt="" style={{margin:'10px',width:'20px',float:'right'}}/>
                      </Popover>
                  </div>
                  <div className="artDetail">
                      <p>{user.article}</p>
                      <Grid data={user.artPhoto}
                      columnNum={this.state.photoNum}
                      renderItem={dataItem => (
                          <img src={dataItem} style={{ width:'100%'}} alt="" />
                      )}
                      /><span>发布于{this.standardTime(user.time)}</span>
                  </div>
                  <ul className="artState">
                    <li><img src={`${pinglun}`}/><span>{user.review || "评论"}</span></li>
                    <li><img src={`${shoucang}`}/><span>{user.collect || "收藏"}</span></li>
                    <li><img src={`${dianzan}`}/><span>{user.like || "点赞"}</span></li>
                  </ul>
              </div>
              <List
                className="comment-list"
                style={{padding:"15px"}}
                // itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <li>
                    <Comment
                      // actions={item.actions}
                      author={item.name}
                      avatar={item.photo}
                      content={item.content}
                      datetime={item.datetime}
                    />
                  </li>
                )}
              />
            </div>
        )
    }
}
