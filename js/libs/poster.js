/*! @overbool/poster v1.0.1 | (c) 2019 Overbool | https://github.com/overbool/poster */
"use strict";

// post class
var poster = function () {
  var DEBUG = false;
  var WIDTH = 768;
  var HEIGHT = 2168;

  function init(config) {
    var $container = document.querySelector(config.selector);
    var $wrapper = createDom('div', 'id', 'wrapper');
    var $canvas = createDom('canvas', 'id', 'canvas', 'block');
    var $day = createDom('canvas', 'id', 'day');
    var $date = createDom('canvas', 'id', 'date');
    var $title = createDom('canvas', 'id', 'title');
    var $content = createDom('canvas', 'id', 'content');
    var $logo = createDom('canvas', 'id', 'logo');
    var $description = createDom('canvas', 'id', 'description');
    appendChilds($wrapper, $canvas, $day, $date, $title, $content, $logo, $description);
    $container.appendChild($wrapper);
    var date = new Date(); // day

    var dayStyle = {
      font: 'italic bold 70px Arial',
      color: 'rgba(255, 255, 255, 1)',
      position: 'right'
    };
    drawOneline($day, dayStyle, date.getDate()); // date

    var dateStyle = {
      font: 'italic 30px Arial',
      color: 'rgba(255, 255, 255, 1)',
      position: 'right'
    };
    drawOneline($date, dateStyle, date.getFullYear() + ' / ' + (date.getMonth() + 1)); // title canvas

    var titleStyle = {
      font: 'bold 50px Arial',
      color: 'rgba(66, 66, 66, 1)',
      position: 'center'
    };
    titleStyle.font = config.titleStyle && config.titleStyle.font || titleStyle.font;
    titleStyle.color = config.titleStyle && config.titleStyle.color || titleStyle.color;
    titleStyle.position = config.titleStyle && config.titleStyle.position || titleStyle.position;
    drawOneline($title, titleStyle, config.title); // content canvas

    var contentStyle = {
      font: '28px Arial',
      lineHeight: 1.5,
      position: 'left',
      color: 'rgba(88, 88, 88, 1)'
    };
    contentStyle.font = config.contentStyle && config.contentStyle.font || contentStyle.font;
    contentStyle.color = config.contentStyle && config.contentStyle.color || contentStyle.color;
    contentStyle.lineHeight = config.contentStyle && config.contentStyle.lineHeight || contentStyle.lineHeight;
    contentStyle.position = config.contentStyle && config.contentStyle.position || contentStyle.position;
    drawMoreLines($content, contentStyle, config.content); // logo

    var logoStyle = {
      font: 'bold 40px Roboto Slab',
      position: 'center',
      color: 'rgba(0, 0, 25, 1)'
    };
    logoStyle.color = config.logoStyle && config.logoStyle.color || logoStyle.color;
    drawOneline($logo, logoStyle, config.logo); // description

    var descriptionStyle = {
      font: '22px Arial',
      color: 'rgba(180, 180, 180, 1)',
      lineHeight: 1.1,
      position: 'left'
    };
    drawMoreLines($description, descriptionStyle, config.description); // background image

    var image = new Image();


    var onload = function onload() {
      $canvas.width = WIDTH;
      $canvas.height = HEIGHT;
      image.src = config.banner;
      var h = 0;
      
      image.onload = function () {
        var ctx = $canvas.getContext('2d');
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, $canvas.width, $canvas.height);
        //ctx.drawImage(image, 0, 0, $canvas.width, image.height);
        h += 768/image.width*image.height
        ctx.drawImage(image,0,0,image.width,image.height,0,0,768,768/image.width*image.height)
        ctx.drawImage($day, 0, h - 120);
        ctx.drawImage($date, 0, h - 50);
        h += 80;
        ctx.drawImage($title, 0, h);
        h += $title.height + 20;
        ctx.drawImage($content, 0, h);
        h += $content.height + 60;
        //ctx.drawImage(log, 10, image.height + $title.height + $content.height + 250, 200, 60);
        //ctx.drawImage($description, 0, $canvas.height - $description.height + 30);
        ctx.strokeStyle = 'rgba(122, 122, 122, 0.5)';
        ctx.setLineDash([5, 6]);
        ctx.moveTo(0, h);
        ctx.lineTo(768, h);
        ctx.stroke();
        
        var log = new Image();
        log.src = config.logo;
        log.onload = function(){
            h += 80;
            ctx.drawImage(log,0,0,log.width,log.height,60,h,200,200/log.width*log.height);
            var qrh = h - 10;
            h += 200/log.width*log.height + 20;
            ctx.drawImage($description, 0, h);
            var qrcode = new Image();
            qrcode.src = config.qrcode;
            qrcode.onload = function(){
                ctx.drawImage(qrcode,0,0,qrcode.width,qrcode.height,603,qrh,115,115/qrcode.width*qrcode.height);
                h += 62;
                var t = ctx.getImageData(0, 0, 768, h);
                $canvas.height = h,
                ctx.putImageData(t,0,0);
                var img = new Image();
                img.src = $canvas.toDataURL('image/jpeg');
                //var radio = config.radio || 0.7;
                //img.width = WIDTH * radio;
                //img.height = HEIGHT * radio;
                //ctx.clearRect(0, 0, $canvas.width, h);
                $canvas.style.display = 'none';
                $container.appendChild(img);
                $container.removeChild($wrapper);
                
                //if (config.callback) {
                //    config.callback($container);
                //}
                //return img.src;
            }

        }
 
      };
    };

    onload();
  }

  function createDom(name, key, value) {
    var display = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'none';
    var $dom = document.createElement(name);
    $dom.setAttribute(key, value);
    $dom.style.display = display;
    $dom.width = WIDTH;
    return $dom;
  }

  function appendChilds(parent) {
    for (var _len = arguments.length, doms = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      doms[_key - 1] = arguments[_key];
    }

    doms.forEach(function (dom) {
      parent.appendChild(dom);
    });
  }

  function drawOneline(canvas, style, content) {
    var ctx = canvas.getContext('2d');
    canvas.height = parseInt(style.font.match(/\d+/), 10) + 20;
    ctx.font = style.font;
    ctx.fillStyle = style.color;
    ctx.textBaseline = 'top';
    var lineWidth = 0;
    var idx = 0;
    var truncated = false;

    for (var i = 0; i < content.length; i++) {
      lineWidth += ctx.measureText(content[i]).width;

      if (lineWidth > canvas.width - 60) {
        truncated = true;
        idx = i;
        break;
      }
    }

    var padding = 30;

    if (truncated) {
      content = content.substring(0, idx);
      padding = canvas.width / 2 - lineWidth / 2;
    }

    if (DEBUG) {
      ctx.strokeStyle = "#6fda92";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    if (style.position === 'center') {
      ctx.textAlign = 'center';
      ctx.fillText(content, canvas.width / 2, 0);
    } else if (style.position === 'left') {
      ctx.fillText(content, padding, 0);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText(content, canvas.width - padding, 0);
    }
  }

  function drawMoreLines(canvas, style, content) {
    var ctx = canvas.getContext('2d');
    var fontHeight = parseInt(style.font.match(/\d+/), 10);

    if (DEBUG) {
      ctx.strokeStyle = "#6fda92";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    ctx.font = style.font;
    ctx.fillStyle = style.color;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    var alignX = 0;

    if (style.position === 'center') {
      alignX = canvas.width / 2;
    } else if (style.position === 'left') {
      ctx.textAlign = 'left';
      alignX = 60;
    } else {
      ctx.textAlign = 'right';
      alignX = canvas.width - 60;
    }

    var lineWidth = 0;
    var lastSubStrIndex = 0;
    var offsetY = 0;

    for (var i = 0; i < content.length; i++) {
      lineWidth += ctx.measureText(content[i]).width;

      if (lineWidth > canvas.width - 120) {
        ctx.fillText(content.substring(lastSubStrIndex, i), alignX, offsetY);
        offsetY += fontHeight * style.lineHeight;
        lineWidth = 0;
        lastSubStrIndex = i;
      }

      if (i === content.length - 1) {
        ctx.fillText(content.substring(lastSubStrIndex, i + 1), alignX, offsetY);
      }
    }
  }

  return {
    init: init
  };
}();