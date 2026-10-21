const quiz = document.getElementById('quiz');
const start = document.getElementById('startQuiz');
const feedback = document.getElementById('feedback');
const next = document.getElementById('nextQuestion');
const question = document.getElementById('question');
const answers = document.getElementById('answers');
const scoreEl = document.getElementById('score');

let q = 0;
let score = 0;
let locked = false;

// Questions Data
const qs = [
  {
    q: 'Who is Pongo’s partner?',
    a: ['Anita', 'Perdita', 'Cruella'],
    correct: 'Perdita'
  },
  {
    q: 'Which character is known for her dramatic black-and-white look?',
    a: ['Perdita', 'Cruella', 'Roger'],
    correct: 'Cruella'
  },
  {
    q: 'What kind of dogs are the spotted pack?',
    a: ['Beagles', 'Dalmatians', 'Terriers'],
    correct: 'Dalmatians'
  }
];

function loadQ() {
  locked = false;
  feedback.textContent = '';
  next.style.display = 'none';
  
  document.querySelector('.quiz .eyebrow').textContent = `QUESTION 0${q + 1} / 03`;
  question.textContent = qs[q].q;
  answers.innerHTML = '';
  
  qs[q].a.forEach(a => {
    const b = document.createElement('button');
    b.className = 'answer';
    b.textContent = a;
    b.onclick = () => choose(a, b);
    answers.appendChild(b);
  });
}

function choose(a, b) {
  if (locked) return;
  locked = true;
  
  if (a === qs[q].correct) {
    score += 10;
    feedback.textContent = 'CASE SOLVED. NICE SPOTTING! +10 POINTS';
    b.style.background = '#20734e';
    b.style.borderColor = '#20734e';
  } else {
    feedback.textContent = 'NOT QUITE — THE RIGHT ANSWER IS ' + qs[q].correct.toUpperCase() + '.';
    b.style.background = '#8b2730';
  }
  
  scoreEl.innerHTML = score + ' <span style="font:11px DM Mono,monospace;color:#aaa7a0">POINTS</span>';
  next.style.display = 'inline-flex';
  next.textContent = (q === 2) ? 'PLAY AGAIN ↻' : 'NEXT QUESTION →';
}

start.onclick = () => {
  quiz.classList.add('active');
  quiz.scrollIntoView({ behavior: 'smooth', block: 'center' });
  q = 0;
  score = 0;
  scoreEl.innerHTML = '0 <span style="font:11px DM Mono,monospace;color:#aaa7a0">POINTS</span>';
  loadQ();
};

next.onclick = () => {
  if (q < 2) {
    q++;
    loadQ();
  } else {
    q = 0;
    score = 0;
    scoreEl.innerHTML = '0 <span style="font:11px DM Mono,monospace;color:#aaa7a0">POINTS</span>';
    loadQ();
  }
};

// Intersection Observer for Animations
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));