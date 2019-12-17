import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../images/返回 (1).png';
import { Input } from 'antd';
const { TextArea } = Input;

export default class Info extends Component {
    constructor(){
        super();
        this.state={
            value:''
        }
    }
    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };
    handlePost =(data)=> { 
        fetch('http://47.98.163.228:8000/changeInfo',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body:JSON.stringify({info:this.state.value,userId:this.props.match.params.id}) 
        })
    }
    // handlePost = () => {
    //     var InputValue = this.state.value;
    //     console.log(InputValue,'------InputValue');
    //     localStorage.setItem('newInfo',InputValue)
    //     window.location.href = "/#/aboutme/"+this.props.match.params.id
    // }
    render() {
        return (
            <div>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/aboutme/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                rightContent={[
                    <Link to={"/aboutme/"+this.props.match.params.id} style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px',marginTop:'18%'}} onClick={this.handlePost}>完成</Link>
                ]}
                >个人简介</NavBar>
                <TextArea style={{marginTop:'5%',marginLeft:'3%',width:'94%',backgroundColor:'rgb(252,251,251)'}}
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="个人简介"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
            </div>
        )
    }
}

