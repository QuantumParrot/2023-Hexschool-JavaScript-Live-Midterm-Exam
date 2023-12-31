// WEEK 05 DOM + forEach

// const data = [
//     {
//       "id": 0,
//       "name": "肥宅心碎賞櫻3日",
//       "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//       "area": "高雄",
//       "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//       "group": 87,
//       "price": 1400,
//       "rate": 10
//     },
//     {
//       "id": 1,
//       "name": "貓空纜車雙程票",
//       "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//       "area": "台北",
//       "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//       "group": 99,
//       "price": 240,
//       "rate": 2
//     },
//     {
//       "id": 2,
//       "name": "台中谷關溫泉會1日",
//       "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//       "area": "台中",
//       "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//       "group": 20,
//       "price": 1765,
//       "rate": 7
//     }
// ];

const form = document.querySelector('#form');
const list = document.querySelector('.ticket-list');
const filter = document.querySelector('#filter');

let data = [];

function init(){

  // 練習 - 動態新增篩選地區

  const areaList = ['台北','新北','基隆','桃園','新竹','苗栗','台中','彰化','南投','宜蘭','花蓮','台東','雲林','嘉義','台南','高雄','屏東','澎湖','金門','連江'];
  
  // const area = new Set([...data].map(item => item.area));

  const areaSelectors = document.querySelectorAll('select[data-select="area"]');

  let str = '';
  areaList.forEach(item => str += `<option value="${item}">${item}</option>`);
  areaSelectors.forEach(selector => selector.innerHTML += str);

  // WEEK 06 AJAX

  const apiUrl = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';

  axios.get(apiUrl)
  .then(res => {
    data = res.data.data;
    renderData(data);
    renderDonutChart(data);
  })
  .catch(error => { console.log(error) })

};

init();

function renderData(data) {

  let str = '';

  if (data.length == 0) {
    str = `
    <div class="container-sm not-found">
        <h2 class="fw-700">查無此關鍵字資料</h2>
        <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/no_found.png?raw=true" alt="Not Found">
    </div>`
  } else {
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
      `
    })
  }

  list.innerHTML = str;

  const message = document.querySelector('.filter-message');
  message.textContent = `本次搜尋共 ${data.length} 筆資料`;

}

// 新增套票功能

form.addEventListener('submit', (e) => {

  e.preventDefault();

  let name = document.querySelector('#name').value;
  let imgUrl = document.querySelector('#imgUrl').value;
  let area = document.querySelector('#area').value;
  let price = document.querySelector('#price').value;
  let group = document.querySelector('#group').value;
  let rate = document.querySelector('#rate').value;
  let description = document.querySelector('#description').value;

  // function numberCheck(num) {
  //   num = Number(num);
  //   return num > 0 && Number.isInteger(num);
  // }

  // function check() {
  //   if (!name || !area || !price || !group || !rate || !description) {
  //     message('warning', '欄位不可空白');
  //   } else if (!numberCheck(price) || !numberCheck(group) || !numberCheck(rate)) {
  //     message('warning', '數字欄位請填寫不為零的正整數');
  //   } else if (rate>10 || rate<0) {
  //     message('warning', '星級範圍應為 1～10 之間')
  //   } else {
  //     return true;
  //   }
  //   return false;
  // }

  // 利用 validate.js 驗證

  const constraints = {
    name: {
      presence: {
        message: '必填'
      }
    },
    imgUrl: {
      url: {
        schemes: ['http', 'https'],
        message: '請填寫有效的網址'
      }
    },
    area: {
      presence: {
        message: '必選'
      }
    },
    price: {
      presence: {
        message: '必填'
      },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        message: '請填寫不為零的正整數'
      }
    },
    group: {
      presence: {
        message: '必填'
      },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        message: '請填寫不為零的正整數'
      }
    },
    rate: {
      presence: {
        message: '必填'
      },
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 10,
        message: '星級範圍應為 1～10 之間的整數'
      }
    },
    description: {
      presence: {
        message: '必填'
      }
    }
  }

  function messageReplace(arr) {
    return arr[0].replace(/^[\w\s]+/,"");
  }

  function finished() {

    data.push({
      id: data[data.length-1].id+1,
      name,
      imgUrl: imgUrl ? imgUrl : `https://fakeimg.pl/333x221/?text=${name}&font=noto`,
      area,
      price: parseInt(price),
      group: Number(group),
      rate: +(rate),
      description
    });
    message('success', '新增成功');
    createNewTicket(data);
  
  }

  const errors = validate(form, constraints);

  if (errors) {

    Object.keys(errors).forEach(key => {
      const message = form.querySelector(`[name="${key}"]`).nextElementSibling;
      message.textContent = messageReplace(errors[key]);
    })

  } else { finished() }

}, false);

form.addEventListener('input', (e) => {
  e.target.nextElementSibling.textContent = '';
})

function createNewTicket() {
  const form = document.querySelector('#form');
  form.reset();
  filter.value = '全部地區';
  renderData(data);
  renderDonutChart(data);
}

// 篩選地區功能

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

// WEEK 07 ( 篩選出核心的資訊 --> 做成套件要的格式 )

function renderDonutChart(data) {

  let total = {};
  data.forEach(item => total[item.area] ? total[item.area] += 1 : total[item.area] = 1);
  let chartData = [];
  let areas = Object.keys(total);
  areas.forEach(area => chartData.push([area, total[area]]));

  const chart = c3.generate({
    size: {
      width: 200
    },
    data: {
      columns: chartData,
      type: 'donut',
      colors: {
        '台北': '#26C0C7',
        '台中': '#5151D3',
        '高雄': '#E68618',
      }
    },
    donut: {
      title: '套票地區比重',
      width: 20,
      label: {
        show: false,
      }
    },    
  });

}