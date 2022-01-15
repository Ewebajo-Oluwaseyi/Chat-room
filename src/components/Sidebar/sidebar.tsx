import React from 'react'

function sidebar() {
    return (
        <div className="navbar">
            <div className="navbar__logo">
                <div className="navbar__logo__wrapper">
                    <h4>Frontend Mentor</h4>
                    <h5>Feedback Board</h5>
                </div>
            </div>
            <div className="filter card">
                <button type="button" className="button button__active">all</button>
                <button type="button" className="button">ui</button>
                <button type="button" className="button">ux</button>
                <button type="button" className="button">enhancement</button>
                <button type="button" className="button">bug</button>
                <button type="button" className="button">bugbug</button>
            </div>
            <div className="card roadmap">
                <div className="roadmap__header">
                    <h3>Roadmap</h3>
                    <span className="view_link">View</span>
                </div>
                <div className="roadmap__content">
                    <ul className="roadmap__list">
                        <li className="roadmap__list__item">
                            <div className="roadmap__indicator"></div>
                            <span className="roadmap__name">Planned</span>
                            <span className="roadmap__amount">2</span>
                        </li>
                        <li className="roadmap__list__item">
                            <div className="roadmap__indicator"></div>
                            <span className="roadmap__name">In-Progress</span>
                            <span className="roadmap__amount">3</span>
                        </li>
                        <li className="roadmap__list__item">
                            <div className="roadmap__indicator"></div>
                            <span className="roadmap__name">Live</span>
                            <span className="roadmap__amount">1</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default sidebar
