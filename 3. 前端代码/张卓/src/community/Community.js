import React, { Component } from 'react';
import { Popover, NavBar, WingBlank,WhiteSpace } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Typography } from 'antd';
import './community.css';

// import fanhui from '../images/返回 (1).png';
// import touxiang from '../images/头像.png';
import xiala from '../images/下拉.png';
import fenxiang from '../images/分享(1).png';
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
// const users = [
//     {
//         id:"0",
//         photo:touxiang,
//         name:"一二",
//         article:"说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。",
//         time:'2019/11/25',
//         review:0,
//         like:45,
//         collect:12
//     },
//     {
//         id:"1",
//         photo:touxiang,
//         name:"history",
//         article:"说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。",
//         time:'2019/11/27',
//         review:12,
//         like:45,
//         collect:0
//     },
//     {
//         id:"2",
//         photo:touxiang,
//         name:"步步",
//         article:"说起优雅，很多女孩第一反应都是丝缎面料。而更多的人认为丝缎面料过于成熟，打造的气质也有些许的“老气”。其实不然，“滑溜溜”的缎面只会让你更温柔。 丝缎面料拥有完美的手感，无懈可击的光泽度更可以映衬出完美的肤色。缎面连衣裙悬垂感和光泽感极佳，穿上瞬间可以让你提升高贵气质，丝润柔滑的裙子勾勒出的线条也非常的优美。选择酒红这样沉稳的颜色，即使是黑黄皮也可以hold住缎面裙，甚至还可以将肤色衬得更高级。",
//         time:'2019/11/27',
//         review:12,
//         like:45,
//         collect:0
//     }
// ]

export default class Community extends Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            selected: '',
            users:[]
        }
    }    
    componentDidMount(){
        fetch("http://47.98.163.228:8086/article")
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                // console.log(res[i].userPic.substr(j));
                res[i].userPic = "http://47.98.163.228:8086"+res[i].userPic.substr(j);
            }
            this.setState({
                users:res
            })
            console.log(this.state.users);
        })
    }
    standardTime = (time) => {
        var date = new Date();
        var nowDate = [date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
        var myDate = time.split(/[ /:]/);
        var timeDate = [];
        var str = ['年前','月前','天前','小时前','分钟前','秒前']
        for(var i=0;i<6;i++){
          timeDate[i] = nowDate[i] - Number(myDate[i]);
        }
        for(var j=0;j<5;j++){
          if(timeDate[j] > 1){
            return timeDate[j]+str[j];
          }else if(timeDate[j] === 1){
            if(timeDate[j+1] >= 0){
              return timeDate[j]+str[j];
            }else{
              if(j === 0){
                timeDate[j+1] = timeDate[j+1]+12;
              }else if(j === 1){
                timeDate[j+1] = timeDate[j+1]+30;
              }else if(j === 2){
                timeDate[j+1] = timeDate[j+1]+24;
              }else{
                timeDate[j+1] = timeDate[j+1]+60;
              }
              return timeDate[j+1]+str[j+1];
            }
          }
        }
      }
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
                    this.state.users.map((item)=>(<div className="article" key={item.articleId}>
                        <div className='artUser'>
                            <img className='userImg' src={item.userPic} alt=""/>
                            <span className='userName'>{item.userName}</span>
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
                            <Paragraph ellipsis={{rows:5}}>{item.content}</Paragraph>
                            <Link to={"/shequarticle/"+item.articleId}>阅读全文>></Link>
                        </div>
                        <ul className="artState">
                            <li><span>{this.standardTime(item.time)}</span></li>
                            <li><img src={`${pinglun}`} alt=''/><span>{item.review || "评论"}</span></li>
                            <li><img src={`${shoucang}`} alt=''/><span>{item.save || "收藏"}</span></li>
                            <li><img src={`${dianzan}`} alt=''/><span>{item.browse || "点赞"}</span></li>
                        </ul>
                    </div>))
                }
            </div>
        );
    }
}