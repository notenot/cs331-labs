var xmlhttp = getXmlHttp();

function getXmlHttp() {
  var xhr;
  try {
    xhr = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e) {
    try {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (E) {
      xhr = false;
    }
  }
  if (!xhr && typeof XMLHttpRequest !== 'undefined') {
    xhr = new XMLHttpRequest();
  }
  return xhr;
}

xmlhttp.open('GET', 'json/index.json', true);
xmlhttp.send();

xmlhttp.onreadystatechange = function () {
  var json;

  if (xmlhttp.readyState !== 4) {
    return;
  }

  if (xmlhttp.status !== 200) {
    alert(xmlhttp.status + ': ' + xmlhttp.statusText);
    return;
  }

  json = JSON.parse(xmlhttp.responseText);

  // load header

  document.getElementsByClassName('navbar-burger-opened__link')[0].innerHTML =
    json.header.navbar.burgeropened[0];
  document.getElementsByClassName('navbar-burger-opened__link')[1].innerHTML =
    json.header.navbar.burgeropened[1];
  document.getElementsByClassName('navbar-burger-opened__link')[2].innerHTML =
    json.header.navbar.burgeropened[2];
  document.getElementsByClassName('navbar-burger-opened__link')[3].innerHTML =
    json.header.navbar.burgeropened[3];
  document.getElementsByClassName('navbar-burger-opened__link')[4].innerHTML =
    json.header.navbar.burgeropened[4];
  document.getElementsByClassName('navbar-burger-opened__link')[5].innerHTML =
    json.header.navbar.burgeropened[5];

  document.getElementsByClassName('navbar-menu__link')[0].innerHTML =
    json.header.navbar.menu[0];
  document.getElementsByClassName('navbar-menu__link')[1].innerHTML =
    json.header.navbar.menu[1];
  document.getElementsByClassName('navbar-menu__link')[2].innerHTML =
    json.header.navbar.menu[2];
  document.getElementsByClassName('navbar-menu__link')[3].innerHTML =
    json.header.navbar.menu[3];
  document.getElementsByClassName('navbar-menu__link')[4].innerHTML =
    json.header.navbar.menu[4];

  document.getElementsByClassName('header-content__title')[0].innerHTML =
    json.header.content.title;
  document.getElementsByClassName('header-content__btn')[0].innerHTML =
    json.header.content.btn;

  // load about

  document.getElementsByClassName('about-header__title')[0].innerHTML =
    json.about.header.title;
  document.getElementsByClassName('about-header__text')[0].innerHTML =
    json.about.header.text;

  document.getElementsByClassName('about-content-text__title')[0].innerHTML =
    json.about.content.title;
  document.getElementsByClassName('about-content-text__paragraph')[0].innerHTML =
    json.about.content.paragraph[0];
  document.getElementsByClassName('about-content-text__paragraph')[1].innerHTML =
    json.about.content.paragraph[1];
  document.getElementsByClassName('about-content-text__btn')[0].innerHTML =
    json.about.content.btn;
};

/*
{
  "header": {
      "navbar": "HOME",
      "header-content": "none"
  }
}
*/
