$(document).ready(function(){
  loadData();
})

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadData() {
  const lang = localStorage.getItem('lang') || 'ru';
  const id = getParameterByName('id');
  const type = getParameterByName('type') || 'topics';
  if (id) {
    $.get(`/modules/api.php?type=downloadOne&id=${id}&lang=${lang}&dtype=${type}`, data => {
      $('.welcome h1').text(data.title);
      $('.image img').attr('src', "upload/"+data.img_full);
      $('.descr').text(data.descr);
      if(data.url_other != null && data.url_other != ''){
        $('.buttons.clear').append(
            `<a href="${data.url_windows}" class="btn-gradient windows">Скачать для Windows</a>`+
            `<a href="${data.url_other}" class="btn-gradient other">Скачать для Linux/MacOS</a>`
        );
      } else {
        $('.buttons.clear').append(
            `<a href="${data.url_windows}" class="btn-gradient windows">Скачать для Windows</a>`
        );
        $('.btn-gradient.windows').css("width", "100%");       
      }

      $('meta[name=description]').attr('content', data.short_descr);
      $('meta[name=keywords]').attr('content', data.keywords);
    });
  }
}