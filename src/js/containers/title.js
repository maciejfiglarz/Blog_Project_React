import React from 'react';

class Title extends React.Component {

    render() {

        return (
            <div>
               {this.props.option == "full"
                    ? <h1 className="common-title">
                            {this.props.title}
                        </h1>
                    : <div className="container">
                        <h1 className="common-title">
                            {this.props.title}
                        </h1>
                    </div>}
            </div>
        )

    }
}

export default Title;