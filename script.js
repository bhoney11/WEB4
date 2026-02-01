async function checkAuth() {
    const role = localStorage.getItem('role');
    const navUser = document.getElementById('nav-user');
    const adminSection = document.getElementById('admin-section');

    if (role) {
        navUser.innerHTML = `<button class="btn-black" onclick="logout()">Logout (${role})</button>`;
        if (role === 'admin') adminSection.classList.remove('hidden');
    }
    loadToys();
}

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        window.location.href = 'index.html';
    } else {
        alert(data.message);
    }
}
function toggleAuth() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}
function logout() {
    localStorage.clear();
    window.location.reload();
}
async function register() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Success! Now please login.');
            toggleAuth();
        } else {
            alert(data.message || 'Error during registration');
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        alert("Server error. Check terminal!");
    }
}

async function loadToys() {
    const res = await fetch('/api/toys');
    const toys = await res.json();
    const display = document.getElementById('toy-display');
    
    display.innerHTML = toys.map(toy => `
        <div class="toy-card">
            <img src="${toy.image || 'https://via.placeholder.com/200'}" alt="${toy.name}">
            <h4>${toy.name}</h4>
            <p style="color: var(--main-pink); font-weight: bold;">$${toy.price}</p>
            ${localStorage.getItem('role') === 'admin' ? 
                `<button onclick="deleteToy('${toy._id}')" style="color:red; border:none; background:none; cursor:pointer">Delete</button>` 
                : ''}
        </div>
    `).join('');
}
async function createToy() {
    const name = document.getElementById('t-name').value;
    const price = document.getElementById('t-price').value;
    const image = document.getElementById('t-img').value;
    const token = localStorage.getItem('token'); 

    const res = await fetch('/api/toys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` n
        },
        body: JSON.stringify({ name, price, image })
    });

    if (res.ok) {
        alert('Toy added!');
        location.reload();
    } else {
        const data = await res.json();
        alert(data.message || 'Error adding toy');
    }
}
async function deleteToy(id) {
    if (!confirm('Are you sure?')) return;
    const token = localStorage.getItem('token');

    const res = await fetch(`/api/toys/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        location.reload();
    } else {
        alert('Only admins can delete!');
    }
}
if (document.getElementById('toy-display')) checkAuth();
