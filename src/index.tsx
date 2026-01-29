/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Chat from './Chat'

const cities = [
  {
    name: 'Paris',
    country: 'France',
    description: 'The City of Light captivates visitors with its iconic Eiffel Tower, world-class museums, and charming cafés.',
    population: '2.1 million',
    highlight: 'Eiffel Tower'
  },
  {
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City offers ancient ruins, Renaissance art, and the best pasta you\'ll ever taste.',
    population: '2.8 million',
    highlight: 'Colosseum'
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    description: 'Gaudí\'s masterpieces, Mediterranean beaches, and vibrant nightlife make this city unforgettable.',
    population: '1.6 million',
    highlight: 'Sagrada Família'
  },
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    description: 'Picturesque canals, world-famous museums, and a cycling culture that inspires the world.',
    population: '872,000',
    highlight: 'Canal Ring'
  },
  {
    name: 'Prague',
    country: 'Czech Republic',
    description: 'Gothic spires, cobblestone streets, and a fairy-tale old town frozen in time.',
    population: '1.3 million',
    highlight: 'Charles Bridge'
  },
  {
    name: 'Vienna',
    country: 'Austria',
    description: 'Imperial palaces, classical music heritage, and the birthplace of coffeehouse culture.',
    population: '1.9 million',
    highlight: 'Schönbrunn Palace'
  }
]

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🏛️</span>
            <span className="logo-text">EuroDiscover</span>
          </div>
          <nav className="nav">
            <a href="#destinations">Destinations</a>
            <a href="#assistant">Travel Assistant</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Europe's Most Beautiful Cities</h1>
          <p>From ancient Rome to romantic Paris, explore the rich history, stunning architecture, and vibrant cultures that make European cities truly magical.</p>
        </div>
      </section>

      {/* Featured Cities */}
      <section id="destinations" className="cities-section">
        <h2>Featured Destinations</h2>
        <div className="cities-grid">
          {cities.map((city) => (
            <div key={city.name} className="city-card">
              <div className="city-header">
                <h3>{city.name}</h3>
                <span className="country-tag">{city.country}</span>
              </div>
              <p className="city-description">{city.description}</p>
              <div className="city-stats">
                <div className="stat">
                  <span className="stat-label">Population</span>
                  <span className="stat-value">{city.population}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Must See</span>
                  <span className="stat-value">{city.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Assistant Section */}
      <section id="assistant" className="chat-section">
        <div className="chat-intro">
          <h2>Your Personal Travel Assistant</h2>
          <p>Have questions about European destinations? Our AI-powered travel assistant is here to help you plan your perfect trip. Ask about attractions, local cuisine, transportation, or get personalized recommendations!</p>
        </div>
        <div className="chat-container">
          <Chat />
        </div>
      </section>

      {/* Info Section */}
      <section id="about" className="info-section">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🗺️</div>
            <h3>Curated Guides</h3>
            <p>Expert-crafted itineraries for every type of traveler, from art lovers to foodies.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Our travel assistant is always available to answer your questions and provide recommendations.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🎫</div>
            <h3>Skip the Lines</h3>
            <p>Get insider tips on the best times to visit popular attractions and avoid crowds.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🍽️</div>
            <h3>Local Favorites</h3>
            <p>Discover hidden gems and authentic local experiences beyond the tourist trails.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">🏛️</span>
            <span className="logo-text">EuroDiscover</span>
            <p>Your gateway to European adventures</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Explore</h4>
              <a href="#destinations">Destinations</a>
              <a href="#assistant">Travel Assistant</a>
              <a href="#about">About Us</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Travel Tips</a>
              <a href="#">Packing Guides</a>
              <a href="#">Safety Info</a>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <a href="#">Newsletter</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 EuroDiscover. All rights reserved. This is a demo website.</p>
        </div>
      </footer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
