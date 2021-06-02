import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from "react-router-dom"

class NewTweet extends Component {
    state = {
        text: "",
        toHome: false
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { text } = this.state;
        const { dispatch, id } = this.props

        console.log(text);
        dispatch(handleAddTweet(text, id))

        this.setState({ text: "", toHome: id ? false: true })
    }

    render() {
        const { text, toHome } = this.state
        const tweetLeft = 280 - text.length

        if (toHome) {
            return <Redirect to="/"/>
        }

        return (
            <div>
                <h3 className="centered">Compose New Tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea className="textarea" placeholder="What's happening?"
                        value={text} onChange={this.handleChange}
                        maxLength={280} />
                { tweetLeft <= 100 && (
                    <div className="tweet-length">{tweetLeft}</div>
                )}
                <button className="btn" type="submit" disabled={text ===""}>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)
