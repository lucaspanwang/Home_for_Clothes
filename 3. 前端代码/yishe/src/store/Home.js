import React, { Component } from 'react';
import { Accordion, List } from 'antd-mobile';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/fanhui_1.png';

export default class Home extends Component {
    constructor(){
        super();
        this.state={
            url:'http://47.98.163.228:8084/home',
            pictureSummer:[],//记录图片路径
            pictureString:[],
            pictureWinter:[],
            num:-1,
            result:''//标记那个是红标
        }
    }
    deleteItem=(i,that)=>{
        // console.log(i)
        var p=this.state.picture;
        // console.log('删除前；',p)
        p.splice(i,1);
        // console.log('删除后：',p)
        this.setState({
            picture:p
        })
        fetch('http://47.98.163.228:8087/delete',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:JSON.stringify({nage:i,weizhi:'家',userId:this.props.match.params.id})
        })
    }
    
    componentDidMount(){
        //图片显示
        fetch('http://47.98.163.228:3003/picture', {
        method: 'post',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId:this.props.match.params.id,
          whereId:"1"
        })
      })
      .then((res)=>res.json())
      .then((res)=>{
        //   console.log('新的图片路径：'+res.picString)
        this.setState({
            pictureString:res.picString,
            pictureSummer:res.picSummer,
            pictureWinter:res.picWinter
        })
      })
      //那个是红标
        if (localStorage.getItem('搜索')) {
            this.setState({
                result: localStorage.getItem('搜索')
            })
            localStorage.setItem('搜索', '')
        }
    }
    render() {
        return (
            <div>
                <NavBar
                // style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                    style={{backgroundColor:'rgb(252, 157, 154)'}}
                    leftContent={
                        <Link to={"/apptab/"+this.props.match.params.id+'&store'}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                    >
                    {localStorage.getItem('jia')?localStorage.getItem('jia'):'家'}
                    </NavBar>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header="夏季">
                            <div style={{ position: 'relative' }}>
                                {
                                    this.state.pictureSummer.map((item, i) => {
                                        if (i == this.state.num) {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '1px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        } else if (item == this.state.result) {

                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '2px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            
                        </Accordion.Panel>
                        <Accordion.Panel header="春秋" className="pad">
                            <div style={{ position: 'relative' }}>
                                {
                                    this.state.pictureString.map((item, i) => {
                                        if (i == this.state.num) {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '1px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        } else if (item == this.state.result) {

                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '2px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </Accordion.Panel>
                        <Accordion.Panel header="冬季" className="pad">
                        <div style={{ position: 'relative' }}>
                                {
                                    this.state.pictureWinter.map((item, i) => {
                                        if (i == this.state.num) {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '1px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        } else if (item == this.state.result) {

                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '2px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, i)}>x</span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </Accordion.Panel>
                    </Accordion>
                </div>

            </div>
        )
    }
}




//原来显示图片
{/* <div style={{position:'relative'}}>
                    {
                    this.state.picture.map((item,i)=>{
                        if(i==this.state.num){
                            return(
                                <div key={i} style={{display:'inlinbe-block',position:'relative',width:'32%',height:"120px",margin:'2px',float:'left'}}>
                                <img src={`http://47.98.163.228:3004/${item}`}style={{width:'100%',height:'120px',border:'1px solid red'}}/>
                                <span style={{position:"absolute",color:'red',right:'5px',top:'-3px'}} onClick={this.deleteItem.bind(this,i)}>x</span>
                                </div>
                                )
                        }else if(item==this.state.result){
                            
                            return(
                                <div key={i} style={{display:'inlinbe-block',position:'relative',width:'32%',height:"120px",margin:'2px',float:'left'}}>
                                <img src={`http://47.98.163.228:3004/${item}`}style={{width:'100%',height:'120px',border:'2px solid red'}}/>
                                <span style={{position:"absolute",color:'red',right:'5px',top:'-3px'}} onClick={this.deleteItem.bind(this,i)}>x</span>
                                </div>
                                )
                        }else{
                            return(
                                <div key={i} style={{display:'inlinbe-block',position:'relative',width:'32%',height:"120px",margin:'2px',float:'left'}}>
                                <img src={`http://47.98.163.228:3004/${item}`}style={{width:'100%',height:'120px'}}/>
                                <span style={{position:"absolute",color:'red',right:'5px',top:'-3px'}} onClick={this.deleteItem.bind(this,i)}>x</span>
                                </div>
                            )
                        }
                    })
                    }
                </div> */}