// Loader FIX
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
});

// Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Counter FIX (hỗ trợ K, M)
const counters = document.querySelectorAll(".stat-number");

counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
        count += target / 100;

        if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
        } else {
            if (target >= 1000000) {
                counter.innerText = (target / 1000000) + "M";
            } else if (target >= 1000) {
                counter.innerText = (target / 1000) + "K";
            } else {
                counter.innerText = target;
            }
        }
    };

    update();
});

// Form FIX
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Đặt hàng thành công!");
});
