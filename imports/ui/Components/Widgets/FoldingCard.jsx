import React, {Component} from 'react';

class FoldingCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open || false
        }
    }


    render() {
        const {header, content} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    {header}
                    <label className="switch switch-sm switch-text switch-info float-right mb-0">
                        <input type="checkbox" className="switch-input"
                               onChange={e => this.setState({open: !this.state.open})}/>
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                    </label>
                </div>
                {this.state.open ?
                    <div className="card-block report" dangerouslySetInnerHTML={{__html: content}}/> : ''}
            </div>
        )
    }
}

export default FoldingCard;
