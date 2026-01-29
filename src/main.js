document.addEventListener('DOMContentLoaded', () => {
  // Инициализация иконок Lucide
  lucide.createIcons();

  // Плавный скролл для навигации
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Изменение хедера при скролле
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
          header.style.padding = '12px 0';
          header.style.background = 'rgba(10, 10, 12, 0.95)';
      } else {
          header.style.padding = '20px 0';
          header.style.background = 'rgba(10, 10, 12, 0.8)';
      }
  });
  // Добавим легкое движение для Hero Visual на чистом JS
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        const shape = document.querySelector('.abstract-shape');
        const card = document.querySelector('.hero-card');

        if(shape) shape.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
        if(card) card.style.transform = `translate(${-moveX * 5}px, ${-moveY * 5}px) rotate(${-moveX}deg)`;
    });
}
});