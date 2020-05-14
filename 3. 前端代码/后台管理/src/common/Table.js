import React, { Component } from 'react';
import './table.css';

export default class Table extends Component {
    constructor(props){
        super(props);
        this.state={
            thead:[],//表头
            tbody:[],//表格数据
            keys:[],//表格数据对象中需要获取的key键
            twidth:[]//表格每列宽度(数组中的值相加为100)
        }
    }
    componentWillReceiveProps(nextProps){//获取父组件传递过来的数据
        var twidth = ['5%'];
        for(var i=0;i<nextProps.twidth.length;i++){
            twidth[i+1] = nextProps.twidth[i]*100/105+"%";
        }
        this.setState({
            thead:nextProps.thead,
            tbody:nextProps.tbody,
            keys:nextProps.keys,
            twidth:twidth
        },function(){
            console.log(this.state);
        })
    }
    render() {
        return (
            <table border="1" className="table-module">
                <tr>
                    <th style={{width:this.state.twidth[0]}}>序号</th>
                    {this.state.thead.map((item,index)=>(<th style={{width:this.state.twidth[index+1]}}>{item}</th>))}
                </tr>
                {
                    this.state.tbody.map((items,index)=>(
                        <tr>
                            <td>{index+1}</td>
                            {this.state.keys.map((item)=>(<td>{items[item]}</td>))}
                        </tr>
                    ))
                }
            </table>
        )
    }
}
