import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Construction, HardHat, Phone, Mail, MapPin, 
  ArrowRight, ShieldCheck, Timer, Leaf, Globe, ArrowUp
} from 'lucide-react';
import './App.css';
import heroImg from './assets/hero_landscape.jpeg';
import logoImg from './assets/logo.png'; // Add the logo import
import project1Img from './assets/project1.jpeg';
import { translations } from './translations';

type Language = 'en' | 'ta' | 'hi' | 'ml';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [buildStep, setBuildStep] = useState(0);

  const T = translations[lang];
  
  const loadingPhrases = [
    "Building Strong Foundations...",
    "Constructing Quality Step by Step...",
    "Layer by Layer, Strength is Built..."
  ];

  useEffect(() => {


    // Build steps
    const buildInterval = setInterval(() => {
      setBuildStep(prev => prev < 4 ? prev + 1 : 1);
    }, 1200);

    // Cycle phrases
    const phraseInterval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % loadingPhrases.length);
    }, 3000);

    // Final load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => {
      clearInterval(buildInterval);
      clearInterval(phraseInterval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="building-loader-wrapper">
          <div className="construction-site">
            {/* Crane */}
            <div className="crane">
              <div className="crane-arm"></div>
              <div className="crane-line"></div>
              <div className="crane-weight"></div>
            </div>
            
            {/* Building Levels */}
            <div className="building-structure">
              {[1, 2, 3, 4].map((level) => (
                <div 
                  key={level} 
                  className={`building-level ${buildStep >= level ? 'built' : ''}`}
                >
                  <div className="windows"></div>
                </div>
              ))}
            </div>
            
            <div className="ground-foundation"></div>
          </div>
          
          <div className="stack-loading-text">
            <motion.div 
              className="stack-phrase"
              key={phraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {loadingPhrases[phraseIndex]}
            </motion.div>
            <div className="stack-sub">
              Delivering Quality Concrete
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
        <a href="#home" onClick={() => setMobileMenuOpen(false)}>{T.nav.home}</a>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>{T.nav.about}</a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>{T.nav.services}</a>
        <a href="#projects" onClick={() => setMobileMenuOpen(false)}>{T.nav.projects}</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{T.nav.quote}</a>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <div style={{ background: 'var(--white)', padding: '5px 10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <img src={logoImg} alt="Thangamayil Logo" style={{ height: '40px', objectFit: 'contain', display: 'block' }} />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 800 }} className="desktop-only">{T.about.title}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="nav-links">
            <a href="#home">{T.nav.home}</a>
            <a href="#about">{T.nav.about}</a>
            <a href="#services">{T.nav.services}</a>
            <a href="#projects">{T.nav.projects}</a>
            <a href="#contact">{T.nav.quote}</a>
          </div>
          
          <div className="lang-switcher">
            <Globe size={18} />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#000000',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              <option value="en">EN</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिंदी</option>
              <option value="ml">മലയാളം</option>
            </select>
          </div>
          
          {/* Hamburger button — mobile only */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div 
          className="hero-bg" 
          style={{ 
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {T.hero.badge && (
            <h4 style={{ 
              color: 'var(--white)', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              marginBottom: '15px',
              textShadow: '0 2px 5px rgba(0,0,0,0.5)',
              fontWeight: 700,
              fontSize: '1.8rem'
            }}>
              {T.hero.badge}
            </h4>
          )}
          <h1>{T.hero.title}</h1>
          <p>{T.hero.description}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-secondary">{T.hero.contactUs}</a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <motion.div 
          className="about-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="about-img-wrapper" variants={fadeInUp}>
            <img 
              src={logoImg} 
              alt="Thangamayil Logo" 
              className="about-img"
              style={{ objectFit: 'contain', maxHeight: '400px', background: 'var(--white)', padding: '40px' }}
            />
          </motion.div>
          <motion.div className="about-text" variants={fadeInUp}>
            <h4 style={{ color: 'var(--leaf-green-dark)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>{T.about.badge}</h4>
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.5rem' }}>{T.about.title}</h2>
            <p style={{ color: 'var(--text-light)' }}>{T.about.description}</p>
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon"><ShieldCheck /></div>
                <div>
                  <h4>{T.about.durability}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{T.about.durabilityDesc}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Leaf /></div>
                <div>
                  <h4>{T.about.sustainability}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{T.about.sustainabilityDesc}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Timer /></div>
                <div>
                  <h4>{T.about.reliability}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{T.about.reliabilityDesc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="section" style={{ background: 'var(--concrete-light)' }}>
        <h4 style={{ textAlign: 'center', color: 'var(--leaf-green-dark)', textTransform: 'uppercase', letterSpacing: '2px' }}>{T.services.badge}</h4>
        <h2 className="section-title">{T.services.title}</h2>
        <p className="section-subtitle">{T.services.subtitle}</p>
        
        <motion.div 
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {T.services.items.map((service, index) => (
            <motion.div className="service-card glass-card" key={index} variants={fadeInUp}>
              <div className="service-icon">
                {index === 0 && <Construction />}
                {index === 1 && <Building2 />}
                {index === 2 && <HardHat />}
              </div>
              <h3>{service.title}</h3>
              <p style={{ marginTop: '15px', color: 'var(--text-light)' }}>{service.desc}</p>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '20px', fontWeight: 600, color: 'var(--leaf-green-dark)' }}>
                {T.services.learnMore} <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section concrete-texture">
        <motion.div 
          className="stats-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {T.stats.items.map((stat, idx) => (
            <motion.div variants={fadeInUp} key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {stat.number && <div className="stat-number">{stat.number}</div>}
              <div style={{ textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{stat.label}</div>
              <p style={{ marginTop: '10px', fontSize: '0.95rem', opacity: 0.9 }}>{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h4 style={{ textAlign: 'center', color: 'var(--leaf-green-dark)', textTransform: 'uppercase', letterSpacing: '2px' }}>{T.projects.badge}</h4>
        <h2 className="section-title">{T.projects.title}</h2>
        <p className="section-subtitle">{T.projects.subtitle}</p>
        
        <motion.div 
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {T.projects.items.map((project, index) => (
            <motion.div className="project-card" key={index} variants={fadeInUp}>
              <img src={index === 0 ? project1Img : 
                        index === 1 ? "https://images.unsplash.com/photo-1587582423116-ec07293f0395?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" :
                        index === 2 ? "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" :
                        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                   alt={project.title} className="project-img" />
              <div className="project-overlay">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{project.title}</h3>
                <p style={{ color: 'var(--leaf-green)' }}>{project.cat}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ background: 'var(--concrete-light)' }}>
        <div className="contact-grid">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 style={{ color: 'var(--leaf-green-dark)', textTransform: 'uppercase', letterSpacing: '2px' }}>{T.contact.badge}</h4>
            <h2 className="section-title" style={{ textAlign: 'left' }}>{T.contact.title}</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '40px' }}>{T.contact.description}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'var(--white)', padding: '15px', borderRadius: '50%', color: 'var(--leaf-green-dark)', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                  <MapPin />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>{T.contact.location}</h4>
                  <p style={{ margin: 0, color: 'var(--text-light)' }}>{T.contact.locationValue}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'var(--white)', padding: '15px', borderRadius: '50%', color: 'var(--leaf-green-dark)', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                  <Phone />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>{T.contact.phone}</h4>
                  <p style={{ margin: 0, color: 'var(--text-light)' }}>+91 63846 38477</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'var(--white)', padding: '15px', borderRadius: '50%', color: 'var(--leaf-green-dark)', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                  <Mail />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>{T.contact.email}</h4>
                  <p style={{ margin: 0, color: 'var(--text-light)' }}>info@thangamayilrmc.in</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-card" 
            style={{ padding: '40px' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form" action="https://formsubmit.co/info@thangamayilrmc.in" method="POST">
              {/* Formsubmit Configuration */}
              <input type="hidden" name="_subject" value="New Quote Request - Thangamayil RMC" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="form-group">
                <input type="text" name="name" placeholder={T.contact.form.name} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder={T.contact.form.email} required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" placeholder={T.contact.form.tel} />
              </div>
              <div className="form-group">
                <textarea name="details" rows={5} placeholder={T.contact.form.details} required></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>{T.contact.form.submit}</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      {scrolled && (
        <motion.button 
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}

      {/* Footer */}
      <footer style={{ background: 'var(--leaf-green)', color: 'var(--white)', padding: '40px 5%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '20px', color: 'var(--white)' }}>
          <div style={{ background: 'var(--white)', padding: '8px 12px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <img src={logoImg} alt="Thangamayil Logo" style={{ height: '50px', objectFit: 'contain' }} />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{T.about.title}</h3>
        </div>
        <p>&copy; 2026 {T.about.title}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
