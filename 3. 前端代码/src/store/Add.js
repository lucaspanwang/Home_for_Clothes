import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import Back from '../images/返回 (1).png';
import './store.css';
let value='';
export default class Add extends Component {
    constructor(){
        super();
        this.state={
            value:''
        }
    }    
    componentDidMount(){
        // console.log(this.props.match.params.id);//获取用户id
    }
    // shouldComponentUpdate(){  页面渲染才执行的函数
    //     console.log(this.state.value);
    // }
    change=(e)=>{
        // value=e.target.value;
        this.setState({
            value:e.target.value
        })
    }
    handle=()=>{
        // console.log(this.state.value)
        fetch("http://47.98.163.228:8084/value", {
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:JSON.stringify({value:this.state.value}) 
      })
        // console.log(value);
        // console.log(this.state.value);
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to={"/zhenglitab/"+this.props.match.params.id}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                    style={{ backgroundColor: 'rgb(252, 157, 154)' }}>添加
                </NavBar>
                <h2 style={{margin:'5%',fontWeight:"lighter"}}>请输入你想要添加的空间名称:</h2>
                <input type="type" style={{marginLeft:'5%',height:'30px'}} onChange={this.change}/>
                <a href={"/#/zhenglitab/"+this.props.match.params.id}><input type="submit" style={{height:'30px',width:'50px'}} onClick={this.handle}/></a>
            </div>
        )
    }
}
