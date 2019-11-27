import React, { Component } from 'react';
import { Popover,Grid,WingBlank,WhiteSpace } from 'antd-mobile';
import '../css/shequ.css';
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';

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
// const artPhoto = [`${photo1}`];
const artPhoto = [`${photo1}`,`${photo2}`,`${photo1}`,`${photo2}`,`${photo1}`];
const data = [
  {
    author: 'Han Solo',
    avatar: `${touxiang}`,
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
    author: 'Han Solo',
    avatar: `${photo1}`,
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
    componentDidMount(){
        let len = artPhoto.length;
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
                <div className="article">
                    <div className='artUser'>
                        <img className='userImg' src={`${touxiang}`} alt=""/>
                        <span className='userName'>一二</span>
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
                        <p>说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。</p>
                        <Grid data={artPhoto}
                        columnNum={this.state.photoNum}
                        renderItem={dataItem => (
                            <img src={dataItem} style={{ width:'100%'}} alt="" />
                        )}
                        />
                        <span>发布于11:20</span>
                    </div>
                    <ul className="artState">
                        <li><img src={`${pinglun}`}/><span>评论</span></li>
                        <li><img src={`${shoucang}`}/><span>收藏</span></li>
                        <li><img src={`${dianzan}`}/><span>点赞</span></li>
                    </ul>
                </div>
                <List
                  className="comment-list"
                  header={`评论 ${data.length}`}
                  // itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <li>
                      <Comment
                        // actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
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
