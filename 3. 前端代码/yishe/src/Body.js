import React, { Component } from 'react'

export default class Body extends Component {
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
                                 <h3>15,823 </h3>
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
                                <h3>36,752 </h3>
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
