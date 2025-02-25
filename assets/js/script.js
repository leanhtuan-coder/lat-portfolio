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
const selectValue = document.querySelector("[data-select-value]");
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
        const progressBar = entry.target.querySelector(".skill-progress-fill");
        const percentage = entry.target.querySelector("data").getAttribute("value");
  
        if (entry.isIntersecting) {
          progressBar.style.width = percentage + "%";
        } else {
          progressBar.style.width = "0"; // Reset lại để hiệu ứng chạy lại
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

certificateItems.forEach(item => {
  item.addEventListener("click", () => {
    // Lấy thông tin từ item
    const title = item.querySelector('.timeline-item-title')?.innerText || "Certificate";
    const date = item.querySelector('span')?.innerText || "No Date";
    const imgSrc = item.getAttribute('data-certificate-img');

    // Kiểm tra nếu không có ảnh
    if (!imgSrc) {
      console.error("Không tìm thấy ảnh chứng chỉ.");
      return;
    }

    // Cập nhật nội dung cho modal
    document.getElementById("certificate-modal-title").innerText = title;
    document.getElementById("certificate-modal-date").innerText = date;
    document.getElementById("certificate-modal-img").src = imgSrc;

    // Thêm class "show" để hiển thị modal
    document.getElementById("certificate-modal").classList.add("show");
  });
});



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
    certificateModal.classList.add("show");
  });
});

// Đóng modal khi click vào nút đóng
certificateModalClose.addEventListener('click', () => {
  certificateModal.classList.remove("show");
});

// Tùy chọn: Đóng modal khi click vào bên ngoài nội dung modal
window.addEventListener('click', (event) => {
  if (event.target === certificateModal && !certificateModalImg.contains(event.target)) {
    certificateModal.classList.remove("show");
  }
});


for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.getAttribute("data-nav-link").toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active"); // Sửa lỗi chỉ một tab được active
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


// Dữ liệu mẫu cho blog posts cập nhật theo ảnh của anh
const blogPosts = {
  1: {
    title: "Defending the Proposal for the Establishment of a Club",
    cover: "assets/images/frc.jpg", // Ảnh bìa chính
    content: `<p>The club has successfully completed its proposal defense before the IC-PDP department. The defense went smoothly and successfully, marking an important milestone in the club’s journey. Next, the club will enter a three-month trial period before being officially recognized as a school club. During this time, the club must organize at least two events or competitions to create opportunities for members to work together, understand each other better, and build stronger connections. During this period, the IC-PDP department and the school will also evaluate and make the final decision.</p>
    <br>
    <p><em>Defense team: Anh Tuan Le, Ha Phuong Hoang, Minh Tuan Ta, Quoc Minh Nguyen.</em></p>`,
    gallery: [
      "assets/images/frc1.jpg",
      "assets/images/frc2.jpg"
    ]
  },
  2: {
    title: "FIRST Tech Challenge Vietnam 2024-2025",
    cover: "assets/images/ftc.jpg",
    content: `<p>#FIRSTTechChallengeVietnam #FTC #Robotics #STEM #MemorableMoments</p>`,
    gallery: [
      "assets/images/ftc2.jpg",
      "assets/images/ftc16.jpg",
      "assets/images/ftc1.jpg",
      "assets/images/ftc3.jpg",
      "assets/images/ftc4.JPG",
      "assets/images/ftc5.jpg",
      "assets/images/ftc6.JPG",
      "assets/images/ftc7.JPG",
      "assets/images/ftc18.JPG",
      "assets/images/ftc8.JPG",
      "assets/images/ftc9.jpg",
      "assets/images/ftc10.JPG",
      "assets/images/ftc11.jpg",
      "assets/images/ftc12.jpg",
      "assets/images/ftc13.jpg",
      "assets/images/ftc14.jpg",
      "assets/images/ftc15.jpg",
      "assets/images/ftc17.jpeg",
    

      

    ]
  },
  
  // Có thể thêm các bài viết khác
};



// Hàm mở modal hiển thị blog chi tiết
function openBlogDetail(id) {
  const blog = blogPosts[id];
  if (blog) {
    const modalCover = document.getElementById("blog-modal-cover");
    const modalTitle = document.getElementById("blog-modal-title");
    const modalContent = document.getElementById("blog-modal-content");

    modalCover.src = blog.cover;
    modalTitle.innerText = blog.title;
    
    // Tạo nội dung chi tiết kết hợp với gallery nếu có
    let html = blog.content;
    if (blog.gallery && blog.gallery.length > 0) {
      html += `<div class="blog-gallery">`;
      blog.gallery.forEach(image => {
        html += `<img src="${image}" alt="Gallery Image" class="gallery-image">`;
      });
      html += `</div>`;
    }
    modalContent.innerHTML = html;

    document.getElementById("blog-modal").classList.add("show");
  } else {
    console.error("Không tìm thấy dữ liệu blog cho id:", id);
  }
}

function closeBlogDetail() {
  console.log("Closing blog modal");
  document.getElementById("blog-modal").classList.remove("show");
}

