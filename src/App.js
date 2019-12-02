import React from 'react';
import { Provider } from 'react-redux';

import reduxStore from './reduxStore';

import Uploader from './components/Uploader';
import Viewer from './components/Viewer';
import RecordController from './components/RecordController';
import ImageList from './components/ImageList';

import { Layout } from 'antd';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Header className="app-header">
          Record with PDF
          <RecordController/>
        </Header>
        <Layout>
          <ImageList/>
          <Content>
            <Uploader/>
            <Viewer/>
          </Content>
        </Layout>
      </div>
    </Provider>
  );
}

export default App;
