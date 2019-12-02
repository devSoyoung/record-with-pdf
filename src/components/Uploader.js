import React, {Component} from 'react';
import { Upload, Icon, message, Button } from 'antd';
import Convert from'./Converter';

const uploaderProps = {
  name: 'file',
  multiple: false,
  accept: '.pdf',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function Uploader() {
  return (
    <span>
      업로더
      <Upload {...uploaderProps}>
        <Button>
          <Icon type="upload" />PDF 파일 업로드
        </Button>
      </Upload>
      <Convert > </Convert>
    </span>
  );
}

export default Uploader;