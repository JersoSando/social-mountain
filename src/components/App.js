import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then((res) => this.setState({ posts: res.data }))
  }

  async updatePost(id, text) {
    await axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then((res) => this.setState({posts: res.data}))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then((res) => this.setState({ posts: res.data}))
  }

  createPost() {

  }

  render() {
    const { posts } = this.state;
    // console.log(posts)

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {posts.map(post => (<Post deletePostFunc={this.deletePost} updatePostFunc={this.updatePost} postInfoObj={post} key={post.id} />))}
        </section>
      </div>
    );
  }
}

export default App;
