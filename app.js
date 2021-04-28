// ========== 1. 각 탭이 선택되면 선택된 탭 class(active) 적용 ==========
let $select = null; // 클릭할 때마다 저장되어야 하므로 전역변수

let $load = document.querySelector('#load');

const $tabs = document.querySelector('.nav-tabs').children;
//console.log($tabs); // HTMLCollection(3) [li.active, li, li]
const tabsLength = $tabs.length;
let $list = document.querySelector('#list');

function clickActive(event) {
    $load.style.display="block";
    $list.style.display="none";
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
    $tabs[i].addEventListener('click', loadJson);
}

// ========== 2. 각 탭을 누를때마다 해당 API를 사용하여 결과 표시 ==========
function loadJson(file, callback) {
    setTimeout(load,1000);
    const el = event.currentTarget;
    const $className = el.className.replace(' active', '');

    // ========== 3. 가져온 데이터를 id=list 에 노출 ==========
    readJsonFile($className+".json", function(text){
        const data = JSON.parse(text);
        
        // ========== 4. API에서 제목, 링크, 이미지, CP 를 적절히 표시 ==========
        $list.innerHTML = `
        <br><br>
        <li>
            <a href="${data[0].url}">
                <img src="${data[0].img}"></img>
                <br>
                ${data[0].cp} / <strong>${data[0].title}</strong>
            </a>
        </li>
        <br><br>`;
        
    });
}

function readJsonFile(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

// default
readJsonFile("recent.json", function(text){
    const data = JSON.parse(text);
    console.log(data[0]);
    $list.innerHTML  = `
    <br><br>
    <li>
        <a href="${data[0].url}">
            <img src="${data[0].img}"></img>
            <br>
            ${data[0].cp} / <strong>${data[0].title}</strong>
        </a>
    </li>
    <br><br>`;
});

// ========== 5. 로딩이미지 효과: 각 콘텐츠 노출시에 로딩이미지를 1초 노출후에 콘텐츠 노출 ==========
function load() {
    $load.style.display="none";
    $list.style.display="block";
    console.log($list.style.display);
}
load();