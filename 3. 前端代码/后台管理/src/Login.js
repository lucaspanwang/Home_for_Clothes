import React, { Component } from 'react'
import logo from './logo_bai.png'
import { message } from 'antd';

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            id:'',
            pwd:''
        }
    }
    handleChange1(e){
        this.setState({
            id:e.target.value
        })
    }
    handleChange2(e){
        this.setState({
            pwd:e.target.value
        })
    }
    error = () => {
        message.error('输入账号或密码错误！！！',2);
    };
    login=()=>{
        if(this.state.id==='admin'&&this.state.pwd==='admin'){
            window.location.href='/tab';
        }else{
            this.error();
        }
    }
  render() {
    return (
        <div>
            <div style={{background:'#232323',opacity:'0.6',marginTop:'100px',marginLeft:'20%',width:'60%',height:'500px'}}>
                <div style={{float:'left',width:'40%',height:'100%',borderRight:'1px solid white'}}>
                    <img src={logo} alt='' style={{marginLeft:'25%',marginTop:'20%',width:'50%',height:'40%'}}/>
                    <h1 style={{fontFamily:'华文新魏',marginLeft:'10%',marginTop:'5%',color:'white',fontSize:'38px'}}>衣舍后台管理系统</h1>
                </div>
                <div style={{float:'left',width:'60%',height:'100%'}}>
                    <p style={{color:'#0b9ad6',marginLeft:'20%',marginTop:'10%',fontSize:'20px',marginBottom:'40px'}}>登录/Login</p>
                    <span style={{marginLeft:'20%',fontSize:'16px',color:'white'}}>账号：</span><input type='text' style={{background:'#232323',width:'50%',height:'30px',border:'none',borderBottom:'1px solid white',color:'white'}} onChange={(e)=>this.handleChange1(e)}/><br/>
                    <span style={{marginLeft:'20%',marginTop:'30px',fontSize:'16px',color:'white'}}>密码：</span><input type='password' style={{background:'#232323',marginTop:'30px',width:'50%',height:'30px',border:'none',borderBottom:'1px solid white',color:'white'}} onChange={(e)=>this.handleChange2(e)}/>
                    <button style={{marginLeft:'20%',marginTop:'50px',fontSize:'22px',color:'white',width:'60%',height:'50px',background:'#0b9ad6',border:'none',borderRadius:'10px'}} onClick={this.login}>登录</button>
                </div>
            </div>
        </div>
    )
  }
}