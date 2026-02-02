/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Chat from './Chat'

const pizzas = [
  {
    name: 'Margherita',
    origin: 'Naples, Italy',
    description: 'The queen of pizzas - simple perfection with San Marzano tomatoes, fresh mozzarella, basil, and olive oil.',
    calories: '250 per slice',
    highlight: 'Fresh Basil'
  },
  {
    name: 'Pepperoni',
    origin: 'United States',
    description: 'America\'s favorite with spicy cured pepperoni that curls into crispy cups of deliciousness.',
    calories: '310 per slice',
    highlight: 'Crispy Pepperoni'
  },
  {
    name: 'Quattro Formaggi',
    origin: 'Italy',
    description: 'A cheese lover\'s dream featuring mozzarella, gorgonzola, fontina, and parmesan in perfect harmony.',
    calories: '290 per slice',
    highlight: 'Four Cheeses'
  },
  {
    name: 'Diavola',
    origin: 'Italy',
    description: 'For those who like it hot - spicy salami, chili flakes, and a kick that keeps you coming back.',
    calories: '300 per slice',
    highlight: 'Spicy Salami'
  }
]

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🍕</span>
            <span className="logo-text">PizzaParadise</span>
          </div>
          <nav className="nav">
            <a href="#menu">Our Pizzas</a>
            <a href="#assistant">Pizza Expert</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the World's Most Delicious Pizzas</h1>
          <p>From classic Margherita to bold Diavola, explore the rich traditions, authentic recipes, and mouthwatering flavours that make pizza the world's favorite food.</p>
        </div>
      </section>

      {/* Featured Pizzas */}
      <section id="menu" className="cities-section">
        <h2>Featured Pizzas</h2>
        <div className="cities-grid">
          {pizzas.map((pizza) => (
            <div key={pizza.name} className="city-card">
              <div className="city-header">
                <h3>{pizza.name}</h3>
                <span className="country-tag">{pizza.origin}</span>
              </div>
              <p className="city-description">{pizza.description}</p>
              <div className="city-stats">
                <div className="stat">
                  <span className="stat-label">Calories</span>
                  <span className="stat-value">{pizza.calories}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Star Ingredient</span>
                  <span className="stat-value">{pizza.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Assistant Section */}
      <section id="assistant" className="chat-section">
        <div className="chat-intro">
          <h2>Your Personal Pizza Expert</h2>
          <p>Have questions about pizza? Our AI-powered pizza expert is here to help you discover new flavours, learn about toppings, find the perfect pairing, or get personalized recommendations!</p>
        </div>
        <div className="chat-container">
          <Chat />
        </div>
      </section>

      {/* Info Section */}
      <section id="about" className="info-section">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">📖</div>
            <h3>Authentic Recipes</h3>
            <p>Traditional recipes passed down through generations of Italian pizzaiolos.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">💬</div>
            <h3>24/7 Pizza Expert</h3>
            <p>Our pizza assistant is always available to answer your questions and suggest perfect combinations.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🧀</div>
            <h3>Premium Ingredients</h3>
            <p>Learn about the finest cheeses, freshest tomatoes, and artisan toppings.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🔥</div>
            <h3>Perfect Pairings</h3>
            <p>Discover the best wine, beer, and side dish pairings for every pizza style.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">🍕</span>
            <span className="logo-text">PizzaParadise</span>
            <p>Your gateway to pizza perfection</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Explore</h4>
              <a href="#menu">Our Pizzas</a>
              <a href="#assistant">Pizza Expert</a>
              <a href="#about">About Us</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Pizza Recipes</a>
              <a href="#">Dough Guide</a>
              <a href="#">Topping Ideas</a>
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
          <p>© 2025 PizzaParadise. All rights reserved. This is a demo website.</p>
        </div>
      </footer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
