import React from 'react';

class Error extends React.Component {

    render() {

        return (
            <div>
                <h6 className="error">
                    <i className="fas fa-times"></i>
                    {this.props.label}
                </h6>

            </div>
        )

    }
}

export default Error;