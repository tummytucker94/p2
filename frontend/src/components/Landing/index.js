import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

const Landing = () => {

    return(
            <div id="landing-container" class="row">
                <div class="col-sm-4 card-container">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Pomodoro Timer</h5>
                        <p class="card-text">Use the timer in order to help manage your time in a fast and convient way. It can also help budget breaks according to your needs. Set aside time where you really focus on your task.</p>
                        <Link className="btn btn-primary" aria-current="page" to="/timer">Go to timer</Link>
                    </div>
                    </div>
                </div>
                <div class="col-sm-4 card-container">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Session Templates</h5>
                        <p class="card-text">Create customized session layouts to save for later use. Choose from a list of your own preset session templates or browse through community created templates!</p>
                        <Link className="btn btn-primary" aria-current="page" to="/templates">View Templates</Link>
                    </div>
                    </div>
                </div>
                <div class="col-sm-4 card-container">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Track your progess</h5>
                        <p class="card-text">View statistics to get an overlook of the work you have completed while using Project Productivity. View your history of past sessions you have completed and information on your performance.</p>
                        <Link className="btn btn-primary" aria-current="page" to="/stats">View Stats</Link>
                    </div>
                    </div>
                </div>
            </div>
    );
}

export default Landing;