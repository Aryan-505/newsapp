import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
       let { title, description,imageUrl,newsUrl,author,date} = this.props
        return (
            
            <div className="my-3">
            <div className="card">
                <img src={!imageUrl?"https://telecomtalk.info/wp-content/uploads/2023/03/oneplus-nord-ce-3-lite-5g-display.jpg":imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sn btn-dark">Read more</a>
                </div>
            </div>
            </div>
    )
    }
}

export default NewsItem
