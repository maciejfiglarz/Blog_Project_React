import React from 'react'
import Posts from './../../containers/posts'
import {connect} from 'react-redux'

class Home extends React.Component {

    render() {
        return (
            <div>
                {/* <Posts /> */}
                </div>
        )
    }
    componentDidMount() {}

    componentWillUnmount() {}

}

const mapStateToProps = (state) => {
    return {user: state.user};
}

export default connect(mapStateToProps)(Home);