import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewTweet from './NewTweet'
import Tweet from './Tweet'

class TweetPage extends Component {
    render() {
        console.log(this.props)
        const { id, replies } = this.props
        return (
            <div>Tweet Page
                <Tweet id={id} />
                <NewTweet id={id} />
                {
                    replies.length !== 0 && <h3 className="center">Replies</h3>
                }
                <ul>
                    {
                        replies.map((id) => (
                            <li key={id}>
                                <Tweet id={id} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, tweets, users }, props) {
    const { id } = props.match.params
    return {
        id,
        replies: !tweets[id] ? [] : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp),
        authedUser
    }
}

export default connect(mapStateToProps)(TweetPage)