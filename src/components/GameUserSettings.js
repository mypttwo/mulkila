import React from 'react';

let userSettings = (props) => {
    return (
        <div className="card">
            <div className="card-header">My Settings</div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="emailInput">Email address</label>
                        <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter your email." value={props.email} onChange={props.updateEmail} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email. This is optional.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userNameInput">User name</label>
                        <input type="text" className="form-control" id="userNameInput" aria-describedby="usernameHelp" placeholder="Enter your User Name. " value={props.userName} onChange={props.updateUserName} />
                        <small id="usernameHelp" className="form-text text-muted">Again we'll never share your name. Other players will be able to see your name. This is optional.</small>
                    </div>
                    <button className="btn btn-primary" onClick={props.saveMySettings}>Save</button>
                </form>
            </div>
        </div>
    );
}

export default userSettings;