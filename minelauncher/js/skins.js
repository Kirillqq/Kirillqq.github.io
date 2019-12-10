let skins = [];
let hdSkins = [];
let cloaks = [];

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function () {
  loadData();

  $('.tabs .sk').click(showSkins);
  $('.tabs .hdsk').click(showHDSkins);
  $('.tabs .cl').click(showCloaks);

  $('.skins').on('click', 'a.btn', e => {
    e.preventDefault();
    const filename = e.target.href.split('#')[1];
    let obj = {};
    const showType = getParameterByName('view') || 'skins';
    if (showType === 'skins') obj['changeSkin'] = filename;
    if (showType === 'hdskins') obj['changeHDSkin'] = filename;
    if (showType === 'cloaks') obj['changeCloak'] = filename;
    $.post('/modules/api.php', obj, resp => {
      if(resp == "Done"){
        window.location.href = "account-main.php?skin-success=true";
      } else if(resp == "Error"){
        alert("Не удалось установить скин/плащ!");
      } else if(resp == "Error_login"){
          alert("Вы должны быть авторизированы для установки скина/плаща!");
      } else {
        alert("Недостаточно прав для установки скина/плаща!");
      }
    });
  });
});

const showSkins = () => {
  $('.tabs .sk').addClass('active');
  $('.tabs .hdsk').removeClass('active');
  $('.tabs .cl').removeClass('active');
  const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?view=skins';
  window.history.pushState({ path: newurl }, '', newurl);
  $('.skins').html('');
  skins.forEach(el => {
    $('.skins').append(`
      <div class="item">
        <div class="image"><img src="/modules/skin.php?catalog=true&show=body&side=front&user_name=${el.split('.')[0]}" alt=""></div>
        <a href="#${el}" class="btn">Поставить</a>
      </div>
    `);
  });
  loadLocalization(langFromStorage);
}

const showHDSkins = () => {
  $('.tabs .hdsk').addClass('active');
  $('.tabs .sk').removeClass('active');
  $('.tabs .cl').removeClass('active');
  const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?view=hdskins';
  window.history.pushState({ path: newurl }, '', newurl);
  $('.skins').html('');
  hdSkins.forEach(el => {
    $('.skins').append(`
      <div class="item">
        <div class="image"><img src="/modules/skin.php?hd=true&catalog=true&show=body&side=front&user_name=${el.split('.')[0]}&mode=1&catalog=1&fx=96" alt=""></div>
        <a href="#${el}" class="btn">Поставить</a>
      </div>
    `);
  });

  loadLocalization(langFromStorage);
}

const showCloaks = () => {
  $('.tabs .cl').addClass('active');
  $('.tabs .hdsk').removeClass('active');
  $('.tabs .sk').removeClass('active');
  const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?view=cloaks';
  window.history.pushState({ path: newurl }, '', newurl);
  $('.skins').html('');
  cloaks.forEach(el => {
    $('.skins').append(`
      <div class="item">
        <div class="image"><img src="/modules/skin.php?catalog=true&show=body&side=back&cloak=yes&user_name=${el.split('.')[0]}" alt=""></div>
        <a href="#${el}" class="btn">Поставить</a>
      </div>
    `);
    loadLocalization(langFromStorage);
  });
}

function loadData() {
  $.get('/modules/api.php?type=skinsList', data => {
    skins = data.skins.filter(el => el.length > 4);
    hdSkins = data.hdSkins.filter(el => el.length > 4);
    cloaks = data.cloaks.filter(el => el.length > 4);
    const showType = getParameterByName('view') || 'skins';
    if (showType === 'skins') showSkins();
    if (showType === 'hdskins') showHDSkins();
    if (showType === 'cloaks') showCloaks();
  })
}