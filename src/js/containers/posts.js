import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import Post from './post';
import _ from 'lodash';


class Posts extends React.Component {
    state = ({
    currentPage:1,
    perPage:10,
    totalpage:0
    })
     
    setParams =()=>{
        
    }

    componentDidMount() {
        this.setState=({

        })

        this
            .props
            .fetchPosts();
    }
    updatePosts(){
      
    }
    renderPosts = () => {
        return _.map(this.props.posts, post => {
            return (
                <Post key={post.id} post={post}/>
            )
        })
    }
    render() {

        return (
            <section className="posts">
                {this.renderPosts()}
            </section>
        )
    }

}

const mapStateToProps = (state) => {
    return {posts: state.posts}
}

export default connect(mapStateToProps, {fetchPosts})(Posts);