import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simple Feature Card component
const FeatureCard = ({ icon, title, description, styles }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        ...styles.featureCardBase,
        ...(isHovered ? styles.featureCardHover : {}),
    };

    return (
        <div 
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.featureIcon}>{icon}</div>
            <h3 style={styles.featureTitle}>{title}</h3>
            <p style={styles.featureDescription}>{description}</p>
        </div>
    );
};

const Home = () => {
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  // --- Dynamic Styling Objects (High-Contrast & Modern) ---

  const ACCENT_COLOR = '#FF7A00'; // Vibrant Orange/Accent
  const PRIMARY_BLUE = '#003A70'; // Deep Navy Blue (Trust)
  const BG_COLOR = '#121212'; // Dark Background for contrast
  const CARD_BG = '#1e1e1e'; // Slightly lighter dark card

  const styles = {
    // 1. Container
    container: {
      minHeight: '100vh',
      backgroundColor: BG_COLOR,
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
      color: 'white',
    },
    // 2. Hero Section
    heroSection: {
        padding: '120px 20px',
        backgroundColor: PRIMARY_BLUE,
        borderBottom: `4px solid ${ACCENT_COLOR}`,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
    },
    heroContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
    },
    // 3. Header
    heroTitle: {
      fontSize: '48px', 
      fontWeight: '900',
      color: 'white',
      marginBottom: '20px',
      lineHeight: '1.2',
      textShadow: `0 0 10px rgba(255, 122, 0, 0.2)`, // Subtle glow
    },
    heroSubtitle: {
      color: '#B0BEC5',
      fontSize: '20px',
      marginBottom: '40px',
      fontWeight: '300',
    },
    // 4. Button Styles (Sharper animation)
    buttonGroup: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
    },
    buttonBase: {
      padding: '18px 35px',
      border: 'none',
      borderRadius: '4px', // Sharper corners
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: '700',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Springy transition
      textDecoration: 'none',
      display: 'inline-block',
      letterSpacing: '0.5px',
    },
    primaryButton: {
        backgroundColor: ACCENT_COLOR,
        color: PRIMARY_BLUE,
        boxShadow: `0 6px 20px rgba(255, 122, 0, 0.5)`,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        color: ACCENT_COLOR,
        border: `2px solid ${ACCENT_COLOR}`,
    },
    // Primary Button Hover
    primaryButtonHover: {
      backgroundColor: '#E66F00',
      transform: 'translateY(-4px) scale(1.02)', // More aggressive lift
      boxShadow: `0 12px 30px rgba(255, 122, 0, 0.8)`,
    },
    // Secondary Button Hover
    secondaryButtonHover: {
        backgroundColor: `rgba(255, 122, 0, 0.1)`,
        transform: 'translateY(-2px) scale(1.01)',
        borderColor: '#E66F00',
    },
    // 5. Visual Placeholder (Abstract Data Flow)
    visualPlaceholder: {
        height: '400px',
        backgroundColor: CARD_BG, 
        borderRadius: '10px',
        border: `1px solid ${ACCENT_COLOR}`,
        boxShadow: `0 0 25px rgba(255, 122, 0, 0.3)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: ACCENT_COLOR,
        fontSize: '1.8rem',
        fontWeight: '500',
        opacity: 0,
        animation: 'visualFadeIn 1.2s ease-out forwards 0.5s', // Delayed, strong entry
    },
    
    // 6. Features Section
    featuresSection: {
        padding: '100px 20px',
        textAlign: 'center',
        backgroundColor: BG_COLOR,
    },
    sectionTitle: {
        fontSize: '32px',
        fontWeight: '800',
        color: ACCENT_COLOR,
        marginBottom: '10px',
    },
    sectionSubtitle: {
        color: '#999',
        fontSize: '18px',
        marginBottom: '60px',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
    },
    
    // 7. Feature Card Styles
    featureCardBase: {
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: CARD_BG,
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
        borderLeft: `3px solid ${PRIMARY_BLUE}`,
        transition: 'all 0.4s ease-in-out',
        height: '100%',
    },
    featureCardHover: {
        transform: 'scale(1.03)', // Grow on hover
        boxShadow: `0 0 25px rgba(255, 122, 0, 0.4)`,
        borderLeft: `3px solid ${ACCENT_COLOR}`,
    },
    featureIcon: {
        fontSize: '3rem',
        marginBottom: '10px',
        color: ACCENT_COLOR,
    },
    featureTitle: {
        fontSize: '1.3rem',
        fontWeight: '700',
        color: 'white',
        marginBottom: '8px',
    },
    featureDescription: {
        color: '#B0BEC5',
        fontSize: '0.95rem',
    },

    // Keyframes defined here
    '@keyframes visualFadeIn': {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    
    // Simple Media Query Helper (Needs to be applied manually to elements)
    mediaQuery: {
        '@media (max-width: 768px)': {
            heroContent: { gridTemplateColumns: '1fr' },
            heroTitle: { fontSize: '36px' },
            visualColumn: { display: 'none' },
        }
    }
  };

  // Helper function to apply button style with hover state
  const getButtonStateStyle = (isPrimary) => {
    let base = isPrimary ? styles.primaryButton : styles.secondaryButton;
    let hover = isPrimary ? styles.primaryButtonHover : styles.secondaryButtonHover;
    let combined = { ...styles.buttonBase, ...base };

    const isCurrentHovered = isPrimary ? isButtonHovered : isSecondaryHovered;

    if (isCurrentHovered) {
      combined = { ...combined, ...hover };
    }
    return combined;
  };

  return (
    <div style={styles.container}>
        
        {/* HERO SECTION */}
        <header style={{ ...styles.heroSection, '@media (max-width: 768px)': styles.heroSection }}>
            <div style={styles.heroContent}>
                
                {/* Left Column: Text & CTAs */}
                <div style={styles.textColumn}>
                    <h1 style={styles.heroTitle}>Intelligent System. Instant Healthcare Management.</h1>
                    
                    <p style={styles.heroSubtitle}>
                        Efficiently manage **User Roles**, **Admissions**, and **Billing** with our integrated backend structure. Speed and precision for your entire hospital staff.
                    </p>

                    {/* CTAs */}
                    <div style={styles.buttonGroup}>
                        <button 
                            style={getButtonStateStyle(true)}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                            onClick={() => navigate('/login')}
                        >
                            Staff Login
                        </button>
                        <button 
                            style={getButtonStateStyle(false)}
                            onMouseEnter={() => setIsSecondaryHovered(true)}
                            onMouseLeave={() => setIsSecondaryHovered(false)}
                            onClick={() => navigate('/signup')}
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Right Column: Visual Placeholder */}
                <div style={{...styles.visualColumn, '@media (max-width: 768px)': {display: 'none'}}}>
                    <div style={styles.visualPlaceholder}>
                        Real-Time Data Flow
                    </div>
                </div>
            </div>
        </header>

        {/* CORE FEATURES SECTION */}
        <section style={styles.featuresSection}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={styles.sectionTitle}>System Capabilities (Based on Your Backend)</h2>
                <p style={styles.sectionSubtitle}>Seamless integration across roles: Doctor, Receptionist, and Admin.</p>
                
                <div style={styles.featuresGrid}>
                    <FeatureCard 
                        icon="🧑‍⚕️" 
                        title="Doctor & Prescription Workflow"
                        description="Doctors manage Patient interactions, write Prescriptions, and oversee Admissions."
                        styles={styles}
                    />
                    <FeatureCard 
                        icon="📅" 
                        title="Appointment Management"
                        description="Receptionists book Appointments, track statuses, and link Patients to Doctors."
                        styles={styles}
                    />
                    <FeatureCard 
                        icon="🛌" 
                        title="Room & Admission Tracking"
                        description="Track Patient Admission status, assign Rooms, and manage discharge dates."
                        styles={styles}
                    />
                    <FeatureCard 
                        icon="💵" 
                        title="Automated Billing"
                        description="Billing records are generated directly from the Admission and Patient data."
                        styles={styles}
                    />
                </div>
            </div>
        </section>
        
    </div>
  );
};

export default Home;