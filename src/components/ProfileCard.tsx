import React from 'react';

const ProfileCard = ({ user, userRole }) => {
  const getFirstLetterOfName = () => user.name.charAt(0);

  return (
    <div className="col-lg-4" style={{ height: '200px' }}>
      <div className="card mb-4">
        <div className="card-body text-center d-flex flex-column align-items-center">
          <div className="role-badge mb-3">
            <span className="badge badge-primary">{userRole}</span>
          </div>
          <div className="profile-img-container">
            <span className="profile-img">{getFirstLetterOfName()}</span>
          </div>
          <h5 className="my-3">{user.name}</h5>
          <p className="text-muted mb-1">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
