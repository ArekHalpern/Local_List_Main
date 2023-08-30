import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Plane from '../assets/plane.json';
import Lottie from 'lottie-react';


export const Home = props => {
  const { username, logout } = props;

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h3 className="welcomeMessage">Welcome, {username}!</h3>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 300, height: 300 }}>
              <Lottie loop={true} animationData={Plane} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link to="/search" className="btn btn-primary m-2" style={{ width: 'calc(100% + 24px)' }}>Search!</Link>
            <div style={{ display: 'flex', width: '100%' }}>
              <Link to="/userProfile/:id" className="btn btn-success m-2" style={{ flex: 1 }}>Profile</Link>
              <button className="btn btn-danger m-2" style={{ flex: 1 }} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  

const mapState = state => {
  return {
    username: state.auth.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};


export default connect(mapState, mapDispatchToProps)(Home);
