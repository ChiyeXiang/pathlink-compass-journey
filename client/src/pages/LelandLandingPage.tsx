import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReviewMarquee } from '../components/ReviewMarquee';
import './LelandLandingPage.css';

const LelandLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleJoinPathlinkClick = () => {
    navigate('/welcome');
  };

  const handleMentorSquareClick = () => {
    navigate('/mentor-square');
  };

  const handleBecomeMentorClick = () => {
    navigate('/mentor-registration');
  };

  return (
    <div className="leland-landing-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <img 
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/20333cb4-3f98-418b-97b4-6084401c6291" 
              alt="Pathlink Logo" 
              className="logo"
            />
          </div>
          <nav className="nav-menu">
            <a href="#" className="nav-link" onClick={handleMentorSquareClick}>导师广场</a>
            <a href="#" className="nav-link" onClick={handleBecomeMentorClick}>成为导师</a>
            <div className="auth-buttons">
              <button className="btn-login" onClick={handleLoginClick}>登录</button>
              <button className="btn-get-started">开始匹配</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Reach your most ambitious goals.
          </h1>
          <p className="hero-subtitle">
            Access coaching, courses, and content powered by thousands of career and admissions experts.
          </p>
        </div>
        
        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <img 
                src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/40bb271f-c386-4287-94b8-467774d3d774" 
                alt="Search icon" 
                className="search-icon"
              />
              <input 
                type="text" 
                placeholder="Search for coaching in any category" 
                className="search-input"
              />
              <button className="search-button">
                <img 
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/59e068db-4441-4135-b3cf-e3ce80eb899a" 
                  alt="Search" 
                />
              </button>
            </div>
            
            <div className="popular-tags">
              <span className="popular-label">Popular:</span>
              <div className="tags-container">
                <span className="tag">MBA</span>
                <span className="tag">Career Development</span>
                <span className="tag">Management Consulting</span>
                <span className="tag">GRE</span>
                <span className="tag">Private Equity</span>
                <span className="tag">Medical School</span>
                <span className="tag">College</span>
                <span className="tag">Master's Programs</span>
                <span className="tag">Law School</span>
                <span className="tag">Investment Banking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-content">
          <p className="stats-text">JOIN 250,000+ Real people achieving their goals on Leland</p>
        </div>
      </section>

      {/* User Avatars */}
      <section className="avatars-section">
        <div className="avatars-container">
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3a87624c-8b59-4ee9-a65e-6c4ae7c95e49" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e7a48ce3-a3dc-4e4f-9922-cd1c4eddeaaf" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f9558300-c90a-4356-ba96-a0eecea78abb" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fce5e819-4508-42bb-b710-4de34766260a" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6f34c39b-028a-45e3-b198-c8e49fbf7b3f" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a5129e9c-a789-43bd-95cd-2c8b39a13f7e" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6a8c5ee8-9d93-41c3-ae5d-f910713dcd8f" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/85c45d7a-0a97-4153-8219-71a34e963b8d" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d2d72493-5d97-4411-9e65-7319935645bb" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d733a6d1-36b0-4d3c-bc74-df2971505c13" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/849ceaa0-3ddb-4cee-9169-fe4b42b94687" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c938ba12-ae7e-4377-8bd9-0043e0d13876" alt="User" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fc7bffaf-170c-413f-be42-fcbfde6c2341" alt="User" />
        </div>
      </section>

      {/* Featured In Section */}
      <section className="featured-section">
        <div className="featured-container">
          <span className="featured-label">Featured in</span>
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d0e43320-6f37-4c4e-ab3a-04f2446c676b" alt="Featured" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0e62fdc2-e927-4fbc-8d98-4dfb2b4df5ed" alt="Featured" />
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c3178053-744c-4302-a42e-db1c60fcc937" alt="Featured" />
        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories-section">
        <div className="categories-container">
          <h2 className="categories-title">Popular Categories</h2>
          <p className="categories-subtitle">
            Use Leland to <u>get into school</u>, <u>build your career</u>, or <u>take a test</u>.
          </p>
          
          <div className="categories-grid">
            <div className="category-card">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5dbcc84d-e89e-4362-ae53-93de2c9ac158" alt="MBA" />
              <h3>MBA</h3>
            </div>
            <div className="category-card">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c30b5253-d6a7-4edb-83db-1cd29db0b72d" alt="Management Consulting" />
              <h3>Management Consulting</h3>
            </div>
            <div className="category-card">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/48faa988-37b4-4cbf-8e4d-a03feac76869" alt="GRE" />
              <h3>GRE</h3>
            </div>
            <div className="category-card">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fad028d0-218e-4790-acb0-6e4874dbf286" alt="Medical School" />
              <h3>Medical School</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <div className="how-it-works-content">
            <h2 className="how-it-works-title">It's never been easier to get help from an expert.</h2>
            
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">
                  <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/daca883c-e30b-461a-a48c-55b459be3a73" alt="Budget" />
                </div>
                <div className="feature-content">
                  <h3>Stick to your budget</h3>
                  <p>Leland has coaches to fit virtually every budget.</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">
                  <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1aad8e89-f863-4626-8e2b-a7627bff9291" alt="Mentor" />
                </div>
                <div className="feature-content">
                  <h3>Find the perfect mentor</h3>
                  <p>With thousands of coaches across 50 categories, Leland has someone who can help you achieve your goal.</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">
                  <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/efa30c02-fcf4-4f4f-92c0-3de7933a2684" alt="Protection" />
                </div>
                <div className="feature-content">
                  <h3>Protect your purchase</h3>
                  <p>With <u>Leland's Experience Guarantee</u>, you can feel confident in your coaching purchase.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Image */}
          <div className="how-it-works-background">
            <img 
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6e7abf74-8f0d-4be0-badf-fd98838b45d5" 
              alt="How it works background" 
              className="background-image"
            />
          </div>
        </div>
      </section>

      {/* Coach Profiles */}
      <section className="coaches-section">
        <div className="coaches-container">
          <div className="coach-card">
            <div className="coach-header">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e185d7ba-3bdc-4abe-ab42-f6ce9ff65c77" alt="Lola A." />
              <h3>Lola A.</h3>
              <p>Product Management, Business Operations & Strategy, Management…</p>
            </div>
            <div className="coach-experience">
              <div className="experience-item">
                <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/248239b2-edab-4e49-8cee-084c99d9f725" alt="Stripe" />
                <div>
                  <h4>Stripe</h4>
                  <p>Strategy & Product</p>
                </div>
              </div>
              <div className="experience-item">
                <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ef0bf42c-fead-47e9-8ce6-60cf8f543a07" alt="McKinsey" />
                <div>
                  <h4>McKinsey & Company</h4>
                  <p>Business Analyst</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* More coach cards would go here */}
        </div>
      </section>

      {/* 导师广场 */}
      <section className="events-section">
        <div className="events-container">
          <div className="events-header">
            <h2>Browse upcoming 导师广场</h2>
            <button className="browse-all-btn">Browse all events</button>
          </div>
          
          <div className="events-grid">
            <div className="event-card">
              <div className="event-image">
                <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0176511e-983c-4671-aba8-5af8ad3166d1" alt="Event" />
                <span className="free-badge">导师广场</span>
              </div>
              <div className="event-content">
                <h3>Crafting the Perfect MBA Resume</h3>
                <div className="event-speaker">
                  <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/18791306-949b-43c7-848f-18b3797ab1ab" alt="Speaker" />
                  <span>Featuring Betsy M.</span>
                  <div className="rating">5.0</div>
                </div>
                <p className="event-time">Aug 5 @ 4:00 PM UTC</p>
                <div className="attendees">
                  <div className="attendee-avatars">
                    <div className="avatar">RL</div>
                    <div className="avatar">VO</div>
                    <div className="avatar">KC</div>
                  </div>
                  <span>368 people going</span>
                </div>
                <button className="register-btn">Register for free</button>
              </div>
            </div>
            
            {/* More event cards would go here */}
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="library-section">
        <div className="library-container">
          <div className="library-header">
            <div className="library-brand">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/84704783-e82b-46e4-a171-4f0fb2bd2f4d" alt="Leland" />
              <span className="free-trial-badge">Free trial!</span>
            </div>
            <div className="coaches-info">
              <span>From 298 top coaches</span>
              <div className="coach-avatars">
                <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/89ceadb9-64f1-4ad9-a87c-9eb6f86f7ad8" alt="Coach" />
                <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d9eef30c-4e5f-4e8a-a753-c779448ef3c7" alt="Coach" />
                <div className="more-coaches">+1</div>
              </div>
            </div>
          </div>
          
          <div className="library-content">
            <h2>Access a library of videos, templates, and examples curated by Leland's top coaches.</h2>
            <button className="get-started-btn">开始匹配 for free</button>
          </div>
          
          <div className="library-categories">
            <div className="library-category">
              <h3>Example Essays</h3>
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f3c2b249-b3e4-4c2c-a339-d7440b3d7493" alt="Essays" />
            </div>
            <div className="library-category">
              <h3>Example Resumes</h3>
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f6af8813-293a-4529-b013-e6b822f18696" alt="Resumes" />
            </div>
            <div className="library-category">
              <h3>Application Prep</h3>
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/00c50740-2690-4455-89ce-52a4f9fd9f0c" alt="Prep" />
            </div>
            <div className="library-category">
              <h3>Video Courses</h3>
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9437417f-7c01-43fa-a0dc-4d6a605b7c80" alt="Courses" />
            </div>
          </div>
        </div>
      </section>



      {/* Review Marquee Section */}
      <section className="review-marquee-section">
        <div className="review-marquee-container">
          <ReviewMarquee />
        </div>
      </section>

      {/* Organizations Section */}
      <section className="organizations-section">
        <div className="organizations-container">
          <h3>Get into organizations like</h3>
          <div className="organization-logos">
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7654e978-b740-4cdd-b235-996a3044693d" alt="Organization" />
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/de6eadfd-0f82-4c87-bb64-89fa350a81f8" alt="Organization" />
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5e3ba5ea-5f0f-48f6-b0b3-c274b0dc39e2" alt="Organization" />
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/56d9f78d-18cd-4de9-bdae-253839927014" alt="Organization" />
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/23004bca-3df9-4eb5-aa85-40174004334f" alt="Organization" />
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/aa3460a9-926e-49a7-b5fc-7015d306e1c7" alt="Organization" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>准备好寻找最适合你的导师了吗?</h2>
          <p>A dedicated mentor makes all the difference. Tell us your goals, budget, and background, and we'll connect you to the perfect coach.</p>
          <button className="join-leland-btn" onClick={handleJoinPathlinkClick}>加入Pathlink</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/20333cb4-3f98-418b-97b4-6084401c6291" alt="Leland" className="footer-logo" />
            {/* <div className="social-icons">
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/650c93ab-7df7-4ad8-88ee-19a1133ff23a" alt="Social" />
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/25fbfad1-c0ff-437b-8d41-9dce911f9a2a" alt="Social" />
              <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/53177119-6ce1-4931-b42f-044cde21e723" alt="Social" />
            </div> */}
            <p className="copyright">© Pathlink 2025.版权所有.</p>
          </div>
          
          <div className="footer-section">
            <h4>首页</h4>
            <ul>
              <li>开始匹配</li>
              <li>登录</li>
              <li>成为导师</li>
            </ul>
          </div>
          
          {/* <div className="footer-section">
            <h4>Library</h4>
            <ul>
              <li>Content Library</li>
              <li>MBA</li>
              <li>College</li>
              <li>Management Consulting</li>
              <li>Product Management</li>
            </ul>
          </div> */}
          
          {/* <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>Careers</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Support</li>
            </ul>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default LelandLandingPage; 