import React, { Component } from 'react'
import { NavBar,List,Switch,WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

import fanhui from '../images/返回 (1).png'

export default class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          checked: false,
          checked1: true,
          checked_1: false,
          checked1_1: true,
          checked_2: false,
          checked1_2: true,
        };
      }
    render() {
        return (
            <div>
                {/* 头 */}
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <img src={fanhui} style={{width:'30px'}} key="fan"/>
                ]}
                >设置</NavBar>
                {/* 选择 */}
                <ListExample />
                <Se />
                <List  className="my-list">
                <Item arrow="horizontal" multipleLine onClick={() => {}}>
                关于我们
                </Item>
                </List>
                {/* 退出 */}
                <WhiteSpace/>
                <List  className="my-list">
                    <p style={{height:'50px',fontSize:'20px',paddingTop:'15px',textAlign:'center'}}>
                        切换账号
                    </p>
                </List>
                <List  className="my-list">
                    <p style={{height:'50px',fontSize:'20px',paddingTop:'15px',textAlign:'center'}}>
                        退出登录
                    </p>
                </List>
            </div>
        )
    }
}



class SwitchExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checked: false,
        checked1: true,
      };
    }
  
    render() {
      const { getFieldProps } = this.props.form;
      return (
        <List
          renderHeader={() => ''}
        >
          <List.Item
            extra={<Switch
              checked={this.state.checked}
              onChange={() => {
                this.setState({
                  checked: !this.state.checked,
                });
              }}
            />}
          >接受消息通知</List.Item>
          <List.Item
            extra={<Switch
              {...getFieldProps('Switch1', {
                initialValue: this.state.checked1,
                valuePropName: 'checked',
                onChange: (val) => {
                  console.log(val);
                  // Do not `setState` with rc-form
                  // this.setState({ checked1: val });
                },
              })}
              onClick={(checked) => {
                // set new value
                this.props.form.setFieldsValue({
                  Switch1: checked,
                });
              }}
            />}
          >声音</List.Item>
          <List.Item
            extra={<Switch
              {...getFieldProps('Switch7', {
                initialValue: true,
                valuePropName: 'checked',
              })}
              platform="ios"
            />}
          >开启横屏模式</List.Item>
        </List>
      );
    }
  }

  const Se = createForm()(SwitchExample);



  const Item = List.Item;
  const Brief = Item.Brief;
  
  class ListExample extends React.Component {
    state = {
      disabled: false,
    }
  
    render() {
      return (<div>
        <List className="my-list">
          <Item extra={'123456744'} style={{height:'70px'}}>账号</Item>
        </List>

      </div>);
    }
  }
  