const data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
];

const list = document.querySelector('.ticket-list');

function init(){

  // 練習 - 動態新增篩選地區
  
  const areaSelectors = document.querySelectorAll('select[data-select="area"]');
  const area = new Set([...data].map(item => item.area));
  let str = '';
  area.forEach(item => str += `<option value="${item}">${item}</option>`);
  areaSelectors.forEach(selector => selector.innerHTML += str);

  renderData(data);

};

init();

function renderData(data) {

  let str = '';
  data.forEach(ticket => {
  str += `
  <li class="card">
      <div class="card-header">
          <div class="card-img">
              <img class="ticket-image" src="${ticket.imgUrl}" alt="${ticket.name}">
          </div>
          <div class="ticket-info rate">${ticket.rate}</div>
          <div class="ticket-info area">${ticket.area}</div>
      </div>
      <div class="card-body">
          <div class="card-content">
              <div class="card-title"><h2>${ticket.name}</h2></div>
              <p>${ticket.description}</p>
          </div>
          <div class="card-footer fw-500">
              <p class="ticket-group">
                  <span class="material-icons">info</span>
                  <span>剩下最後 ${ticket.group} 組</span>
              </p>
              <p class="ticket-price">
                  <span>TWD</span>
                  <span class="fs-32">${ticket.price}</span>
              </p>
          </div>
      </div>
  </li>
  `})
  list.innerHTML = str;

  (function(){
      name.value = '';
      imgUrl.value = '';
      area.value = '';
      price.value = '';
      group.value = '';
      rate.value = '';
      description.value = '';
  })();

  const message = document.querySelector('.filter-message');
  message.textContent = `本次搜尋共 ${data.length} 筆資料`;

}

// 新增套票功能

const submit = document.querySelector('#submit');

submit.addEventListener('click', () => {

  let name = document.querySelector('#name').value;
  let imgUrl = document.querySelector('#imgUrl').value;
  let area = document.querySelector('#area').value;
  let price = document.querySelector('#price').value;
  let group = document.querySelector('#group').value;
  let rate = document.querySelector('#rate').value;
  let description = document.querySelector('#description').value;

  function numberCheck(num) {
    num = Number(num);
    return num > 0 && Number.isInteger(num);
  }

  function check() {
    if (!name || !area || !price || !group || !rate || !description) {
      message('warning', '欄位不可空白');
    } else if (!numberCheck(price) || !numberCheck(group) || !numberCheck(rate)) {
      message('warning', '數字欄位請填寫不為零的正整數');
    } else if (rate>10 || rate<0) {
      message('warning', '星級範圍應為 1～10 之間')
    } else {
      return true;
    }
    return false;
  }

  function finished() {

    data.push({
      id: data[data.length-1].id+1,
      name,
      imgUrl: imgUrl.startsWith('https://') ? imgUrl : `https://fakeimg.pl/333x221/?text=${name}&font=noto`,
      area,
      price,
      group,
      rate,
      description
    });

    message('success', '新增成功');
    renderData(data);
  
  }

  return check() && finished();

}, false);

// 篩選地區功能

const filter = document.querySelector('#filter');

filter.addEventListener('change', function(e){
  const { value } = e.target;
  if (value !== '全部地區') {
    let newData = [...data];
    newData = newData.filter(item => item.area === value);
    renderData(newData);
  } else {
    renderData(data);
  }
}, false)

// 提示訊息元件

function message(icon, title) {
  Swal.fire({
    icon,
    position: 'center',
    title,
    toast: true,
    showConfirmButton: false,
    timer: 1500,
  });
}