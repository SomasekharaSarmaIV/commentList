import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  toggleIsLikeed = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetail={eachComment}
        toggleIsLikeed={this.toggleIsLikeed}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const intialBackgroundColorNames = `intial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: intialBackgroundColorNames,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      commentInput: '',
      nameInput: '',
    }))
  }

  inputOnChange = event => {
    this.setState({nameInput: event.target.value})
  }

  textAreaOnChange = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1>Comments</h1>
          <div className="input-section">
            <form onSubmit={this.onAddComment}>
              <p className="form-description">
                Say Something about 4.0 Technologies
              </p>

              <input
                type="text"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.inputOnChange}
                className="input"
              />
              <br />
              <textArea
                placeholder="Your Comment"
                rows="6"
                onChange={this.textAreaOnChange}
                className="text-area"
              />
              <br />
              <button type="submit" onClick={this.onClick}>
                Add Commentt
              </button>
            </form>

            <img
              className="img"
              alt="comments"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            />
          </div>
          <hr />
          <p>
            <span className="comments-count">{commentsList.length}</span>{' '}
            comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
