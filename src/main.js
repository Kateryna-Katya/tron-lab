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
// Функция для анимации при скролле
const revealOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, {
      threshold: 0.1
  });

  document.querySelectorAll('.section-reveal').forEach(el => {
      observer.observe(el);
  });
};

// Запускаем после загрузки
revealOnScroll();
// Функция анимации цифр
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  counters.forEach(counter => {
      const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 15);
          } else {
              counter.innerText = target;
          }
      };

      // Запускаем анимацию только один раз при появлении
      const observer = new IntersectionObserver((entries) => {
          if(entries[0].isIntersecting) {
              updateCount();
              observer.unobserve(counter);
          }
      });
      observer.observe(counter);
  });
};

// Вызываем функцию
animateCounters();
// Эффект следящего свечения
const innovationsSection = document.querySelector('.innovations');
const glow = document.querySelector('.cursor-glow');

if (innovationsSection && glow) {
    innovationsSection.addEventListener('mousemove', (e) => {
        const rect = innovationsSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
    });

    innovationsSection.addEventListener('mouseenter', () => glow.style.opacity = '1');
    innovationsSection.addEventListener('mouseleave', () => glow.style.opacity = '0');
}
// Генерация капчи
const captchaNum1 = Math.floor(Math.random() * 10) + 1;
const captchaNum2 = Math.floor(Math.random() * 10) + 1;
const captchaCorrect = captchaNum1 + captchaNum2;
const captchaLabel = document.getElementById('captcha-question');
if(captchaLabel) captchaLabel.textContent = `${captchaNum1} + ${captchaNum2}`;

// Валидация телефона (только цифры)
const phoneInput = document.getElementById('phone');
if(phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d+]/g, '');
    });
}

// Обработка формы
const mainForm = document.getElementById('mainForm');
if(mainForm) {
    mainForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userAnswer = document.getElementById('captcha-answer').value;
        const successMsg = document.getElementById('form-success');
        const errorMsg = document.getElementById('form-error');

        // Сброс сообщений
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';

        if (parseInt(userAnswer) !== captchaCorrect) {
            errorMsg.textContent = "Неверный ответ на капчу!";
            errorMsg.style.display = 'block';
            return;
        }

        // Имитация отправки
        const btn = mainForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = "Отправка...";
        btn.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 1500));

        btn.textContent = originalText;
        btn.disabled = false;
        successMsg.style.display = 'block';
        mainForm.reset();
    });
}
// --- МОБИЛЬНОЕ МЕНЮ ---
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-menu');

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// --- COOKIE POPUP ---
const cookiePopup = document.getElementById('cookiePopup');
const acceptBtn = document.getElementById('acceptCookies');

window.addEventListener('load', () => {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('show');
        }, 2000);
    }
});

if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.remove('show');
    });
}
});