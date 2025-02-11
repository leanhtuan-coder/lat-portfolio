'use strict';

// ===== Toggle Element Function =====
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ===== Sidebar Toggle for Mobile =====
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});


// ===== Filter Functionality =====
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// ===== Page Navigation =====
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Biến toàn cục để đánh dấu rằng trang About đã được animate rồi
let aboutAnimated = false;

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.getAttribute("data-nav-link").toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        
        // Nếu đây là trang About:
        if (pages[j].dataset.page === "about") {
          if (aboutAnimated) {
            // Nếu đã animate trước đó, loại bỏ animation để không chạy lại
            const pElements = pages[j].querySelectorAll(".typing-text");
            pElements.forEach(p => {
              p.style.animation = "none";
              p.style.opacity = "1";
            });
          } else {
            // Lần đầu tiên animate, đánh dấu là đã animate
            aboutAnimated = true;
          }
        }
        
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const aboutParagraphs = document.querySelectorAll(".about-text p");

  // Lắng nghe sự kiện kết thúc animation cho từng đoạn
  aboutParagraphs.forEach(function(p) {
    p.addEventListener("animationend", function () {
      // Loại bỏ animation bằng cách đặt inline style
      p.style.animation = "none";
      p.style.opacity = "1";
      p.style.transform = "translateY(0)";
    });
  });
});

// ===== Skills Animation =====
document.addEventListener("DOMContentLoaded", function () {
  const skillItems = document.querySelectorAll(".skills-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
          // Lấy phần tử chứa giá trị phần trăm
          const percentageElement = entry.target.querySelector("data");
          // Lấy phần tử thanh tiến độ
          const progressBar = entry.target.querySelector(".skill-progress-fill");

          // Lấy giá trị phần trăm từ thuộc tính "value"
          const percentage = percentageElement.getAttribute("value");
          
          // Cập nhật width và thêm hiệu ứng chuyển động
          progressBar.style.width = percentage + "%";
          progressBar.style.transition = "width 1.5s ease-in-out";

          // Đánh dấu đã animation để không chạy lại khi cuộn
          entry.target.classList.add("animated");
        }
      });
    },
    { threshold: 0.5 }
  );

  // Quan sát từng phần tử kỹ năng
  skillItems.forEach((item) => {
    observer.observe(item);
  });
});

// Hiệu ứng phóng to khi hover lên từng mục kỹ năng
document.querySelectorAll(".skills-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "scale(1.02)";
    item.style.transition = "transform 0.3s ease";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "scale(1)";
  });
});

// ===== Contact Form - EmailJS Integration =====
(function () {
  emailjs.init("NM9cW87bP_AWGCteu"); // Public Key từ EmailJS
})();

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.getElementById("form-status");

// Kiểm tra tính hợp lệ của form
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Xử lý gửi form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn hành vi gửi form mặc định

  formBtn.innerHTML = '<ion-icon name="send"></ion-icon> Sending...';

  emailjs.sendForm("service_wrk2ofm", "template_9ypxpmz", form)
    .then(() => {
      formStatus.textContent = "Thank you for your submission! I will get back to you shortly.";
      formStatus.style.color = "#ffda6b";
      formStatus.style.fontStyle = "italic";
      formStatus.style.opacity = "0.8";
      form.reset();
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> Send Message';
      formBtn.disabled = true;
    })
    .catch((error) => {
      console.error("Failed to send message:", error);
      formStatus.textContent = "Failed to send message. Please try again.";
      formStatus.style.color = "#ffda6b";
      formStatus.style.fontStyle = "italic";
      formStatus.style.opacity = "0.8";
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> Send Message';
    });
});




// Lấy tất cả các certificate item
const certificateItems = document.querySelectorAll('[data-certificate-item]');

// Lấy các phần tử modal
const certificateModal = document.getElementById('certificate-modal');
const certificateModalTitle = document.getElementById('certificate-modal-title');
const certificateModalDate = document.getElementById('certificate-modal-date');
const certificateModalImg = document.getElementById('certificate-modal-img');
const certificateModalClose = document.getElementById('certificate-modal-close');

// Lắng nghe sự kiện click trên mỗi certificate item
certificateItems.forEach(item => {
  item.addEventListener('click', () => {
    // Lấy tiêu đề chứng chỉ và ngày từ phần tử
    const title = item.querySelector('.timeline-item-title').innerText;
    const date = item.querySelector('span').innerText;
    // Lấy đường dẫn ảnh từ attribute data-certificate-img
    const imgSrc = item.getAttribute('data-certificate-img');

    // Cập nhật nội dung cho modal
    certificateModalTitle.innerText = title;
    certificateModalDate.innerText = date;
    certificateModalImg.src = imgSrc;

    // Hiển thị modal
    certificateModal.style.display = 'flex';
  });
});

// Đóng modal khi click vào nút đóng
certificateModalClose.addEventListener('click', () => {
  certificateModal.style.display = 'none';
});

// Tùy chọn: Đóng modal khi click vào bên ngoài nội dung modal
window.addEventListener('click', (event) => {
  if (event.target === certificateModal) {
    certificateModal.style.display = 'none';
  }
});


for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.getAttribute("data-nav-link").toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active"); // Đảm bảo chỉ thêm class active cho link hiện tại
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các đoạn văn trong phần About
  const aboutParagraphs = document.querySelectorAll(".about-text p");

  aboutParagraphs.forEach(function (p) {
    // Nếu animation kết thúc, thêm class 'animated'
    p.addEventListener("animationend", function () {
      p.classList.add("animated");
    });
  });
});
