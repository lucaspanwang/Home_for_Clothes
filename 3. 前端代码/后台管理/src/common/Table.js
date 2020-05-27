import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './table.css';

const { confirm } = Modal;

export default class Table extends Component {
    constructor(){
        super();
        this.state={
            thead:[],//表头
            tbody:[],//表格数据
            keys:[],//表格数据对象中需要获取的key键
            twidth:[],//表格每列宽度(数组中的值相加为100)
        }
    }
    componentWillReceiveProps(nextProps){//获取父组件传递过来的数据
        console.log(nextProps);
        var twidth = [];
        if(nextProps.operate){
            for(var i=0;i<nextProps.twidth.length;i++){
                twidth[i] = nextProps.twidth[i]*4/5+"%";
            }
        }else{
            for(var i=0;i<nextProps.twidth.length;i++){
                twidth[i] = nextProps.twidth[i]*100/105+"%";
            }
        }
        this.setState({
            thead:nextProps.thead,
            tbody:nextProps.tbody,
            keys:nextProps.keys,
            twidth:twidth,
        },function(){
            console.log(this.state);
        })
    }
    showDeleteConfirm = (id) => {
        confirm({
            title: '你确定要删除这条数据?',
            icon: <ExclamationCircleOutlined />,
            content: '数据删除之后不能回撤，你确定以及肯定要删除?',
            okText: <button style={{background:'#00000000',border:'none'}} onClick={()=>this.props.deleteItem(id)}>确定</button>,
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    render() {
        return (
            <table border="1" className="table-module">
                <tr>
                    <th style={{width:'5%'}}>序号</th>
                    {this.state.thead.map((item,index)=>(<th style={{width:this.state.twidth[index]}}>{item}</th>))}
                    {this.props.operate?(<th style={{width:'20%'}}>操作</th>):''}
                </tr>
                {
                    this.state.tbody.map((items,index)=>(
                        <tr>
                            <td>{index+1}</td>
                            {this.state.keys.map((item)=>(<td>{items[item]}</td>))}
                            {
                                this.props.operate
                                ?(<td>
                                    {this.props.operate.find((item)=>item=='edit')?(<Link to={'/tab'+this.props.editItem+'/'+items[this.state.keys[0]]}><button className="btn btn_1">编辑</button></Link>):''}    
                                    {this.props.operate.find((item)=>item=='check')?(<Link to={'/tab'+this.props.checkItem+'/'+items[this.state.keys[0]]}><button className="btn btn_2">查看</button></Link>):''}    
                                    {this.props.operate.find((item)=>item=='delete')?(<button className="btn btn_3" onClick={()=>this.showDeleteConfirm(items[this.state.keys[0]])}>删除</button>):''}    
                                </td>):''
                            }
                        </tr>
                    ))
                }
            </table>
        )
    }
}
