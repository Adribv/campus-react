import React, { useEffect } from 'react';

const EventsSection = () => {
  useEffect(() => {
    // Clear existing indicators before adding new ones
    const indicators = document.querySelector('.carousel-indicators');
    indicators.innerHTML = '';

    // Carousel initialization logic
    const images = [
      { src: 'assets/events/5.jpg', title: 'Karthigai Deepam' },
      { src: 'assets/events/1.jpg', title: 'Onam Fest' },
      { src: 'assets/events/2.jpg', title: 'Aadukalam 24' },
      { src: 'assets/events/3.jpg', title: 'Therla' },
      { src: 'assets/events/6.jpg', title: 'Karthigai Deepam' },
      { src: 'assets/events/7.jpeg', title: 'Onam 24' },
      { src: 'assets/events/8.jpg', title: 'Pongal Celebration' },
      { src: 'assets/events/9.jpg', title: 'Onam 23' },
      { src: 'assets/events/10.jpg', title: 'Diwali 2024' },
      { src: 'assets/events/11.jpg', title: 'OpenMic Event' },
      { src: 'assets/events/4.jpg', title: 'Karthigai Deepam' },
      { src: 'assets/events/12.jpg', title: 'Texus DJ Night' },
      { src: 'assets/events/13.jpg', title: 'Diwali 2023' },
      { src: 'assets/events/14.jpg', title: 'Teachers Day' },
      { src: 'assets/events/15.jpg', title: 'Navaratri Celebration' },
      { src: 'assets/events/16.jpg', title: 'Aadukalam 24' }
    ];
    
    const carousel = document.querySelector('.carousel-inner');
    carousel.innerHTML = '';
    
    let currentSlide = 0;
    
    images.forEach((item, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
      
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title;
      
      const overlay = document.createElement('div');
      overlay.className = 'carousel-title-overlay';
      overlay.innerText = item.title;
      
      carouselItem.appendChild(img);
      carouselItem.appendChild(overlay);
      carousel.appendChild(carouselItem);
      
      const indicator = document.createElement('div');
      indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
      indicator.addEventListener('click', () => goToSlide(index));
      indicators.appendChild(indicator);
    });

    const updateSlides = () => {
      document.querySelectorAll('.carousel-item').forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide);
      });
      document.querySelectorAll('.indicator').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    };

    const goToSlide = (n) => {
      currentSlide = n;
      updateSlides();
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % images.length;
      updateSlides();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
      updateSlides();
    };

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    setInterval(nextSlide, 3000);
  }, []);

  return (
    <section id="events">
      <h2>Our Events</h2>
      <div className="carousel">
        <div className="carousel-inner"></div>
        <button className="carousel-control prev">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-control next">
          <i className="fas fa-chevron-right"></i>
        </button>
        <div className="carousel-indicators"></div>
      </div>
    </section>
  );
};

export default EventsSection;