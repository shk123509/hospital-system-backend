import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// NOTE: This component assumes the user data (like the API response 'data' field) 
// is passed to it as a prop OR is fetched/loaded from localStorage after login/register.

const DoctorProfile = ({ userData }) => {
    const navigate = useNavigate();
    
    // Use the data passed via prop or retrieved from local storage (if loading on page refresh)
    const doctorData = userData || JSON.parse(localStorage.getItem('user')) || {};

    // --- Styling Objects (Consistent Theme) ---
    const PRIMARY_COLOR = '#007AA3'; // Trust Blue (Used for headers/accents)
    const BG_COLOR = '#F5FAFF'; // Light Background
    const ACCENT_COLOR = '#4CAF50'; // Green for status/success

    const styles = {
        container: {
            minHeight: '100vh',
            padding: '60px 20px',
            backgroundColor: BG_COLOR,
            fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
        },
        card: {
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            border: '1px solid #E0E0E0',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #EEE',
            paddingBottom: '20px',
            marginBottom: '30px',
        },
        headerTitle: {
            fontSize: '32px',
            fontWeight: '700',
            color: PRIMARY_COLOR,
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
        },
        infoBox: {
            padding: '15px',
            backgroundColor: '#F0F8FF', // Very light blue accent
            borderRadius: '8px',
            borderLeft: `5px solid ${PRIMARY_COLOR}`,
        },
        infoLabel: {
            fontSize: '14px',
            color: '#6C757D',
            marginBottom: '4px',
        },
        infoValue: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#343A40',
            wordBreak: 'break-word',
        },
        // Action Section styles (simplified for this example)
        actionSection: {
            marginTop: '40px',
            borderTop: '1px dashed #CCC',
            paddingTop: '30px',
        },
        actionButton: {
            padding: '12px 20px',
            backgroundColor: ACCENT_COLOR,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)',
        },
        actionButtonHover: {
            backgroundColor: '#388E3C',
            transform: 'translateY(-1px)',
        },
    };

    // Helper to format date
    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        return new Date(isoString).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    const ActionButton = ({ label, route }) => {
        const [isHovered, setIsHovered] = useState(false);
        const buttonStyle = {
            ...styles.actionButton,
            ...(isHovered ? styles.actionButtonHover : {}),
        };
        return (
            <button
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate(route)}
            >
                {label}
            </button>
        );
    };

    if (!doctorData || !doctorData.name) {
        return (
            <div style={styles.container}>
                <p style={{ textAlign: 'center' }}>Loading user data or not logged in...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>👨‍⚕️ Doctor Profile: {doctorData.name}</h2>
                    <span style={{ color: PRIMARY_COLOR, fontWeight: '600' }}>Role: {doctorData.role.toUpperCase()}</span>
                </div>

                {/* Profile Information Grid */}
                <div style={styles.infoGrid}>
                    <div style={styles.infoBox}>
                        <div style={styles.infoLabel}>Full Name</div>
                        <div style={styles.infoValue}>{doctorData.name}</div>
                    </div>
                    <div style={styles.infoBox}>
                        <div style={styles.infoLabel}>Email</div>
                        <div style={styles.infoValue}>{doctorData.email}</div>
                    </div>
                    <div style={styles.infoBox}>
                        <div style={styles.infoLabel}>Phone Number</div>
                        <div style={styles.infoValue}>{doctorData.phoneNUM}</div>
                    </div>
                    <div style={styles.infoBox}>
                        <div style={styles.infoLabel}>Gender</div>
                        <div style={styles.infoValue}>{doctorData.gender || 'N/A'}</div>
                    </div>
                    <div style={styles.infoBox} style={{ gridColumn: 'span 2' }}> {/* Span two columns for address */}
                        <div style={styles.infoLabel}>Address</div>
                        <div style={styles.infoValue}>{doctorData.address || 'Not Provided'}</div>
                    </div>
                    <div style={styles.infoBox}>
                        <div style={styles.infoLabel}>Account Created On</div>
                        <div style={styles.infoValue}>{formatDate(doctorData.createdAt)}</div>
                    </div>
                </div>

                {/* Placeholder for Doctor-specific Actions/Metrics */}
                <div style={styles.actionSection}>
                    <h3 style={{ ...styles.actionTitle, fontSize: '20px', color: '#343A40' }}>Access Doctor Dashboard</h3>
                    <ActionButton label="Go to Dashboard" route="/doctor/dashboard" />
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;