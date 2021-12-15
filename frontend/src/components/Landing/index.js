import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

const Landing = () => {

    return(
            <div id="landing-container" className="row">
                <div className="col-sm-4 card-container">
                    <div className="card">
                    <img src="https://img.icons8.com/ios-filled/100/000000/timer.png" className='card-img-top'/>
                    <div className="card-body">
                        <h5 className="card-title">Pomodoro Timer</h5>
                        <p className="card-text">Use the timer in order to help manage your time in a fast and convient way. It can also help budget breaks according to your needs. Set aside time where you really focus on your task.</p>
                        <Link className="btn btn-primary" aria-current="page" to="/timer">Go to timer</Link>
                    </div>
                    </div>
                </div>
                <div className="col-sm-4 card-container">
                    <div className="card">
                        <img src="https://img.icons8.com/ios-glyphs/100/000000/template.png" className='card-img-top'/>
                        <div className="card-body">
                            <h5 className="card-title">Session Templates</h5>
                            <p className="card-text">Create customized session layouts to save for later use. Choose from a list of your own preset session templates or browse through community created templates!</p>
                            <Link className="btn btn-primary" aria-current="page" to="/templates">View Templates</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 card-container">
                    <div className="card">
                    <img className='card-img-top' src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-magnifying-glass-interface-kiranshastry-solid-kiranshastry.png"/>
                        <div className="card-body">
                            <h5 className="card-title">Track your progess</h5>
                            <p className="card-text">View statistics to get an overlook of the work you have completed while using Project Productivity. View your history of past sessions you have completed and information on your performance.</p>
                            <Link className="btn btn-primary" aria-current="page" to="/stats">View Stats</Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Landing;