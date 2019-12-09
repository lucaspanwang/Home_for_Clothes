import React, { Component} from 'react';
import { NavBar,Carousel,Grid } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Timeline,Icon } from 'antd';
import './diary.css';

import del from '../images/垃圾桶.png';
import add from '../images/添加.png';
import lunbo01 from '../images/lunbo01.jpg';
import lunbo02 from '../images/lunbo02.jpg';

export default class Diary extends Component {
    constructor(){
        super();
        this.state = {
            data: ['1', '2'],
            content:[],
        }
    }
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }
    componentDidMount() {
        fetch('http://47.98.163.228:8081/diary?userId='+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            {                 
                for(var i=0;i<res.length;i++){
                    var j = res[i].userPic.indexOf('/');
                    res[i].userPic = "http://47.98.163.228:8081"+res[i].userPic.substr(j);
                }
                for(var i=0;i<res.length;i++){
                    if(res[i].dimg[0]===''){
                        res[i].dimg=[];
                    }else{
                        for(var j=0;j<res[i].dimg.length;j++){
                            var n = res[i].dimg[j].indexOf('/');
                            res[i].dimg[j] = "http://47.98.163.228:8081"+res[i].dimg[j].substr(n);
                        }
                    }
                }               
                this.setState({
                    content: res,
                })
            }
        })
        setTimeout(() => {
            this.setState({
            data: [lunbo01,lunbo02],
            });
        }, 100);
    }
    // deleteItem=(id)=>{
    //     var content = [...this.state.content];
    //     content.splice(id,1);
    //     this.setState({
    //        content:content
    //     })
    //     diaryList.splice(id,1);
    // }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                rightContent={[
                    <Link to={"/diaryadd/"+this.props.id}>
                        <img src={add} alt='' style={{width:'25px'}} key='add'/>
                    </Link>
                ]}>穿搭日记</NavBar>
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
                    {
                        this.state.content.map((item)=>( <img src={this.state.content[0].userPic} alt='' style={{width:'15%',borderRadius:'50%',position: 'absolute',top:'85%',left:'0',zIndex:"99"}}/>))
                    }
                   
                </div>                
                <Timeline style={{marginLeft:'20px',marginTop:'30px'}}>
                {
                    this.state.content.map((item,idx)=>
                        <Timeline.Item dot={<Icon type="heart" theme="filled" style={{ fontSize: '16px' }} key={idx}/>} color="red">
                            <div style={{width:'95%',padding:'10px',backgroundColor:'#c7e7c2',borderRadius:'10px'}}>
                            <Grid data={item.dimg}
                                columnNum={3}
                                renderItem={dataItem => (
                                    <img src={dataItem} alt="" style={{width:'100%'}}/>
                                )}
                                />
                                <p style={{color:'#1f8774',marginTop:'8px'}}>{item.diaryContent}</p>
                                <span style={{color:'#888'}}>{item.diaryTime} <img src={del} alt='' style={{width:'7%',float:'right'}} onClick={()=>this.deleteItem(idx)}/></span>
                            </div>    
                        </Timeline.Item>
                    )
                }
                </Timeline>           
            </div>
            
        );
    }
}
