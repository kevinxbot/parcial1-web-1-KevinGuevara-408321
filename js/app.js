// --- Publicar post desde la caja ---
const btnPost = document.getElementById('btn-post');
if (btnPost) {
btnPost.addEventListener('click', () => {
    const textEl = document.getElementById('post-text');
    const text = textEl.value.trim();
    if (!text) return alert('Escribe algo antes de publicar.');
    const postsList = document.getElementById('posts-list');

    // crear article post
    const art = document.createElement('article');
    art.className = 'post';
    art.innerHTML = `
    0 <div class="post-meta">
        <img src="assets/logo.png" alt="avatar" class="post-avatar">
        <div>
    <strong>Kevin Guevara</strong>
            <div class="post-date">ahora</div>
        </div>
        </div>
        <p class="post-body"></p>
        <div class="post-controls">
        <button class="like-btn">👍 <span class="like-count">0</span></button>
        <button class="share-btn">🔁 Compartir</button>
        <button class="comments-toggle">Ver comentarios</button>
        </div>
        <div class="comments hidden"></div>
    `;
    art.querySelector('.post-body').textContent = text;
    postsList.prepend(art);
    textEl.value = '';

    // attach behavior to new controls
    attachPostEvents(art);
    });
}

// Reutilizable: agrega eventos a botones dentro de un post
function attachPostEvents(postEl) {
const likeBtn = postEl.querySelector('.like-btn');
const shareBtn = postEl.querySelector('.share-btn');
const commentsToggle = postEl.querySelector('.comments-toggle');
const comments = postEl.querySelector('.comments');

if (likeBtn) {
    likeBtn.addEventListener('click', () => {
        const countEl = likeBtn.querySelector('.like-count');
        let c = parseInt(countEl.textContent || '0', 10);
      // toggle like style
        if (likeBtn.classList.toggle('liked')) {
        c += 1;
    } else {
        c = Math.max(0, c - 1);
    }
        countEl.textContent = c;
    });
    }

if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      // placeholder simple
        alert('Función compartir (simulada). Copia el enlace para compartir.');
    });
    }

    if (commentsToggle) {
    commentsToggle.addEventListener('click', () => {
        comments.classList.toggle('hidden');
        if (!comments.classList.contains('hidden')) {
        // si está visible, si no tiene comentarios, mostrar ejemplo
        if (!comments.querySelector('.comment')) {
    const p = document.createElement('p');
        p.className = 'comment';
            p.innerHTML = '<strong>Usuario</strong> — Excelente!';
            comments.appendChild(p);
        }
    }
    });
}
}

// aplica eventos a posts iniciales existentes
document.querySelectorAll('#posts-list .post').forEach(p => attachPostEvents(p));

// Publicar un post
document.getElementById('btn-post').addEventListener('click', function() {
    const text = document.getElementById('post-text').value.trim();
    if (!text) return;

    const postsList = document.getElementById('posts-list');
    const postHTML = `
    <article class="post">
        <div class="post-meta">
            <img src="assets/logo.png" alt="avatar" class="post-avatar">
            <div>
                <strong>Usuario</strong>
                <div class="post-date">${new Date().toLocaleDateString()}</div>
            </div>
        </div>
        <p class="post-body">${text}</p>
        <div class="post-controls">
            <button class="like-btn"><span class="like-count">0</span></button>
            <button class="share-btn">Compartir</button>
            <button class="comments-toggle">Ver comentarios</button>
        </div>
        <div class="comments hidden"></div>
    </article>
    `;
    postsList.insertAdjacentHTML('afterbegin', postHTML);
    document.getElementById('post-text').value = '';
});

// Likes y comentarios (delegación de eventos)
document.getElementById('posts-list').addEventListener('click', function(e) {
    // Like
    if (e.target.closest('.like-btn')) {
        const btn = e.target.closest('.like-btn');
        const countSpan = btn.querySelector('.like-count');
        let count = parseInt(countSpan.textContent, 10);
        countSpan.textContent = ++count;
    }
    // Compartir
    if (e.target.closest('.share-btn')) {
        alert('¡Post compartido!');
    }
    // Mostrar/ocultar comentarios
    if (e.target.closest('.comments-toggle')) {
        const post = e.target.closest('.post');
        const comments = post.querySelector('.comments');
        comments.classList.toggle('hidden');
        e.target.textContent = comments.classList.contains('hidden') ? 'Ver comentarios' : 'Ocultar comentarios';
    }
});

// Tabs navegación
document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('href').replace('#', '');
        document.querySelectorAll('.page-section').forEach(sec => {
            sec.classList.toggle('hidden', sec.id !== target);
        });
    });
});
