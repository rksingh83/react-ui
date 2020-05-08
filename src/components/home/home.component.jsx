import React from 'react';
import HomePage from '../../homepage.component';

import './home.style.scss';

const Home = ()=>{
      return(
        <section className="hero-area bg-1">
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <div className="block">
                        <h1 className="wow fadeInDown" data-wow-delay="0.3s" data-wow-duration=".2s">Bring Your Product To Light</h1>
                        <p className="wow fadeInDown" data-wow-delay="0.5s" data-wow-duration=".5s">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                        <div className="wow fadeInDown" data-wow-delay="0.7s" data-wow-duration=".7s">
                            <a className="btn btn-home" href="#about" role="button">Get Started</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 wow zoomIn">
                    <div className="block">
                        <div className="counter text-center">
                            <ul id="countdown_dashboard">
                                <li>
                                    <div className="dash days_dash">
                                        <div className="digit">0</div>
                                        <div className="digit">0</div>
                                        <div className="digit">0</div>
                                        <span className="dash_title">Days</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="dash hours_dash">
                                        <div className="digit">0</div>
                                        <div className="digit">0</div>
                                        <span className="dash_title">Hours</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="dash minutes_dash">
                                        <div className="digit">0</div>
                                        <div className="digit">0</div>
                                        <span className="dash_title">Minutes</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="dash seconds_dash">
                                        <div className="digit">0</div>
                                        <div className="digit">0</div>
                                        <span className="dash_title">Seconds</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
          
      )
          
      
}
export default Home;