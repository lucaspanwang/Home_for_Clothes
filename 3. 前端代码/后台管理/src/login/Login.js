import React, { Component } from 'react';
import logo from '../images/logo_bai.png';
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
        if(this.state.id==='admin' && this.state.pwd==='admin'){
            window.location.href='/tab';
        }else{
            this.error();
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
                    {/* <span style={{marginLeft:'20%',fontSize:'16px',color:'white'}}>账号：</span><input type='text' style={{background:'#001529',opacity:'0.80',width:'50%',height:'30px',border:'none',borderBottom:'1px solid white',color:'white'}} onChange={(e)=>this.handleChange1(e)}/><br/>
                    <span style={{marginLeft:'20%',marginTop:'30px',fontSize:'16px',color:'white'}}>密码：</span><input type='password' style={{background:'#001529',opacity:'0.80',marginTop:'30px',width:'50%',height:'30px',border:'none',borderBottom:'1px solid white',color:'white'}} onChange={(e)=>this.handleChange2(e)}/> */}
                    <button style={{marginLeft:'20%',marginTop:'50px',fontSize:'22px',color:'white',width:'60%',height:'50px',background:'#0b9ad6',border:'none',borderRadius:'10px'}} onClick={this.login}>登录</button>
                </div>
            </div>
        </div>
    )
  }
}