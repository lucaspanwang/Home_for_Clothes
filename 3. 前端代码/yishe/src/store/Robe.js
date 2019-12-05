import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/返回 (1).png';

export default class Robe extends Component {
    constructor(){
        super();
        this.state={
            url:'http://47.98.163.228:8087/robe',
            picture:[]
        }
    }
    componentDidMount(){
        // console.log(this.props.match.params.id);//获取用户id
        fetch(this.state.url)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                picture:res
            })
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to={"/zhenglitab/"+this.props.match.params.id}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>衣柜</NavBar>
                <div>
                    {
                    this.state.picture.map((item,i)=>(<img src={`http://47.98.163.228:8087/${item}`} style={{width:'120px',height:'120px',margin:'2px'}}/>))
                    }
                </div>
            </div>
        )
    }
}
