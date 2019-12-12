import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/返回 (1).png';

export default class Home extends Component {
    constructor(){
        super();
        this.state={
            url:'http://47.98.163.228:8084/home',
            picture:[],
            num:-1
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
            body:JSON.stringify({nage:i,weizhi:'家'})
        })
    }
    componentDidMount(){
        // console.log(this.props.match.params.id);//获取用户id
        fetch(this.state.url)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                picture:res
            })
            console.log(this.state.picture)
        });
        fetch("http://47.98.163.228:8084/userid", {
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:JSON.stringify({userId:this.props.match.params.id}) 
      });
      fetch('http://47.98.163.228:8083/pp2')
        .then(res=>res.json())
        .then(res=>{
            console.log('????'+res.msg)
            var n = localStorage.getItem('count')
            localStorage.setItem('count', n+1)
            var nn = localStorage.getItem('count')
            if(nn==1){
                this.setState({
                    num:res.msg-1
                })
            }else{
                this.setState({
                    num:-1
                })
            }
        });
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to={"/zhenglitab/"+this.props.match.params.id}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>家</NavBar>
                <div style={{position:'relative'}}>
                    {
                    this.state.picture.map((item,i)=>{
                        if(i==this.state.num){
                            return(
                                <img src={`http://47.98.163.228:8084/${item}`}style={{width:'120px',height:'120px',margin:'2px',border:'2px solid red'}}/>
                                ,<span>jjj</span>
                                )
                        }else{
                            return(
                                <div style={{display:'inlinbe-block',position:'relative',width:'120px',height:"120px",margin:'2px',float:'left'}}>
                                <img src={`http://47.98.163.228:8084/${item}`}style={{width:'120px',height:'120px'}}/>
                                <span style={{position:"absolute",color:'red',right:'5px',top:'-3px'}} onClick={this.deleteItem.bind(this,i)}>x</span>
                                </div>
                            )}
                    })
                    }
                </div>
            </div>
        )
    }
}
