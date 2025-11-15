import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // ❗ ACTION REQUIRED: Change 'patient', 'doctor', etc., to match your backend's EXACT enum values 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor", // <--- UPDATE THIS DEFAULT VALUE
    phoneNUM: "",
    address: "",
    gender: "",
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
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v2/users/register",
        formData
      );
      console.log("Signup Successful:", res.data);

      // ✅ Save user session
      localStorage.setItem("user", JSON.stringify(res.data.data));
      alert("Registration successful!");
      navigate("/home");
      window.location.reload();

    } catch (err) {
      console.error("Signup Failed:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };
  // --- Pure CSS Styling Objects (Minimalist & High-Contrast) ---

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
    // 2. Card
    card: {
      maxWidth: '950px',
      width: '100%',
      backgroundColor: '#ffffff',
      padding: '50px 70px',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #EDEDF0',
    },
    // 3. Header
    header: {
      textAlign: 'center',
      marginBottom: '10px',
      color: '#212529',
      fontSize: '36px',
      fontWeight: '700',
    },
    subtitle: {
      textAlign: 'center',
      color: '#6C757D',
      fontSize: '16px',
      marginBottom: '40px'
    },
    // 4. Form Layout
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '25px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#343A40',
      fontSize: '14px',
    },
    // 5. Input Styles with Focus Animation
    inputBase: {
      width: '100%',
      padding: '12px 14px',
      // FIX: Using longhand border properties to avoid React styling conflict warning
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#CED4DA',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'all 0.3s ease-in-out',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: PRIMARY_COLOR,
      boxShadow: `0 0 0 3px rgba(0, 107, 255, 0.25)`,
    },
    // 6. Button Styles
    button: {
      padding: '14px 20px',
      backgroundColor: PRIMARY_COLOR,
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '17px',
      fontWeight: '600',
      transition: 'background-color 0.3s, transform 0.2s',
      marginTop: '40px',
      width: '100%',
      boxShadow: '0 4px 10px rgba(0, 107, 255, 0.3)',
      transform: isButtonHovered ? 'translateY(-1px)' : 'translateY(0)',
    },
    buttonHover: {
      backgroundColor: '#005AC2',
      boxShadow: '0 6px 12px rgba(0, 107, 255, 0.4)',
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
    }
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
        <h2 style={styles.header}>Sign Up for an Account</h2>
        <p style={styles.subtitle}>Enter your details below to create your profile.</p>

        {/* Error Message Display */}
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div style={styles.formGrid}>

            {/* Name */}
            <div>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <input
                type="text" id="name" name="name" placeholder="John Doe"
                onChange={handleChange}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                style={getCombinedInputStyle('name')}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input
                type="email" id="email" name="email" placeholder="email@example.com"
                onChange={handleChange}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                style={getCombinedInputStyle('email')}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password" id="password" name="password" placeholder="Minimum 8 characters"
                onChange={handleChange}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                style={getCombinedInputStyle('password')}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNUM" style={styles.label}>Phone Number</label>
              <input
                type="tel" id="phoneNUM" name="phoneNUM" placeholder="+91 9876543210"
                onChange={handleChange}
                onFocus={() => setFocusedInput('phoneNUM')}
                onBlur={() => setFocusedInput(null)}
                style={getCombinedInputStyle('phoneNUM')}
                required
              />
            </div>

            {/* Role Select - ❗ Update values here to match backend */}
            <div>
              <label htmlFor="role" style={styles.label}>Select Role</label>
              <select
                id="role" name="role" onChange={handleChange} value={formData.role}
                onFocus={() => setFocusedInput('role')}
                onBlur={() => setFocusedInput(null)}
                style={getCombinedInputStyle('role')}
                required
              >
                {/* Check backend schema and change these 'value' attributes! */}
                {/* <option value="patient">Patient</option>  */}
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Gender Select */}
            <div>
              <label htmlFor="gender" style={styles.label}>Gender</label>
              <select
                id="gender" name="gender" onChange={handleChange} value={formData.gender}
                onFocus={() => setFocusedInput('gender')}
                onBlur={() => setFocusedInput(null)}
                style={getCombinedInputStyle('gender')}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Address (Full width) */}
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="address" style={styles.label}>Full Address</label>
            <input
              type="text" id="address" name="address" placeholder="Street, City, State, Country"
              onChange={handleChange}
              onFocus={() => setFocusedInput('address')}
              onBlur={() => setFocusedInput(null)}
              style={getCombinedInputStyle('address')}
              required
            />
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            disabled={loading}
            style={getButtonStateStyle()}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;