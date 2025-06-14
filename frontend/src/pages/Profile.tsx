import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState, useRef } from 'react';
import './Profile.css';

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    pincode: '',
  });
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.given_name || '',
        lastName: user.family_name || '',
        email: user.email || '',
        phone: '',
        city: '',
        pincode: '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    if (user) {
      setForm({
        firstName: user.given_name || '',
        lastName: user.family_name || '',
        email: user.email || '',
        phone: '',
        city: '',
        pincode: '',
      });
    }
    setEditing(false);
    setStatus('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      const token = await getAccessTokenSilently();
      const payload = {
        authId: user?.sub,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        pincode: form.pincode,
      };
      const res = await fetch(`http://localhost:5000/api/users/${user?.sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('Profile updated!');
        setEditing(false);
      } else {
        setStatus('Failed to update profile.');
      }
    } catch (err) {
      setStatus('Error updating profile.');
    }
  };

  const handleAvatarClick = () => {
    if (editing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>You're not logged in</p>;

  return (
    <div className="profile-bg">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar" onClick={handleAvatarClick}>
              <img src={user?.picture} alt={user?.name} />
              {editing && (
                <>
                  <div className="profile-avatar-edit">
                    <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    disabled
                  />
                </>
              )}
            </div>
            <h2 className="profile-title">{form.firstName} {form.lastName}</h2>
            <p className="profile-email">{form.email}</p>
          </div>
          <hr className="profile-divider" />
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-form-group">
              <div className="profile-form-section-title">Personal Information</div>
              <div className="profile-form-row">
                <div className="profile-form-field">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="profile-form-field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>
              <div className="profile-form-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>

            <div className="profile-form-group">
              <div className="profile-form-section-title">Contact Details</div>
              <div className="profile-form-field">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="profile-form-row">
                <div className="profile-form-field">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="profile-form-field">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>
            </div>

            {!editing ? (
              <button type="button" className="profile-btn edit" onClick={handleEdit}>
                Edit Profile
              </button>
            ) : (
              <div className="profile-form-btns">
                <button type="submit" className="profile-btn save">Save</button>
                <button type="button" className="profile-btn cancel" onClick={handleCancel}>Cancel</button>
              </div>
            )}
            {status && (
              <p className={`profile-status ${status.includes('error') || status.includes('Failed') ? 'error' : 'success'}`}>
                {status}
              </p>
            )}
          </form>
        </div>

        <div className="profile-account-info">
          <div className="account-info-header">
            <svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <h3>Account Information</h3>
          </div>
          
          <div className="account-info-item">
            <div className="account-info-label">Email Verified</div>
            <div className="account-info-value">
              {user?.email_verified ? (
                <span className="status-verified">✓ Verified</span>
              ) : (
                <span className="status-unverified">✗ Not Verified</span>
              )}
            </div>
          </div>

          <div className="account-info-item">
            <div className="account-info-label">Nickname</div>
            <div className="account-info-value">{user?.nickname || 'Not Set'}</div>
          </div>

          

          <div className="account-info-item">
            <div className="account-info-label">Last Updated</div>
            <div className="account-info-value">
              {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Unknown'}
            </div>
          </div>

          <div className="account-info-item">
            <div className="account-info-label">Profile Picture</div>
            <div className="account-info-value">
              {user?.picture ? (
                <span className="status-verified">✓ Set</span>
              ) : (
                <span className="status-unverified">✗ Not Set</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;