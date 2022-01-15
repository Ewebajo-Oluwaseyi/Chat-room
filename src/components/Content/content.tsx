import React from 'react'
import data from '../../json/data.json'

function content() {
   // console.log(data)
    return (
        <div>
            {data.productRequests.map((feed, id) => (
                <div className="feeback_card">
                    <div className="suggestions">
                        <div key={id} className="suggestions__wrapper">
                            <div className="suggestions__wrapper__upvote">
                                <button className="btn suggestions_btn">
                                    <span>
                                        <i className="fa fa-angle-up"></i>
                                        {feed.upvotes}
                                    </span>
                                </button>
                            </div>
                            <div className="suggestions__content">
                                <div className="suggestions__title">
                                    <span>{feed.title}</span>
                                </div>
                                <div className="suggestions__description">
                                    <span>{feed.description}</span>
                                </div>
                                <button className="btn btn_category">
                                    <span className="category_btn">{feed.category}</span>
                                </button>
                            </div>
                            <div className="suggestions__wrapper__comments">
                                <span className="comments_content">
                                    <i className="fa fa-comment"></i>
                                    {feed.comments && feed.comments}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default content
