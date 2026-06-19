// --- DATA KHO NGUYÊN LIỆU GỐC ---
let inventoryData = [
    { id: 1, code: 'NL01', name: 'Hồng trà đặc biệt', category: 'Cốt Trà', stock: 15.5, unit: 'kg' },
    { id: 2, code: 'NL02', name: 'Trân châu đen Đài Loan', category: 'Topping', stock: 2.0, unit: 'kg' },
    { id: 3, code: 'NL03', name: 'Bột Matcha Nhật Bản', category: 'Bột Vị', stock: 0.3, unit: 'kg' }
];

let currentAction = 'add'; 

// --- CHỨC NĂNG THÊM, SỬA, XÓA KHO (CRUD) ---
function getStockBadge(stock) {
    if (stock <= 0.5) return `<span class="badge bg-danger">Cần nhập gấp</span>`;
    if (stock <= 3.0) return `<span class="badge bg-warning">Sắp hết</span>`;
    return `<span class="badge bg-success">An toàn</span>`;
}

function renderInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    
    let html = '';
    inventoryData.forEach(item => {
        html += `
            <tr>
                <td><strong>${item.code}</strong></td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${Number(item.stock).toFixed(1)}</td>
                <td>${item.unit}</td>
                <td>${getStockBadge(item.stock)}</td>
                <td style="text-align: center;">
                    <button onclick="openInventoryModal('edit', ${item.id})" style="padding: 5px 10px; background-color: #3498db; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer; margin-right: 5px;">Sửa</button>
                    <button onclick="deleteInventoryItem(${item.id})" style="padding: 5px 10px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">Xóa</button>
                </td>
            </tr>`;
    });
    tbody.innerHTML = html;
}

function openInventoryModal(action, id = null) {
    currentAction = action;
    document.getElementById('inventoryModal').style.display = 'flex';
    
    if (action === 'add') {
        document.getElementById('modalTitle').innerText = "Thêm Nguyên Liệu Mới";
        document.getElementById('invId').value = "";
        document.getElementById('invCode').value = "";
        document.getElementById('invName').value = "";
        document.getElementById('invCategory').value = "Cốt Trà";
        document.getElementById('invStock').value = "";
        document.getElementById('invUnit').value = "";
    } else if (action === 'edit') {
        document.getElementById('modalTitle').innerText = "Cập Nhật Nguyên Liệu";
        const item = inventoryData.find(i => i.id === id);
        if (item) {
            document.getElementById('invId').value = item.id;
            document.getElementById('invCode').value = item.code;
            document.getElementById('invName').value = item.name;
            document.getElementById('invCategory').value = item.category;
            document.getElementById('invStock').value = item.stock;
            document.getElementById('invUnit').value = item.unit;
        }
    }
}

function closeInventoryModal() {
    document.getElementById('inventoryModal').style.display = 'none';
}

// Hàm Lưu dữ liệu form (Xử lý cả Thêm mới và Chỉnh sửa)
function saveInventoryItem() {
    const code = document.getElementById('invCode').value.trim();
    const name = document.getElementById('invName').value.trim();
    const category = document.getElementById('invCategory').value;
    const stock = parseFloat(document.getElementById('invStock').value);
    const unit = document.getElementById('invUnit').value.trim();
    
    if (!code || !name || isNaN(stock) || !unit) {
        alert("Thưa anh, vui lòng nhập đầy đủ toàn bộ thông tin nguyên liệu ạ!");
        return;
    }
    
    if (currentAction === 'add') {
        const newId = inventoryData.length > 0 ? Math.max(...inventoryData.map(i => i.id)) + 1 : 1;
        inventoryData.push({ id: newId, code, name, category, stock, unit });
        alert("Thêm nguyên liệu thành công!");
    } else if (currentAction === 'edit') {
        const id = parseInt(document.getElementById('invId').value);
        const index = inventoryData.findIndex(i => i.id === id);
        if (index !== -1) {
            inventoryData[index] = { id, code, name, category, stock, unit };
            alert("Cập nhật nguyên liệu thành công!");
        }
    }
    closeInventoryModal();
    renderInventoryTable();
}

function deleteInventoryItem(id) {
    const item = inventoryData.find(i => i.id === id);
    if (!item) return;
    if (confirm(`Anh có chắc muốn xóa nguyên liệu "${item.name}" không ạ?`)) {
        inventoryData = inventoryData.filter(i => i.id !== id);
        renderInventoryTable();
    }
}

// --- KHỞI TẠO BIỂU ĐỒ ADMIN CHART.JS ---
function initRevenueChart() {
    if (window.myRevenueChart) {
        window.myRevenueChart.destroy();
    }

    const ctx = document.getElementById('revenueChart').getContext('2d');
    if (!ctx) return;

    window.myRevenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
                {
                    label: 'Doanh thu (VNĐ)',
                    data: [45000000, 58000000, 42000000, 61000000, 75000000, 89000000, 82000000, 79000000, 68000000, 72000000, 65000000, 95000000],
                    backgroundColor: 'rgba(26, 188, 156, 0.75)',
                    borderColor: '#1abc9c',
                    borderWidth: 1,
                    yAxisID: 'y-revenue',
                    order: 2
                },
                {
                    label: 'Số lượng Hóa đơn',
                    data: [420, 510, 390, 580, 710, 850, 790, 760, 640, 690, 610, 920],
                    borderColor: '#e67e22',
                    backgroundColor: 'rgba(230, 126, 34, 0.1)',
                    type: 'line',
                    fill: false,
                    tension: 0.3,
                    yAxisID: 'y-orders',
                    order: 1
                }
            ]
                },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                'y-revenue': {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'Doanh thu (VNĐ)', color: '#1abc9c', font: { weight: 'bold' } },
                    ticks: { callback: function(value) { return value.toLocaleString('vi-VN') + ' đ'; } }
                },
                'y-orders': {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Số lượng hóa đơn (Đơn)', color: '#e67e22', font: { weight: 'bold' } },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
}