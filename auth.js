// Biến toàn cục lưu vai trò người dùng hệ thống
window.currentUserRole = null;

// --- ĐĂNG NHẬP / ĐĂNG XUẤT ---
function handleLogin() {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    
    if ((u === 'admin' || u === 'staff') && p === '123') {
        document.getElementById('errorMsg').style.display = 'none';
        document.getElementById('displayUser').innerText = u === 'admin' ? 'Quản lý (Admin)' : 'Thu ngân (Staff)';
        
        const adminButton = document.getElementById('sb-admin');
        if (u === 'staff') {
            adminButton.style.display = 'none'; 
        } else {
            adminButton.style.display = 'flex'; 
        }
        
        window.currentUserRole = u; 

        document.getElementById('login-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-app').style.display = 'block';
            switchTab('pos'); 
            renderMenu('all');
        }, 400);
    } else { 
        document.getElementById('errorMsg').style.display = 'block'; 
    }
}

function handleLogout() {
    window.currentUserRole = null;
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('login-screen').style.opacity = '1';
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
}

// --- CHUYỂN ĐỔI TAB GIAO DIỆN & PHÂN QUYỀN / KHỞI TẠO BIỂU ĐỒ ---
function switchTab(tabName) {
    // Chốt bảo mật chặn Staff truy cập trái phép vào Tab Admin
    if (tabName === 'admin' && window.currentUserRole !== 'admin') {
        alert('Thưa anh, tài khoản Nhân viên không có quyền truy cập vào khu vực Admin quản trị ạ!');
        return;
    }

    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active-tab'));
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    
    document.getElementById('tab-' + tabName).classList.add('active-tab');
    document.getElementById('sb-' + tabName).classList.add('active');
    
    const titles = { pos: "Màn hình Gọi món (POS)", bep: "Khu vực Điều phối Pha chế (Bếp)", kho: "Quản lý Nguyên liệu & Tồn kho", admin: "Báo cáo Thống kê & Quản trị" };
    document.getElementById('page-title').innerText = titles[tabName];

    // Tự động kích hoạt tính năng khi đổi tab
    if (tabName === 'kho') {
        renderInventoryTable();
    }
    if (tabName === 'admin') {
        initRevenueChart();
    }
}