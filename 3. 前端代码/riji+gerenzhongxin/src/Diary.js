import React, { Component} from 'react';
import { NavBar,Carousel,Grid} from 'antd-mobile';
import { Timeline,Icon} from 'antd';
import riji02 from './images/riji02.jpg';
import riji05 from './images/riji05.jpg';
import del from './images/垃圾桶.png';
import lunbo01 from '././images/lunbo01.jpg';
import lunbo02 from '././images/lunbo02.jpg';
import touxiang from './images/头像.png';

var diaryList=[
    {
        id:'0',
        imgs:[riji02,riji05,riji02],
        msg:'今天和朋友一起穿着新衣服去逛街，很开心，希望每天都可以开开心心的！',
        time:'2019/10/26 10:20 '
    },
    {
        id:'1',
        imgs:[],
        msg:'今天的我依旧美美哒！今天的我依旧美美哒！今天的我依旧美美哒！今天的我依旧美美哒！今天的我依旧美美哒！',
        time:'2019/10/27 09:15 '
    },
    {
        id:'2',
        imgs:[riji02,riji05],
        msg:'今天穿着我最喜欢的衣服出去逛街，心情超级好！我还是人见人爱的小仙女。',
        time:'2019/11/01 15:35 '
    },
    {
        id:'3',
        imgs:[],
        msg:'今天和朋友一起穿着新衣服去逛街，很开心，希望每天都可以开开心心的！',
        time:'2019/11/26 16:58 '
    }
]

export default class Diary extends Component {
    state = {
        data: ['1', '2'],
        content:diaryList
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
            data: [lunbo01,lunbo02],
            });
        }, 100);
    }
    deleteItem=(id)=>{
        var content = [...this.state.content];
        content.splice(id,1);
        this.setState({
           content:content
        })
        diaryList.splice(id,1);
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}>穿搭日记</NavBar>
                <div style={{position:"relative"}}>
                    <Carousel autoplay={true} infinite>
                    {this.state.data.map(val => (
                        <a key={val} style={{ display: 'inline-block', width: '100%', height: '150px' }}>
                        <img
                            src={val}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
                    <img src={touxiang} alt='' style={{width:'15%',borderRadius:'50%',position: 'absolute',top:'85%',left:'0',zIndex:"99"}}/>
                </div>                

                <Timeline style={{marginLeft:'20px',marginTop:'30px'}}>
                {
                    this.state.content.map((item,idx)=>
                        <Timeline.Item dot={<Icon type="heart" theme="filled" style={{ fontSize: '16px' }} key={idx}/>} color="red">
                            <div style={{width:'95%',padding:'10px',backgroundColor:'#c7e7c2',borderRadius:'10px'}}>
                            <Grid data={item.imgs}
                                columnNum={3}
                                renderItem={dataItem => (
                                    <img src={dataItem} alt="" style={{width:'100%'}}/>
                                )}
                                />
                                <p style={{color:'#1f8774',marginTop:'8px'}}>{item.msg}</p>
                                <span style={{color:'#888'}}>{item.time} <img src={del} alt='' style={{width:'7%',float:'right'}} onClick={()=>this.deleteItem(idx)}/></span>
                            </div>    
                        </Timeline.Item>
                    )
                }
                </Timeline>                
            </div>
            
        );
    }
}
