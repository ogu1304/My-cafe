document.addEventListener('DOMContentLoaded', () => {
    const profileButton = document.getElementById('profile-button');
    const profileMenu = document.getElementById('profile-menu');
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');
    const confirmation = document.getElementById('confirmation');
    const form = document.getElementById('newsletter-form');
    const slides = document.querySelector('.slides');
    const slideImages = document.querySelectorAll('.slide img');
    let currentIndex = 0;
    let autoSlideInterval;

    // 프로필 버튼
    profileButton.addEventListener('click', () => {
        profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
    });

    // 햄버거 메뉴
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    // 자동 슬라이드
    const moveSlide = (n) => {
        currentIndex = (currentIndex + n + slideImages.length) % slideImages.length;
        slides.style.transform = `translateX(${-currentIndex * 100}%)`;
    };

    const autoSlide = () => {
        autoSlideInterval = setInterval(() => moveSlide(1), 10000); // 10초 간격으로 자동 슬라이드
    };

    autoSlide();

    // 첫번째 슬라이드로 리턴
    slides.addEventListener('transitionend', () => {
        if (currentIndex === slideImages.length - 1) {
            setTimeout(() => {
                slides.style.transition = 'none';
                currentIndex = 0;
                slides.style.transform = `translateX(${-currentIndex * 100}%)`;
                setTimeout(() => slides.style.transition = 'transform 1s ease-in-out', 50);
            }, 50);
        }
    });

    document.querySelector('.prev').addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        moveSlide(-1);
        autoSlide();
    });

    document.querySelector('.next').addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        moveSlide(1);
        autoSlide();
    });

    // 섹션 드러내기
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // 응답 폼
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        confirmation.textContent = `${email}, 구독해주셔서 감사합니다.`;
        confirmation.style.display = 'block';
        setTimeout(() => {
            confirmation.style.display = 'none';
        }, 5000);
    });

    // 카페 위치
    window.initMap = function() {
        const cafeLocation = { lat: 37.7749, lng: -122.4194 }; // 아무거나 넣어놓기
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: cafeLocation
        });
        new google.maps.Marker({
            position: cafeLocation,
            map: map,
            title: 'My Cafe'
        });
    };
});
