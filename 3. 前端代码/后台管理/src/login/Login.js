import React, { Component } from 'react';
import logo from '../images/logo_bai.png';
import { message } from 'antd';

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            id:'',
            pwd:'',
            flag:0  //0表示不能登陆，1表示验证通过可以登陆
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
        message.error('输入账号或密码错误！！！',1.5);
    };
    noNull = () => {
        message.error('输入账号或密码不能为空！！！',1.5);
    }
    login = () => {//改成post请求
        if(this.state.id && this.state.pwd){
            fetch('http://47.98.163.228:3004/manager?id='+this.state.id+'&pwd='+this.state.pwd)
            .then(res => res.json())
            .then(res => {
                if(res.length){
                    this.setState({
                        flag:1
                    });
                    window.location.href = '/tab';
                    // localStorage.setItem('manager',this.state.id);
                    sessionStorage.setItem('manager',this.state.id);//会话存储，必须登陆,一台电脑只能登陆一个人
                }else{
                    this.error();
                }
                console.log(res);
            })
        }else{
            this.noNull();
        }
    }
  render() {
    return (
        <div style={{padding:"15vh 20vw"}}>
            <div style={{background:'#001529',opacity:'0.80',width:'60vw',height:'70vh',borderRadius:'15px',boxShadow:'15px 15px 12px #354B5E'}}>
                <div style={{float:'left',width:'calc(40% - 2px)',height:'100%',borderRight:'2px solid white',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <img src={logo} alt='' style={{width:'200px',margin:'0 auto'}}/>
                    <h1 style={{fontFamily:'华文新魏',textAlign:'center',color:'white',fontSize:'36px'}}>衣舍后台管理系统</h1>
                </div>
                <div style={{float:'left',width:'60%',height:'100%'}}>
                    <p style={{color:'#0b9ad6',marginLeft:'20%',marginTop:'18%',fontSize:'20px',marginBottom:'40px'}}>登录/Login</p>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50px'}}>
                        <label style={{fontSize:'18px',color:'white'}}>账号：</label>
                        <input type='text' style={{background:'#001529',opacity:'0.80',width:'50%',border:'none',borderBottom:'1px solid white',color:'white'}} onChange={(e)=>this.handleChange1(e)}/>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50px'}}>
                        <label style={{fontSize:'18px',color:'white'}}>密码：</label>
                        <input type='password' style={{background:'#001529',opacity:'0.80',width:'50%',border:'none',borderBottom:'1px solid white',color:'white'}} onChange={(e)=>this.handleChange2(e)}/>
                    </div>
                    <button style={{marginLeft:'20%',marginTop:'50px',fontSize:'22px',color:'white',width:'60%',height:'50px',background:'#0b9ad6',border:'none',borderRadius:'10px'}} onClick={this.login}>登录</button>
                </div>
            </div>
        </div>
    )
  }
}