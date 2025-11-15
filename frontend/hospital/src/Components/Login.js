import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // State now explicitly includes all four fields from your requirement
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNUM: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for interactive UI elements
  const [focusedInput, setFocusedInput] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // NOTE: If your Login API truly expects all four fields (name, email, phoneNUM, password) 
    // for authentication, this will work. If it only expects email/password, you should 
    // remove the extra fields from the formData object before posting.
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v2/users/login",
        formData
      );
      console.log("Login Successful:", res.data);

      // ✅ Save user session and navigate
      localStorage.setItem("user", JSON.stringify(res.data.data));
      alert("Login successful!");
      navigate("/home");
      window.location.reload();

    } catch (err) {
      console.error("Login Failed:", err.response ? err.response.data : err.message);
      // NOTE: Using a generic error message if login fails.
      setError(err.response?.data?.message || "Login failed! Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  // --- Pure CSS Styling Objects (Attractive UI & Animations) ---

  const PRIMARY_COLOR = '#006BFF';
  const BG_COLOR = '#F9F9FB';

  const styles = {
    // 1. Container
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BG_COLOR,
      padding: '40px 20px',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    },
    // 2. Card (Same Attractive UI)
    card: {
      maxWidth: '500px',
      width: '100%',
      backgroundColor: '#ffffff',
      padding: '50px 50px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', 
      border: '1px solid #E0E0E0', 
    },
    // 3. Header
    header: {
      textAlign: 'center',
      marginBottom: '10px',
      color: '#212529',
      fontSize: '32px', 
      fontWeight: '700',
    },
    subtitle: {
      textAlign: 'center',
      color: '#6C757D',
      fontSize: '16px',
      marginBottom: '40px'
    },
    // 4. Form Group
    formGroup: {
      marginBottom: '25px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#343A40',
      fontSize: '14px',
    },
    // 5. Input Styles with Focus Animation (UI Good)
    inputBase: {
      width: '100%',
      padding: '14px 16px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#CED4DA',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: PRIMARY_COLOR,
      boxShadow: `0 0 0 4px rgba(0, 107, 255, 0.35)`,
    },
    // 6. Button Styles (Animation Good)
    button: {
      padding: '16px 20px',
      backgroundColor: PRIMARY_COLOR,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: '600',
      transition: 'all 0.3s ease-in-out',
      marginTop: '25px', 
      width: '100%',
      boxShadow: '0 4px 15px rgba(0, 107, 255, 0.4)',
      transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
    },
    buttonHover: {
      backgroundColor: '#005AC2',
      boxShadow: '0 8px 20px rgba(0, 107, 255, 0.5)',
    },
    buttonDisabled: {
      backgroundColor: '#B3D6FF',
      cursor: 'not-allowed',
      boxShadow: 'none',
      transform: 'translateY(0)',
    },
    // 7. Error Box
    errorBox: {
      padding: '15px',
      backgroundColor: '#F8D7DA',
      border: '1px solid #F5C6CB',
      color: '#721C24',
      borderRadius: '6px',
      marginBottom: '25px',
      fontSize: '14px',
      fontWeight: '500',
    },
  };

  // Helper functions to dynamically apply styles
  const getCombinedInputStyle = (name) => ({
    ...styles.inputBase,
    ...(focusedInput === name ? styles.inputFocus : {}),
  });

  const getButtonStateStyle = () => {
    let style = styles.button;
    if (!loading && isButtonHovered) {
      style = { ...style, ...styles.buttonHover };
    }
    if (loading) {
      style = { ...style, ...styles.buttonDisabled };
    }
    return style;
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in with your details.</p>

        {/* Error Message Display */}
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* 1. Name */}
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Full Name</label>
            <input
              type="text" id="name" name="name" placeholder="Enter the user name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              style={getCombinedInputStyle('name')}
              required
            /> 
          </div>

          {/* 2. Email */}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email" id="email" name="email" placeholder="xxx@hami.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              style={getCombinedInputStyle('email')}
              required
            />
          </div>
          
          {/* 3. Phone Number */}
          <div style={styles.formGroup}>
            <label htmlFor="phoneNUM" style={styles.label}>Phone Number</label>
            <input
              type="tel" id="phoneNUM" name="phoneNUM" placeholder="Enter phone Number"
              value={formData.phoneNUM}
              onChange={handleChange}
              onFocus={() => setFocusedInput('phoneNUM')}
              onBlur={() => setFocusedInput(null)}
              style={getCombinedInputStyle('phoneNUM')}
              required
            />
          </div>

          {/* 4. Password */}
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password" id="password" name="password" placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              style={getCombinedInputStyle('password')}
              required
            />
          </div>

          {/* Submission Button (Animated) */}
          <button
            type="submit"
            disabled={loading}
            style={getButtonStateStyle()}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        
        {/* Footer Link */}
        <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '15px' }}>
            <span style={{ color: '#6C757D', marginRight: '5px' }}>Don't have an account?</span>
            <a href="/signup" style={{ color: PRIMARY_COLOR, textDecoration: 'none', fontWeight: '600' }}>
                Sign up
            </a>
        </p>
      </div>
    </div>
  );
};

export default Login;