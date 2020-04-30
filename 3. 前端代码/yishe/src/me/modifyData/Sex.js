import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../../images/fanhui_1.png';

export default class Sex extends Component {
    constructor(){
        super();
        this.state={
            sex:'0'
        }
    }
    getValue=(e)=>{
        //获取单选框选中的值
        //console.log(e.target.value);
        this.setState({
          sex:e.target.value
        })
    }
    handlePost =(data)=> { 
        var InputValue = this.state.sex;
        var sex = '';
        if(InputValue==='0'){
            sex = '男'
        }else{
            sex = '女'
        }
        console.log(sex);
        fetch('http://47.98.163.228:3000/changeSex',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body:JSON.stringify({sex:sex,userId:this.props.match.params.id}) 
        })
    }
    render() {
        return (
            <div>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/aboutme/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fanngh"/></Link>
                ]}
                rightContent={[
                    <Link to={"/aboutme/"+this.props.match.params.id} style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px'}} onClick={this.handlePost}>完成</Link>
                ]}
                >更改性别</NavBar>
                <form style={{marginLeft:'35%',marginTop:'15%',fontSize:'20px'}}>
                    <input type="radio" checked={this.state.sex=='0'} onChange={(e)=>this.getValue(e)} value="0" style={{marginRight:'20%'}}/><label htmlFor="man">男</label>
                    <br/>
                    <input type="radio" checked={this.state.sex=='1'} onChange={(e)=>this.getValue(e)} value="1" style={{marginRight:'20%'}}/><label htmlFor="woman">女</label>
                </form>
            </div>
        )
    }
}

