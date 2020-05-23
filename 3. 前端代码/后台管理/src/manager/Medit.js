import React, { Component } from 'react';
import { Link,Route, HashRouter as Router } from 'react-router-dom';
import {Toast} from 'antd-mobile';

export default class Medit extends Component {
    constructor(){
        super();
        this.state=({
            ress:[],
            xuehao:'',
            ming:'',
            mokuai:''
        })
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
        fetch('http://47.98.163.228:3000/manager/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {   
                console.log(res);
                this.setState({
                    ress:res,
                    xuehao:res[0].xuehao,
                    ming:res[0].ming,
                    mokuai:res[0].mokuai
                })      
            }
        }) 
    }
    getmokuai = (e)=>{
        this.setState({
            mokuai: e.target.value
        });
    }
   
    handlePost =(data)=> { 
        fetch('http://47.98.163.228:3000/managerchange',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body:JSON.stringify({xuehao:this.state.xuehao,mokuai:this.state.mokuai}) 
        })
        Toast.loading('管理员信息保存中...',2, () => {
            window.location.href='http://localhost:3000/tab/manager'
        });
    }
    
    render() {
        return (
            <div>
                <div style={{backgroundColor:'white',padding:'30px'}}>
                    <div style={{height:'50px'}}>
                        <Link to='/tab/manager'  style={{color:'#1890ff',fontSize:'20px'}}> 管理员信息</Link>&nbsp;/&nbsp;{this.state.ming}
                    </div>
                    {
                        this.state.ress.map((item,idx)=>
                            <div>
                                <div style={{backgroundColor:'white'}}>
                                    <span style={{fontSize:'15px',fontWeight:'bolder'}}>学号：</span><input type='text' value={this.state.xuehao} style={{border:'none',height:'30px',paddingLeft:'5px',marginBottom:'10px'}}/>
                                    <br/>
                                    <span style={{fontSize:'15px',fontWeight:'bolder'}}>姓名：</span><input type='text' value={this.state.ming} style={{border:'none',height:'30px',paddingLeft:'5px',marginBottom:'10px'}}/>
                                    <br/>
                                    <span style={{fontSize:'15px',fontWeight:'bolder'}}>管理模块：</span><input type='text' value={this.state.mokuai} onChange={this.getmokuai} style={{border:'1px solid #ddd',height:'30px',borderRadius:'5px',paddingLeft:'5px',marginBottom:'10px'}}/>
                                    <br/>
                                    <button onClick={this.handlePost}>保存</button> <button><Link to={'/tab/pwchange/'+this.props.match.params.id} style={{color:'black',opacity:'0.65'}}> 修改密码</Link> </button>                                    
                                </div>    
                                    
                            </div>
                    )}
                    
                </div>
            </div>
        )
    }
}
