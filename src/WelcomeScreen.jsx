import React from "react";
import './WelcomeScreen.css';
import logo from "./meet-logo.png";

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
        (
            <div className="WelcomeScreen">
                <div class="welcome_container"></div>
                <img src={logo}  alt="meet-app-logo" width="300"/>
                <h1>Welcome to the Meet App</h1>
                <h4>
                    Log in to see upcoming events around the world for full-stack developers
                </h4>
                <div className="button_cont" align="center">
                    <div class="google-btn">
                        <div class="google-icon-wrapper">
                            <img
                                class="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                                alt="Google sign-in" 
                            />
                        </div>
                        <button onClick={() => {props.getAccessToken() }}
                            rel="nofollow opener"
                            class="btn-text"
                        >
                            <b>Sign in with Google</b>
                        </button>
                    </div>
                </div>
                <a
                    href="https://stellacea.github.io/Meet/privacy.html"
                    rel="noopener" target="_blank"
                >
                    Privacy policy
                </a>
            </div>
        )
        :null
}

export default WelcomeScreen;