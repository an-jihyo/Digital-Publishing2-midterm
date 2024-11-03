let scrollTimeout;
const sections = document.querySelectorAll('.col-12'); // 스크롤할 섹션 목록
let currentSectionIndex = 0;

window.addEventListener('wheel', function(event) {
    if (scrollTimeout) return; // 스크롤 중일 때 무시하여 여러 번 넘어가지 않음

    // 스크롤 방향에 따라 현재 섹션 인덱스 업데이트
    let direction = event.deltaY > 0 ? 1 : -1;
    currentSectionIndex = Math.min(Math.max(currentSectionIndex + direction, 0), sections.length - 1);

    // 이동할 섹션의 위치
    let targetSection = sections[currentSectionIndex];
    let targetPosition = targetSection.offsetTop;

    // 해당 섹션으로 부드럽게 스크롤
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    // 일정 시간(600ms) 동안 스크롤을 막아 여러 번 이동 방지
    scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
    }, 500);
}, { passive: false });

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const parent = button.parentElement;
        const nextDiv = parent ? parent.nextElementSibling : null;

        if (nextDiv && nextDiv.tagName.toLowerCase() === 'div') {
            if (nextDiv.style.display === 'none' || nextDiv.style.display === '') {
                nextDiv.style.display = 'block'; 
            } else {
                nextDiv.style.display = 'none'; 
            }
        }
    });

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.2)'; 
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)'; 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // 모든 articlemaintext 요소들을 선택
    const textElements = document.querySelectorAll('.articlemaintext');

    // Intersection Observer를 이용해 스크롤 감지
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 보일 때 텍스트 애니메이션 시작
                startTypingAnimation(entry.target);
                observer.unobserve(entry.target); // 한 번 나타나면 더 이상 관찰하지 않음
            }
        });
    }, { threshold: 0.1 }); // 요소가 10% 보일 때 트리거

    textElements.forEach(element => {
        observer.observe(element); // 각 요소를 관찰
    });

    // 글자를 한 글자씩 나타내는 함수
    function startTypingAnimation(element) {
        const nodes = Array.from(element.childNodes);
        element.innerHTML = ''; // 기존 내용을 비워둠

        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                typeTextNode(node, element);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const clonedNode = node.cloneNode(false);
                element.appendChild(clonedNode);
                typeTextNode(node.firstChild, clonedNode);
            }
        });
    }

    function typeTextNode(node, parent) {
        if (!node) return;

        const text = node.textContent;
        let index = 0;

        function typeNextLetter() {
            if (index < text.length) {
                parent.append(text[index]);
                index++;
                setTimeout(typeNextLetter, 100); // 다음 글자까지 50ms 대기
            }
        }

        typeNextLetter();
    }
});


