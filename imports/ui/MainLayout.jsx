import React, { Component } from 'react';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Footer from "./components/Footer";

class MainLayout extends Component {
  render() {
    const {content} = this.props;
    return (
      <div>
        <Header/>
        <Sidebar/>
        <Content content={content}/>
        <Footer/>
      </div>
    );
  }
}
export default MainLayout;