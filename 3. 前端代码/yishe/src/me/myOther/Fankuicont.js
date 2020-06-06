import React, { Component } from 'react';
import { NavBar,Grid , Accordion, List} from 'antd-mobile';
import { Link,Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../../images/fanhui_1.png';

var fankuis = []; 
var users = [];

export default class Fankuicont extends Component {
    constructor(){
        super();
        this.state = {
            content:[],
            report:[],
            user:[]
        }
    }
    componentDidMount() {
        fetch('http://47.98.163.228:3000/fankui/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {    
                for(var i=0;i<res.length;i++){
                    res[i].fbTime = res[i].fbTime.split('T')[0];
                    console.log(res[i].fbTime);   
                }         
                this.setState({
                    content: res,
                })
                console.log(this.state.content)
            }
        }) 
        fetch('http://47.98.163.228:3000/reports/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {   
                for(var i = 0;i<res.length;i++) {
                    fetch('http://47.98.163.228:3000/users/'+res[i].rperId)
                    .then(res=>res.json())
                    .then(res=>{
                        {    
                            users.push(res[0].userName)        
                            this.setState({
                                user: users,
                            })
                            console.log(this.state.user)
                        }
                    }) 
                }             
                this.setState({
                    report: res,
                })
                console.log(this.state.report)
            }
        })
        
    }
    onChange = (key) => {
        console.log(key);
    } 
    render() {
        return (
            <div>
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/myfankui/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan66"/></Link>
                ]}
                >我的反馈</NavBar>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header="反馈" className="pad">
                            <List className="my-list">
                            {
                                this.state.content.map((item,idx)=>
                                    <List.Item style={{width:'100%',borderBottom:'2px solid #ccc'}} key={idx} wrap>
                                        <span>问题：</span>
                                        <span style={{color:'#000',fontSize:'16px'}}>{item.fbContent}</span>
                                        <p style={{float:'right'}}>{item.fbTime}</p>
                                        <p></p>
                                        <span style={{color:'#000',fontSize:'14px'}}>{item.huifu}</span>
                                    </List.Item>    
                                )
                            }
                            </List>    
                        </Accordion.Panel>
                        <Accordion.Panel header="举报" className="pad">
                            <List className="my-list">
                            {
                                this.state.report.map((item,idx)=>
                                    <List.Item style={{width:'100%',borderBottom:'2px solid #ccc'}} key={idx} wrap>
                                        <span style={{color:'#000',fontSize:'16px'}}>举报：您举报{this.state.user[idx]}发表的文章{item.rptype}</span><br/>
                                        <span style={{color:'red',fontSize:'14px'}}>【举报结果】：{item.result}</span>
                                        <p style={{float:'right'}}>{item.rptime.split('T')[0]}</p>
                                    </List.Item>    
                                )
                            }
                            </List>    
                        </Accordion.Panel>
                    </Accordion>
                </div>    
            </div>
        )
    }
}

