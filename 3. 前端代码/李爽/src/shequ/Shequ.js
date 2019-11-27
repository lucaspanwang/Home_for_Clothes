import React, { Component } from 'react';
import { Popover, NavBar, WingBlank,WhiteSpace } from 'antd-mobile';
// import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import { Typography } from 'antd';
import '../css/shequ.css';

// import fanhui from '../images/返回 (1).png';
import touxiang from '../images/头像.png';
import xiala from '../images/下拉.png';
import fenxiang from '../images/分享.png';
import shoucang from '../images/收藏.png';
import pingbi from '../images/屏蔽.png';
import guanzhu from '../images/关注.png';
import pinglun from '../images/评论.png';
import dianzan from '../images/点赞.png';

const { Paragraph } = Typography;
const Item = Popover.Item;
const menu = [
    {key:'1',value:'分享',image:`${fenxiang}`},
    {key:'2',value:'关注',image:`${guanzhu}`},
    {key:'3',value:'收藏',image:`${shoucang}`},
    {key:'4',value:'屏蔽',image:`${pingbi}`}
];
const users = [
    {
        id:"0",
        photo:touxiang,
        name:"一二",
        article:"说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。",
        time:'2019/11/25',
        review:0,
        like:45,
        collect:12
    },
    {
        id:"1",
        photo:touxiang,
        name:"history",
        article:"说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。",
        time:'2019/11/27',
        review:12,
        like:45,
        collect:0
    },
    {
        id:"2",
        photo:touxiang,
        name:"步步",
        article:"说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。",
        time:'2019/11/27',
        review:12,
        like:45,
        collect:0
    }
]

export default class Shequ extends Component {
    state = {
        visible: false,
        selected: '',
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

    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                // leftContent={[
                //     <img src={fanhui} style={{width:'30px'}} key="fan"/>
                // ]}
                >社区</NavBar>

                <div style={{borderBottom:'5px dotted #bbb'}}>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <span style={{fontSize:'16px'}}>官方消息</span>
                        <div className="official">温馨提示：近日北京市寒潮即将抵达，温度降低，大家要做好保暖措施。</div>
                    </WingBlank>
                    <WhiteSpace size="lg" />
                </div>
                
                {
                    users.map((item)=>(<div className="article">
                        <div className='artUser' key={item.id}>
                            <img className='userImg' src={item.photo} alt=""/>
                            <span className='userName'>{item.name}</span>
                            <Popover mask
                                visible={this.state.visible}
                                overlay={[menu.map(it => (
                                    (<Item key={it.key} value={it.value} style={{padding:'10px 25px'}}>
                                        <img src={it.image} alt='' style={{width:'25px'}}/>
                                        <sapn style={{padding:'0 20px',fontSize:'18px'}}>{it.value}</sapn>
                                    </Item>)
                                ))]}
                                onSelect={this.onSelect}
                            ><img src={`${xiala}`} alt="" style={{margin:'10px',width:'20px',float:'right'}}/>
                            </Popover>
                        </div>
                        <div className="artDetail">
                            <Paragraph ellipsis={{rows:5}}>{item.article}</Paragraph>
                            <a href={'/shequarticle'}>阅读全文>></a>
                        </div>
                        <ul className="artState">
                            <li><span>{item.time}</span></li>
                            <li><img src={`${pinglun}`}/><span>{item.review || "评论"}</span></li>
                            <li><img src={`${shoucang}`}/><span>{item.collect || "收藏"}</span></li>
                            <li><img src={`${dianzan}`}/><span>{item.like || "点赞"}</span></li>
                        </ul>
                    </div>))
                }
            </div>
        );
    }
}