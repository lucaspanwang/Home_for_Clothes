import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';

import fanhui from '../images/fanhui_1.png';
import logo from '../images/logo.png'
import weixin from '../images/weixin.png'

export default class AboutUs extends Component {
    constructor(){
        super();
    }
    // hrefChange(str){
    //     var h=window.location.href;
    //     var index = h.lastIndexOf("\/");  
    //     window.location.href = h.substring(0, index+1)+str;
    // }

    render() {
        return (
            <div style={{width:'100%',height:'100%'}}>
              {/* 头 */}
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/setup/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fanuuu"/></Link>
                ]}
                >关于我们</NavBar>
                <div className="about" style={{textAlign:'center'}}>
                    <img src={logo} />
                    <p>衣舍</p>
                    <p>版本1.1</p>
                    <p style={{margin:'0 10%',paddingTop:'2%',fontSize:'17px',borderTop:'1px solid #ddd'}}>特别感谢衣舍的依依粉们，积极反馈使用体现，帮助我们优化产品</p>
                    <p style={{fontSize:'17px'}}>感谢大家陪我们一起成长~</p>
                    <img src={weixin} style={{width:'50%'}}/>
                    <p>官方微信账号</p>
                </div>
            </div>
        );
    }
}

