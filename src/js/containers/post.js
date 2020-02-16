import React from 'react';


class Post extends React.Component {

    render() {

        return <article className="posts__item" key={this.props.post.id}>
            <h1 className="posts__title">{this.props.post.title}</h1>
            <img className="posts__image" src={'./../images/'+this.props.post.image}/>
            <h3 className="posts__describe">{this.props.post.describe}</h3>
        </article>
    }

}

export default Post;
