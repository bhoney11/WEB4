function renderUI() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); 
    if (!token) {
        document.getElementById('auth-section').classList.remove('hidden');
        document.getElementById('admin-panel').classList.add('hidden');
        document.getElementById('catalog').classList.add('hidden');
    } else if (role === 'admin') {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        loadAdminToys(); 
    } else {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('admin-panel').classList.add('hidden');
        document.getElementById('catalog').classList.remove('hidden');
        loadCustomerToys(); 
}
