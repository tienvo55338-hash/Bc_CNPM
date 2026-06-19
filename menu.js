// --- DATA MENU SẢN PHẨM ---
const menuProducts = [
    { id: 1, name: 'TS Trân Châu', price: 35000, category: 'trasua', img: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=200' },
    { id: 2, name: 'TS Matcha', price: 38000, category: 'trasua', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=200' },
    { id: 3, name: 'Trà Đào Cam Sả', price: 40000, category: 'tra-traicay', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200' },
    { id: 4, name: 'Sữa Tươi Đốm Đen', price: 45000, category: 'suatuoi', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200' },
    { id: 5, name: 'TS Khoai Môn', price: 38000, category: 'trasua', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200' },
    { id: 6, name: 'Trà Thạch Vải', price: 42000, category: 'tra-traicay', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200' },
    { id: 7, name: 'Trà Lài Đác Thơm', price: 40000, category: 'tra-traicay', img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200' },
    { id: 8, name: 'Trân Châu Đen', price: 8000, category: 'topping', img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=200' },
    { id: 9, name: 'Thạch Trái Cây', price: 8000, category: 'topping', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200' }
];

// --- HÀM RENDER MENU & LỌC MÓN MAN HINH POS ---
function renderMenu(categoryFilter = 'all') {
    const menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid) return;
    
    let html = '';
    const filtered = categoryFilter === 'all' ? menuProducts : menuProducts.filter(p => p.category === categoryFilter);

    filtered.forEach(p => {
        html += `
            <div class="menu-item" onclick="addToCart('${p.name}', ${p.price})">
                <img src="${p.img}">
                <div class="item-name">${p.name}</div>
                <div class="item-price">${p.price.toLocaleString('vi-VN')} đ</div>
            </div>`;
    });
    menuGrid.innerHTML = html;
}

function filterCategory(cat, btn) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(cat);
}