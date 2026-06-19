let cart = [];
let orderCount = 101;

// --- GIỎ HÀNG POS ---
function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) { existing.quantity += 1; } else { cart.push({ name, price, quantity: 1 }); }
    updateCartUI();
}

function changeQuantity(idx, delta) {
    cart[idx].quantity += delta;
    if (cart[idx].quantity <= 0) cart.splice(idx, 1);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('total');
    if (cart.length === 0) {
        container.innerHTML = `<p style="color:#aaa; text-align:center; padding-top:40px;">Chưa chọn món</p>`;
        totalEl.innerText = '0 đ'; return;
    }
    let html = '', totalMoney = 0;
    cart.forEach((item, index) => {
        totalMoney += item.price * item.quantity;
        html += `
            <div class="cart-item">
                <div><strong>${item.name}</strong><br><small style="color:#888">${item.price.toLocaleString()} đ</small></div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>`;
    });
    container.innerHTML = html;
    totalEl.innerText = totalMoney.toLocaleString('vi-VN') + ' đ';
}

function checkout() {
    if(cart.length === 0) { alert('Thưa anh, giỏ hàng trống ạ!'); return; }
    orderCount++;
    let dHtml = '';
    cart.forEach(i => dHtml += `<li>• ${i.quantity}x ${i.name}</li>`);
    const kContainer = document.getElementById('kitchenOrders');
    const card = document.createElement('div');
    card.className = 'kitchen-card';
    card.innerHTML = `<div class="card-header-kit"><span>Đơn #${orderCount}</span><span>Vừa xong</span></div><div class="kitchen-details">${dHtml}</div><button class="btn-complete" onclick="this.parentElement.remove()">HOÀN THÀNH PHA CHẾ</button>`;
    kContainer.insertBefore(card, kContainer.firstChild);
    alert(`Xuất đơn #${orderCount} thành công sang tab Bếp!`);
    cart = []; 
    updateCartUI();
}