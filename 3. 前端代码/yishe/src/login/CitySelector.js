import {Picker} from 'antd-mobile'
import React from 'react'
import {Consumer} from '../context'

const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', paddingLeft: 15, border:'solid 1px grey',
        borderRadius:'6px', marginBottom:'10%'}}
    >
        <div className="test" style={{ fontSize:'18px', display: 'flex', height: '42px', lineHeight: '42px',position:'relative',borderBottom:0, color:'grey'}}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
            <div style={{ textAlign: 'right', color: 'grey', marginRight: 15 }}>{props.extra}</div>
        </div>
    </div>
);
 
export default class CitySelector extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pickerValue: [],
            userCity:''
        };
        this.changeCity = this.changeCity.bind(this);
    }

    changeCity(){
        var code0 = this.state.pickerValue[0];
        var code1 = this.state.pickerValue[1];
        let districtData = require('./location.json');
        for(var k in districtData){
            if(districtData[k].code==code0){
                for(var m in districtData[k].cities){
                    if (districtData[k].cities[m].code==code1){
                        var city = districtData[k].cities[m].name;
                        this.setState({userCity:city});
                    }
                }
                }
            }
        }
 
    render(){
        let antdDistrict =[];
        let districtData = require('./location.json');
        Object.keys(districtData).forEach((index)=>{
            let itemLevel1 ={};
            let itemLevel2 ={};
            itemLevel1.value = districtData[index].code;
            itemLevel1.label = districtData[index].name;
            itemLevel1.children = [];
            let data = districtData[index].cities;
            Object.keys(data).forEach((index)=>{
                itemLevel2.value = data[index].code;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3 ={};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index)=>{
                    itemLevel3.value = index;
                    itemLevel3.label = data2[index];
                    itemLevel2.children.push(itemLevel3);
                    itemLevel3 ={};
                });
                itemLevel1.children.push(itemLevel2);
                itemLevel2 ={};
            });
            antdDistrict.push(itemLevel1)
        });
        // console.log(antdDistrict);
        return (
            <Consumer>
                {
                (data)=>{return <div>
                    <Picker
                        title="选择地区"
                        // extra="请选择(可选)"
                        data={antdDistrict}
                        value={this.state.pickerValue}
                        onChange={v => this.setState({ pickerValue: v })}
                        onOk={(v) => {this.setState({ pickerValue: v })}}
                        onPickerChange={(v) => {this.setState({ pickerValue: v });this.changeCity();data.userCity=this.state.userCity;}}
                        onClick={()=>{console.log('xx')}}
                    >
                        <CustomChildren>请选择城市</CustomChildren>
                    </Picker>
                </div>}
                }
            </Consumer>
        )
    }
  }