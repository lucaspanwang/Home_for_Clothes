import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../images/返回 (1).png';

export default class Name extends Component {
    constructor(){
        super();
        this.state={
            value:''
        }
    }
    handelChange(e){
        this.setState({
            value:e.target.value
        })
        // console.log(this.state.value);
    }
    handlePost = () => {
        var InputValue = this.state.value;
        console.log(InputValue,'------InputValue');
        localStorage.setItem('newName',InputValue)
        window.location.href = "/#/aboutme/"+this.props.match.params.id
    }
    render() {
        return (
            <div>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/aboutme/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                rightContent={[
                    <p style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px',marginTop:'18%'}} onClick={this.handlePost}>完成</p>
                ]}
                >更改昵称</NavBar>
                <span style={{marginLeft:'5%',fontSize:'16px'}}>昵称：</span><input type='text' style={{width:'70%',height:'30px',border:'none',borderBottom:'1px solid blue'}} onChange={this.handelChange.bind(this)} defaultValue={this.state.value}/>
                <p style={{marginLeft:'5%',fontSize:'14px',color:'#ddd',marginTop:'2%'}}>好名字可以让你的朋友更容易记住你</p>
            </div>
        )
    }
}

