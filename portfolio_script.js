
  // Photo upload
  function loadPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const placeholder = document.getElementById('photoPlaceholder');
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'hero-photo';
      img.alt = 'Profile Photo';
      img.title = 'Click to change photo';
      img.style.cursor = 'pointer';
      img.onclick = function() {
        const inp = document.createElement('input');
        inp.type = 'file';
        inp.accept = 'image/*';
        inp.onchange = loadPhoto;
        inp.click();
      };
      placeholder.replaceWith(img);
    };
    reader.readAsDataURL(file);
  }

  // Print Resume — shows all resume tab contents before printing, then restores
  function printResume() {
    document.querySelectorAll('#resume .tab-content').forEach(el => el.style.display = 'block');
    window.print();
    setTimeout(() => {
      document.querySelectorAll('#resume .tab-content').forEach(el => el.style.display = '');
      document.querySelectorAll('#resume .tab-content.active').forEach(el => el.style.display = 'block');
    }, 1000);
  }

  // Tab switching — receives the clicked button via `this` to reliably set active state
  function switchTab(section, tab, btn) {
    const sectionEl = document.getElementById(section);
    sectionEl.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    sectionEl.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(section + '-' + tab).classList.add('active');
    btn.classList.add('active');
  }

  // Form submit
  function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#4caf82';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  }

  // Scroll reveal — uses IntersectionObserver safely with a check for browser support
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp 0.6s ease both';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .project-card, .award-card, .skill-cat, .timeline-item, .info-item').forEach(el => {
      el.style.opacity = '1';
      observer.observe(el);
    });
  }

  // Active nav highlight on scroll — completes the previously truncated addEventListener call
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    });
  });
