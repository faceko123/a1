// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        name: "Áo thun nam cao cấp",
        price: 250000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        category: "ao",
        description: "Áo thun cotton 100% chất lượng cao, thoáng mát, bền màu."
    },
    {
        id: 2,
        name: "Quần jeans slim fit",
        price: 450000,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        category: "quan",
        description: "Quần jeans slim fit thời trang, chất liệu co giãn thoải mái."
    },
    {
        id: 3,
        name: "Giày sneaker trắng",
        price: 850000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        category: "giay",
        description: "Giày sneaker thể thao cao cấp, đế êm ái, bền bỉ."
    },
    {
        id: 4,
        name: "Áo sơ mi trắng",
        price: 350000,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400",
        category: "ao",
        description: "Áo sơ mi trắng lịch lãm, phù hợp mọi hoàn cảnh."
    },
    {
        id: 5,
        name: "Quần short thể thao",
        price: 280000,
        image: "https://images.unsplash.com/photo-1581378496668-12f78a52b7b5?w=400",
        category: "quan",
        description: "Quần short thể thao thoáng mát, phù hợp tập luyện."
    },
    {
        id: 6,
        name: "Giày cao gót đỏ",
        price: 1200000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        category: "giay",
        description: "Giày cao gót đỏ sang trọng, thiết kế tinh tế."
    }
];

// Giỏ hàng
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartItems = document.getElementById('cartItems');
const productModal = document.getElementById('productModal');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupEventListeners();
    updateCartUI();
});

// Render sản phẩm
function renderProducts(productList) {
    productsGrid.innerHTML = productList.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                </button>
            </div>
        </div>
    `).join('');
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Thêm vào giỏ hàng
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
