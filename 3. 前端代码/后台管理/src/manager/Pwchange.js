import React, { Component } from 'react';
import { Link,Route, HashRouter as Router } from 'react-router-dom';
import {Toast} from 'antd-mobile';

export default class Pwchange extends Component {
    constructor(){
        super();
        this.state=({
            ress:[],
            pw:'',
            ming:'',
            oldpw:'',
            newpw:''

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
                    pw:res[0].password,
                    ming:res[0].ming
                })      
            }
        }) 
    }
    getoldpw = (e)=>{
        this.setState({
            oldpw: e.target.value
        });
    }
    getnewpw = (e)=>{
        this.setState({
            newpw: e.target.value
        });
    }

   
    handlePost =(data)=> { 
        if(this.state.oldpw === this.state.pw){
            fetch('http://47.98.163.228:3000/pwchange',{
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8'
                },
                body:JSON.stringify({xuehao:this.state.xuehao,password:this.state.newpw}) 
            })
            Toast.loading('密码保存中...',2, () => {
                window.location.href='http://localhost:3000/tab/medit/'+this.props.match.params.id
            });
        }else{
            alert('旧密码输入错误！')
        }
        
    }
    
    render() {
        return (
            <div>
                <div style={{backgroundColor:'white',padding:'30px'}}>
                    <div style={{height:'50px'}}>
                        <Link to='/tab/manager'  style={{color:'#1890ff',fontSize:'20px'}}> 管理员信息</Link>&nbsp;/&nbsp;<Link to={'/tab/medit/'+this.props.match.params.id}  style={{color:'#50718f',fontSize:'14px'}}> {this.state.ming}</Link>&nbsp;/&nbsp;修改密码
                    </div>
                    {
                        this.state.ress.map((item,idx)=>
                            <div>
                                <div style={{backgroundColor:'white'}}>
                                    <span style={{fontSize:'15px',fontWeight:'bolder'}}>旧密码：</span><input type='password' placeholder='请输入旧密码' onChange={this.getoldpw} style={{border:'1px solid #ddd',height:'30px',borderRadius:'5px',paddingLeft:'5px',marginBottom:'10px'}}/>
                                    <br/>
                                    <span style={{fontSize:'15px',fontWeight:'bolder'}}>新密码：</span><input type='password' placeholder='请输入新密码' onChange={this.getnewpw} style={{border:'1px solid #ddd',height:'30px',borderRadius:'5px',paddingLeft:'5px',marginBottom:'10px'}}/>
                                    <br/>
                                    <button onClick={this.handlePost}>保存</button>
                                </div>            
                            </div>
                    )}
                    
                </div>
            </div>
        )
    }
}

