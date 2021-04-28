// ========== 1. 각 탭이 선택되면 선택된 탭 class(active) 적용 ==========
let $select = null; // 클릭할 때마다 저장되어야 하므로 전역변수

const $tabs = document.querySelector('.nav-tabs').children;
//console.log($tabs); // HTMLCollection(3) [li.active, li, li]
const tabsLength = $tabs.length;

function clickActive(event) {
    $tabs[0].className = $tabs[0].className.replace(' active', ''); // default active 제거
    if ($select) {
        $select.className = $select.className.replace(' active', ''); // 선택되었던 active 제거
    }
    const el = event.currentTarget;
    el.className += ' active'; // className에 active 추가
    $select = el; // 클릭할 때마다 $select에 저장
}

// 이벤트 등록
for (let i = 0; i < $tabs.length; i++) {
    $tabs[i].addEventListener('click', clickActive);
}