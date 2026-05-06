// ===== CHANNEL APP JAVASCRIPT =====
// Human Decency Network — Interactive Prototype

// Modal Controls
function openBroadcastModal() {
    document.getElementById('broadcastModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBroadcastModal() {
    document.getElementById('broadcastModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('broadcastModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeBroadcastModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeBroadcastModal();
    }
});

// Submit Broadcast
function submitBroadcast(e) {
    e.preventDefault();

    // Show toast
    const toast = document.getElementById('responseToast');
    toast.querySelector('.toast-text').textContent = 'Breaker breaker — your request is live on Channel 14!';
    toast.classList.add('show');

    // Close modal
    closeBroadcastModal();

    // Reset form
    e.target.reset();

    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);

    // Simulate adding new request to feed
    setTimeout(() => {
        addNewRequestToFeed();
    }, 500);
}

// Respond to Request
function respondToRequest(btn) {
    if (btn.classList.contains('responded')) return;

    btn.classList.add('responded');
    btn.textContent = '10-4 — Response Sent!';

    // Update response count
    const card = btn.closest('.request-card');
    const countEl = card.querySelector('.response-count');
    const currentCount = parseInt(countEl.textContent);
    countEl.textContent = (currentCount + 1) + ' people responded';

    // Show toast
    const toast = document.getElementById('responseToast');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const requestCards = document.querySelectorAll('.request-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;

        requestCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else if (filter === 'emergency') {
                if (card.classList.contains('emergency')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            } else {
                if (card.dataset.type === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Track card hover effects
document.querySelectorAll('.track-card').forEach(card => {
    card.addEventListener('click', function() {
        const track = this.dataset.track;

        // Trigger filter
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${track}"]`);
        if (filterBtn) {
            filterBtn.click();

            // Scroll to feed
            document.querySelector('.feed-section').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Simulate adding a new request (for demo)
function addNewRequestToFeed() {
    const feedGrid = document.getElementById('feedGrid');

    const newCard = document.createElement('div');
    newCard.className = 'request-card';
    newCard.dataset.type = 'pay';
    newCard.style.animation = 'fadeIn 0.5s ease';

    newCard.innerHTML = `
        <div class="card-header">
            <div class="user-info">
                <div class="avatar" style="background: #ff6b6b;">E</div>
                <div class="user-meta">
                    <span class="username">Ella_Bella</span>
                    <span class="distance">0.2 miles away • Just now</span>
                </div>
            </div>
            <span class="track-badge pay">PAY</span>
        </div>
        <div class="card-body">
            <h4 class="request-title">Need soup and company — flu recovery day 3</h4>
            <p class="request-desc">Still recovering from that awful flu post. Could use some pho from the place down the street and maybe someone to sit with me while I eat? Will pay $30. Feeling lonely and weak but hopeful. 10-4.</p>
            <div class="request-tags">
                <span class="tag">Food</span>
                <span class="tag">Sick Day</span>
                <span class="tag">Presence</span>
                <span class="tag">Recovery</span>
            </div>
        </div>
        <div class="card-footer">
            <div class="responses">
                <span class="response-count">0 people responded</span>
            </div>
            <button class="respond-btn" onclick="respondToRequest(this)">I Got You — 10-4</button>
        </div>
    `;

    feedGrid.insertBefore(newCard, feedGrid.firstChild);
}

// Add fade-in animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Simulate live updates
setInterval(() => {
    const onlineStatus = document.querySelector('.status-text');
    if (onlineStatus) {
        const baseCount = 47;
        const variation = Math.floor(Math.random() * 10) - 5;
        onlineStatus.textContent = `${baseCount + variation} humans listening on your frequency`;
    }
}, 10000);

// Console greeting
console.log('%c Channel ', 'background: #ff8906; color: #0f0e17; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 8px;');
console.log('%c Human Decency Network — Prototype v1.0 ', 'color: #ff8906; font-size: 14px;');
console.log('%c Breaker breaker, anybody on? ', 'color: #a7a9be; font-style: italic;');
