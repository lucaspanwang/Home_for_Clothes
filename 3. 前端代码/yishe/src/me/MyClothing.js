import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/返回 (1).png';

export default class MyClothing extends Component {
    constructor(){
        super();
        this.state={
            picture:[],
        }
    }
    componentDidMount(){
        fetch('http://47.98.163.228:8086/clothing?userId='+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].cloPic.indexOf('/');
                res[i].cloPic = "http://47.98.163.228:8086"+res[i].cloPic.substr(j);
            }
            this.setState({
                picture:res
            })
        });
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to={"/gerentab/"+this.props.match.params.id}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>衣服</NavBar>
                <div>
                    {
                        this.state.picture.map((item)=>(
                            <img src={item.cloPic} key={item.cloId} style={{width:'120px',height:'120px',margin:'2px',border:'1px solid #ddd'}}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}