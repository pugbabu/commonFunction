 /**
  * 查找字符串的字节长度
  * 中文算2 英文算1
  * @param {string} str 字符串
  * @return {int}
  */
 function checkTextLength(val) {
    var bytes = 0
    for (var i = 0; i < val.length; i++, ++bytes) {
      if (val.charCodeAt(i) > 255) {
        ++bytes
      }
    }
    return bytes
  }
 
  /**
   * 获取对象类型
   * @private
   * @param {object} object 对象
   * @return {string} 类型
   * 可判断类型：Boolean Number String Function Array Date RegExp Object
   */
  function getParamType(obj) {
    return obj == null ? String(obj) : Object.prototype.toString.call(obj).replace(/\[object\s+(\w+)\]/i, '$1') || 'object';
 
  }
 
  /**
   * 获取DOM对象的值
   * @param {object} obj DOM对象
   * @return {string} 取value或innerText
   */
  function getDomValue(obj) {
    return obj.value || obj.innerText
  }
 
  /**
   * 判断DOM对象是否存在样式类名称
   * @param {dom} element dom对象
   * @param {string} className 样式名称
   * @return {bool}
   */
  function hasClassName(element, className) {
    var elementClassName = element.className;
    return elementClassName.length > 0 && (elementClassName == className || new RegExp('(^|\\s)' + className + '(\\s|$)').test(elementClassName));
  }
 
  /**
   * 为DOM对象增加样式类名称
   * @param {dom} element dom对象
   * @param {string} className 样式名称
   * @return {dom}
   */
  function addClassName(element, className) {
    if (!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) element.className += ' ' + className;
    return element;
  }
 
  /**
   * 为DOM对象删除样式类名称
   * @param {dom} element dom对象
   * @param {string} className 样式名称
   * @return {dom}
   */
  function removeClassName(element, className) {
    if (element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      element.className = element.className.replace(reg, ' ');
    }
    return element;
  }
 
  /**
   * 为dom对象获取选定属性的样式
   * @param {dom} ele dom对象
   * @param {string} prop 属性名称
   * @return 属性样式
   */
  function getStyle(ele, prop) {
    var viewCss = getParamType(document.defaultView).toLowerCase() === 'function' ? document.defaultView() : document.defaultView
    if (viewCss && viewCss.getComputedStyle) {
      var s = viewCss.getComputedStyle(ele, null)
      return s && s.getPropertyValue(prop)
    }
  }
 
  /**
   * 网页内容高度
   * @return {int} 网页内容高度
   */
  function getPageHeight() {
    var h = window.innerHeight && window.scrollMaxY ? window.innerHeight + window.scrollMaxY : Math.max(document.body.scrollHeight, document.body.offsetHeight)
    return Math.max(h, document.documentElement.scrollHeight)
  }
 
  /**
   * 网页内容宽度
   * @return {int} 网页内容宽度
   */
  function getPageWidth() {
    return window.innerWidth && window.scrollMaxX ? window.innerWidth + window.scrollMaxX : Math.max(document.body.scrollWidth, document.body.offsetWidth)
  }
 
  /**
   * 浏览器可视区域高度
   * @return {int} 网可视区域高度
   */
  function getWinHeight() {
    return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight;
  }
 
  /**
   * 浏览器可视区域宽度
   * @return {int} 网可视区域宽度
   */
  function getWinWidth() {
    return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth;
  }
 
  /**
   * 浏览器滚动条距顶部高度
   * @return {int} 滚动条距顶部高度
   */
  function getScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  }
 
  /**
   * 浏览器滚动条距左边宽度
   * @return {int} 滚动条距左边宽度
   */
  function getScrollLeft() {
    return document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
  }
 
  /**
   * 设置浏览器滚动条高度
   * @return {int} 滚动条距顶部高度
   */
  function setScrollTop(h) {
    document.documentElement.scrollTop = h;
    window.pageYOffset = h;
    document.body.scrollTop = h;
  }
 
  /**
   * 设置浏览器滚动条宽度
   * @return {int} 滚动条距左边宽度
   */
  function setScrollLeft(l) {
    document.documentElement.scrollLeft = l;
    window.pageXOffset = l;
    document.body.scrollLeft = l;
  }
 
  /**
   * 获取url中的参数值
   * @param {string} pa 参数名称
   * @return {string} 参数值
   */
  function request(pa) {
    var url = window.location.href.replace(/#+.*$/, ''),
      params = url.substring(url.indexOf('?') + 1, url.length).split('&'),
      param = {};
    for (var i = 0; i < params.length; i++) {
      var pos = params[i].indexOf('='), // 查找name=value
        key = params[i].substring(0, pos),
        val = params[i].substring(pos + 1);
      // 提取value
      param[key] = val;
    }
    return typeof param[pa] === 'undefined' ? '' : decodeURI(param[pa]) // 解决中文、字符串乱码问题
  }
 
  /**
   * 返回a1数组有a2没有的值
   * @param {array} a1 数组对象
   * @param {array} a2 数组对象
   * @return {array} key
   */
  function arrayFilter(a1, a2) {
    var res = []
    for (var i = 0; i < a1.length; i++) {
      if (a2.indexOf(a1[i]) > -1) continue
      res.push(a1[i])
    }
    return res
  }
 
  /**
   * 两个数组的值的交集
   * @param {array} arr 数组
   * @param {array} arr 数组
   * @return {array} key
   */
  function arrayUnique(a1, a2) {
    var res = []
    for (var i = 0; i < a1.length; i++) {
      if (a2.indexOf(a1[i]) > -1) res.push(a1[i])
    }
    return res
  }
 
  /**
   * 校验邮箱地址
   * @param {string} str 字符串
   * @return {bool}
   */
  function isMail(str) {
    return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(str);
  }
 
  /**
   * 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
   * @param {string} str 字符串
   * @return {bool}
   */
  function isTel(str) {
    return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(str);
  }
 
  /**
   * 校验手机号码：必须以数字开头
   * @param {string} str 字符串
   * @return {bool}
   */
  function isMobile(str) {
    return /^1[34578]\d{9}$/.test(str);
  }
 
  /**
   * 校验邮政编码
   * @param {string} str 字符串
   * @return {bool}
   */
  function isZipCode(str) {
    return /^(\d){6}$/.test(str);
  }
 
  /**
   * 是否身份证号码
   * @param {string} str 字符串
   * @return {bool}
   */
  function isIDCard(str) {
    var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (reg.test(str)) {
      console.log(str + ' 是合法的身份证号码');
      return true;
    } else {
      console.log(str + ' 是不合法的身份证号码');
      return false;
    }
  }
 
  /**
   * 获取服务器时间
   * @return {date} Date
   */
  function getSeverDateTime() {
    var xhr = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
    xhr.open('HEAD', window.location.href, true);
    var d = ''
    xhr.onreadystatechange = function () {
      if (xhr.readystate == 4 && xhr.status == 200) {
        d = new Date(xhr.getResponseHeader('Date'))
      }
    }
    xhr.send()
    return d
  }
 
  /**
   * IOS和安卓判断
   */
  function judgeIosOrAndroid() {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    if (isAndroid) {
      return '是安卓'
    } else if (isiOS) {
      return '是ios'
    }
  }
 
 
  /**
   * 判断是否微信
   */
  function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
 
 /**
 * 获取当前时间，格式：yyyy-MM-dd hh:mm:ss
 */
 function getNowFormatDate() {
   var date = new Date();
   var seperator1 = "-";
   var seperator2 = ":";
   var month = date.getMonth() + 1;
   var strDate = date.getDate();
   if (month >= 1 && month <= 9) {
       month = "0" + month;
   }
   if (strDate >= 0 && strDate <= 9) {
       strDate = "0" + strDate;
   }
   var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
           + " " + date.getHours() + seperator2 + date.getMinutes()
           + seperator2 + date.getSeconds();
   return currentdate;
 }
 
 /**
* rem自适应布局计算
* @param {string} document window
*/
function rem(doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}

//阻止微信长按出现复制和在浏览器打开的菜单
function preventContextmenu() {
  document.oncontextmenu = function(e) {
    e.preventDefault()
  }
}

// 函数节流
function throttle(fn, context) {
  clearTimeout(fn.timeoutId)
  fn.timeoutId = setTimeout(() => {
    fn.call(context)
  }, 500);
}

// 移除class
function removeClass (element, className) {
  if (element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    element.className = element.className.replace(reg, ' ')
  }
  return element
}

// 添加class
function addClass (element, className) {
  if (!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) element.className += ' ' + className
  return element
}

// 测试下分支

 //  CSS修改滚动条样式：
 //  ::-webkit-scrollbar {
 // 	width: 10px;
 // 	background-color: #ccc;
 // }
 // ::-webkit-scrollbar-track {
 // 	background-color: #ccc;
 // 	border-radius: 10px;
 // }
 // ::-webkit-scrollbar-thumb {
 // 	background-color: rgb(255, 255, 255);
 // 	background-image: -webkit-gradient(linear, 40% 0%, 75% 84%, from(rgb(77, 156, 65)), color-stop(0.6, rgb(84, 222, 93)), to(rgb(25, 145, 29)));
 // 	border-radius: 10px;
 // }
 