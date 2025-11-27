import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaSignInAlt, FaEnvelope, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [particles, setParticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const API_BASE = 'http://127.0.0.1:8000/api/auth';
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'Admin'
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Patient'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Generate random particles for background
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6
    }));
    setParticles(newParticles);
  }, []);

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = 'Email is invalid';
    if (!loginData.password) newErrors.password = 'Password is required';
    else if (loginData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.fullName) newErrors.fullName = 'Full name is required';
    if (!signupData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.email = 'Email is invalid';
    if (!signupData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]+$/.test(signupData.phone)) newErrors.phone = 'Phone number is invalid';
    if (!signupData.password) newErrors.password = 'Password is required';
    else if (signupData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!signupData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (signupData.password !== signupData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError('');
    const newErrors = validateLogin();
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: loginData.email, password: loginData.password })
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || 'Login failed');
        return;
      }
      onLogin(loginData.role);
    } catch (err) {
      setServerError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setServerError('');
    const newErrors = validateSignup();
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: signupData.email,
          password: signupData.password,
          username: signupData.fullName
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || 'Signup failed');
        return;
      }
      // Auto login after signup
      const loginRes = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: signupData.email, password: signupData.password })
      });
      if (!loginRes.ok) {
        const ld = await loginRes.json();
        setServerError(ld.error || 'Login after signup failed');
        return;
      }
      onLogin(signupData.role);
    } catch (err) {
      setServerError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="login-container">
      {/* Animated Background Particles */}
      <div className="login-particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="login-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Background Medical Grid */}
      <div className="medical-grid">
        <div className="grid-line horizontal"></div>
        <div className="grid-line horizontal"></div>
        <div className="grid-line horizontal"></div>
        <div className="grid-line vertical"></div>
        <div className="grid-line vertical"></div>
      </div>

      {/* Split Screen Layout */}
      <div className="auth-wrapper">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="branding-content">
            <div className="logo-large">
              <MdLocalHospital className="logo-icon-large" />
              <div className="logo-pulse-large"></div>
            </div>
            <h1 className="brand-title">MediBridge</h1>
            <p className="brand-tagline">Smart Hospital Management System</p>
            <div className="brand-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Secure & Encrypted</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>24/7 Available</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>AI-Powered Analytics</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Real-time Tracking</span>
              </div>
            </div>
            <div className="system-badge">
              <div className="status-dot-large"></div>
              <span>System Online - All Services Available</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="auth-forms">
          <div className="forms-container">
            {/* Toggle Tabs */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
              <div className={`tab-indicator ${isLogin ? 'left' : 'right'}`}></div>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <h2 className="form-title">Welcome Back</h2>
                <p className="form-subtitle">Sign in to access your account</p>
                {serverError && <span className="error-message">{serverError}</span>}

                {/* Email Field */}
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="your.email@hospital.com"
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                {/* Role Selection */}
                <div className="form-group">
                  <label className="form-label">Select Role</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <select
                      name="role"
                      className="form-input form-select"
                      value={loginData.role}
                      onChange={handleLoginChange}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Receptionist">Receptionist</option>
                      <option value="Pharmacy">Pharmacy Staff</option>
                      <option value="Patient">Patient</option>
                    </select>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button" disabled={loading}>
                  <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                  <FaSignInAlt className="button-icon" />
                  <div className="button-shine"></div>
                </button>

                {/* Switch Mode */}
                <p className="switch-mode">
                  Don't have an account? 
                  <button type="button" onClick={switchMode} className="switch-link">
                    Sign Up
                  </button>
                </p>
              </form>
            ) : (
              /* Signup Form */
              <form className="auth-form" onSubmit={handleSignup}>
                <h2 className="form-title">Create Account</h2>
                <p className="form-subtitle">Join MediBridge today</p>
                {serverError && <span className="error-message">{serverError}</span>}

                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="fullName"
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="John Doe"
                      value={signupData.fullName}
                      onChange={handleSignupChange}
                    />
                  </div>
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="your.email@hospital.com"
                      value={signupData.email}
                      onChange={handleSignupChange}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+1-234-567-8900"
                      value={signupData.phone}
                      onChange={handleSignupChange}
                    />
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                {/* Password */}
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create a strong password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Re-enter your password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                {/* Role Selection */}
                <div className="form-group">
                  <label className="form-label">I am a</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <select
                      name="role"
                      className="form-input form-select"
                      value={signupData.role}
                      onChange={handleSignupChange}
                    >
                      <option value="Patient">Patient</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Receptionist">Receptionist</option>
                      <option value="Pharmacy">Pharmacy Staff</option>
                    </select>
                  </div>
                </div>

                {/* Terms */}
                <label className="checkbox-label terms-label">
                  <input type="checkbox" required />
                  <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                </label>

                {/* Submit Button */}
                <button type="submit" className="submit-button" disabled={loading}>
                  <span>{loading ? 'Creating...' : 'Create Account'}</span>
                  <FaSignInAlt className="button-icon" />
                  <div className="button-shine"></div>
                </button>

                {/* Switch Mode */}
                <p className="switch-mode">
                  Already have an account? 
                  <button type="button" onClick={switchMode} className="switch-link">
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="auth-footer">
        <p>© 2025 MediBridge. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Help</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
