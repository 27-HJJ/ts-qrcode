"use strict";
function unicodeFormat8(code) {
  var c0, c1, c2;
  if (code < 128) {
    return [code];
  } else if (code < 2048) {
    c0 = 192 + (code >> 6);
    c1 = 128 + (code & 63);
    return [c0, c1];
  } else {
    c0 = 224 + (code >> 12);
    c1 = 128 + (code >> 6 & 63);
    c2 = 128 + (code & 63);
    return [c0, c1, c2];
  }
}
function getUTF8Bytes(string) {
  var utf8codes = [];
  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i);
    var utf8 = unicodeFormat8(code);
    for (var j = 0; j < utf8.length; j++) {
      utf8codes.push(utf8[j]);
    }
  }
  return utf8codes;
}
function _empty(v) {
  let tp = typeof v, rt = false;
  if (tp == "number" && String(v) == "") {
    rt = true;
  } else if (tp == "undefined") {
    rt = true;
  } else if (tp == "object") {
    if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null)
      rt = true;
  } else if (tp == "string") {
    if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]")
      rt = true;
  } else if (tp == "function") {
    rt = false;
  }
  return rt;
}
exports._empty = _empty;
exports.getUTF8Bytes = getUTF8Bytes;
