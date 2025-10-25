import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProfileUI.css';

export default function ProfileUI() {
  const [activeTab, setActiveTab] = useState('About Me');
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400',
    'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400',
    'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400',
    'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400'
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabs = ['About Me', 'Experiences', 'Recommended'];

  const tabContent = {
    'About Me': (
      <div className="tab-text">
        <p>
          Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.
        </p>
        <p>
          I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters - Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a...
        </p>
      </div>
    ),
    'Experiences': (
      <div className="tab-text">
        <p>
          I have over 10 years of experience in sales and customer relationship management. My expertise includes enterprise solutions, cloud computing, and digital transformation strategies.
        </p>
        <p>
          Throughout my career, I've helped numerous organizations streamline their operations and achieve significant growth through innovative technology solutions.
        </p>
      </div>
    ),
    'Recommended': (
      <div className="tab-text">
        <p>
          I highly recommend exploring our latest cloud solutions and AI-powered analytics tools. These have been game-changers for many of our clients.
        </p>
        <p>
          Feel free to reach out if you'd like to discuss how these solutions can benefit your organization.
        </p>
      </div>
    )
  };

  const addImage = () => {
    const randomId = Math.floor(Math.random() * 1000000);
    const newImage = `https://images.unsplash.com/photo-${1618005182384 + randomId}?w=400`;
    setImages([...images, newImage]);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, images.length - 3) : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= images.length - 3 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="profile-container">
      <div className="profile-grid">
        <div className="left-side"></div>
        <div className="right-side">
          {/* About Me Widget */}
          <div className="widget">
            <div className="widget-items" >
              <HelpCircle size={24} color="#4B5563" />
              <div className="tab-container" style={{ flex: 1, margin: 0 }}>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`tab ${activeTab === tab ? 'tab-active' : 'tab-inactive'}`}
                  >
                    <span>{tab}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="tab-content" key={activeTab}>
              {tabContent[activeTab]}
            </div>
          </div>

          {/* Gallery Widget */}
          <div className="widget">
            <div className="widget-items">
              <HelpCircle size={24} color="#4B5563" />
              <div className="gallery-header" style={{ flex: 1, margin: 0 }}>
                <h2 className="gallery-title">Gallery</h2>
                <div className="controls">
                  <button onClick={addImage} className="add-button">
                    + ADD IMAGE
                  </button>
                  <div className="nav-buttons">
                    <button onClick={handlePrevious} className="nav-button">
                      <ArrowLeft size={20} color="#9CA3AF" />
                    </button>
                    <button onClick={handleNext} className="nav-button">
                      <ArrowRight size={20} color="#9CA3AF" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`image-grid ${isTransitioning ? 'transitioning' : ''}`}>
              {images.slice(currentIndex, currentIndex + 3).map((img, idx) => (
                <motion.div
                  key={currentIndex + idx}
                  className="image-wrapper"
                  whileHover={{
                    // rotateY: 8,
                    rotate: -3,
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <motion.img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="gallery-image"
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
}