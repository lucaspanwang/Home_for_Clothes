import React, { Component } from 'react'

export default class Index extends Component {
    constructor(){
        super();
        this.state=({
            num:0,
            num2:0,
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:8086/article')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                num:res.length
            })
        })
        fetch('http://47.98.163.228:8088/users')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                num2:res.length
            })
        })    
    }
    render() {
        return (
            <div>
                <div id="page-wrapper">
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="page-header">
                                衣舍
                            </h1>
                        </div>
                    </div>			
    
                    <div class="row">
                        <div class="col-md-3 col-sm-12 col-xs-12">
                            <div class="panel panel-primary text-center no-boder bg-color-red">
                                <div class="panel-left pull-left red">
                                    <i class="fa fa fa-comments fa-5x"></i>
                                </div>
                                <div class="panel-right">
                                    <h3>{this.state.num2}</h3>
                                   <strong> 用户数量 </strong>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-12 col-xs-12">
                            <div class="panel panel-primary text-center no-boder bg-color-brown">
                                <div class="panel-left pull-left brown">
                                    <i class="fa fa-users fa-5x"></i>
                                </div>
                                <div class="panel-right">
                                    <h3>{this.state.num}</h3>
                                 <strong>文章数量</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
