window.addEventListener('load', startInject, false);

function startInject() {
  addStyleContent(`
    #edit-menu {
      width: 100% !important;
      top: 100px!important;
      left: 0px !important;
      height: 70% !important;
    }

    #menu-close {
      top: auto!important;
    }
    
    .select2-dropdown {
      z-index: 9999999999!important;
    }
  `);
  addStyleLink('https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/css/select2.min.css');
  addScript('https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/js/select2.min.js', () => {
    functionCallback('validateTime', () => {
      $('[name="projects[]"]')
        .filter((i, e) => $(e).prop('onchange'))
        .each((i, e) => $(e).select2());
    });
    functionCallback('addRecord', () => {
      $('[name="projects[]"]')
        .filter((i, e) => $(e).prop('onchange'))
        .last()
        .select2();
    });
  });
}

function functionCallback(fn, callback) {
  if (!window[fn] || typeof window[fn] !== 'function') {
    return () => console.log('NOT FOUND TARGET FUNCTION');
  }
  const textTargetFn = window[fn].toString();
  const clonedTargetFn = eval('var f = function(){ return ' + textTargetFn + ';}; f() ;');
  window[fn] = (...args) => {
    clonedTargetFn.call(null, ...args);
    callback(...args);
  };
}

function addScript(src, callback = () => {}) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  s.onload = callback;
  document.body.appendChild(s);
}

function addStyleLink(url) {
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', url);
  document.getElementsByTagName('head')[0].appendChild(link);
}

function addStyleContent(content) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = content;
  document.getElementsByTagName('head')[0].appendChild(style);
}
