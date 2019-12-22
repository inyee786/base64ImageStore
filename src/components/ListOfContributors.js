import React, { Component } from 'react'
import axios from 'axios';
import ContributorCard from './ContributorCard'
export class ListOfContributors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contributors: []
        }
    }

    async componentWillMount() {
        const contributors = await axios.get('/api/contributors').then(res => res.data);
        this.setState({ contributors: contributors })
    }

    render() {
        return (
            <div className="d-flex flex-wrap">
                {this.state.contributors.map(contributor => (<ContributorCard key={contributor.githubID} contributor={contributor} />))}
            </div>
        )
    }
}

export default ListOfContributors
