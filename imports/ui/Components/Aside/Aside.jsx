import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Progress} from 'reactstrap';
import classnames from 'classnames';
import Alerts from "/imports/ui/Containers/Components/Aside/AlertsContainer";
import Tasks from "/imports/ui/Containers/Components/Aside/TasksContainer";
import Comments from "/imports/ui/Containers/Components/Aside/CommentsContainer";

class Aside extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    isActive(index) {
        return index === this.state.activeTab;
    }

    render() {
        return (
            <aside className="aside-menu">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '1'})} onClick={() => {
                            this.toggle('1');
                        }}>
                            <i className="icon-bell"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '2'})} onClick={() => {
                            this.toggle('2');
                        }}>
                            <i className="icon-list"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '3'})} onClick={() => {
                            this.toggle('3');
                        }}>
                            <i className="icon-speech"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '4'})} onClick={() => {
                            this.toggle('4');
                        }}>
                            <i className="icon-settings"></i>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Alerts isActived={this.isActive('1')}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Tasks isActived={this.isActive('2')}/>
                    </TabPane>
                    <TabPane tabId="3" className="p-3">
                        <Comments isActived={this.isActive('3')}/>
                    </TabPane>
                    <TabPane tabId="4" className="p-3">
                        <h6>Settings</h6>

                        No settings yet.
                    </TabPane>
                </TabContent>
            </aside>
        )
    }
}

export default Aside;
