import { Upload, Icon, message } from 'antd';
import React from "react";
import {Consumer} from '../context';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class Avatar extends React.Component {
  state = {
    avatarUrl:'',
    loading: false
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">添加头像</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Consumer>
        {
          (data)=>{return <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={info => {
              if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
              }
              if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (imageUrl) =>
                  {
                    this.setState({
                    imageUrl,
                    loading: false,
                    avatarUrl:imageUrl
                  });
                  data.picData = this.state.imageUrl;
                }
                );
              }
            }
            }
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}} /> : uploadButton}
          </Upload>}
        }
      </Consumer>
    )
  }
}