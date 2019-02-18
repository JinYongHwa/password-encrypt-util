var crypto = require('crypto')
var Buffer = require('buffer').Buffer
var fs = require("fs");


/*객체생성자
Options
secretKey 저장파일경로(Salt)
repeat encryptPath
*/

function Password(options) {
  if (typeof options == "object") {
    this.options = options;
  } else if (typeof options == "string") {
    this.options = {}
    this.options.secretKey = options
  }
}

Password.prototype.getSecretKey = function() {

  return this.options.secretKey;
}

//대칭키 암호화
Password.prototype.encryptPassword = function(password) {
  var SECRET_KEY = this.getSecretKey()
  var ENCODING = 'base64'
  var text = password
  var cipher = crypto.createCipher('aes-256-cbc', SECRET_KEY)
  var cryptedPassword = cipher.update(text, 'utf8', ENCODING)
  cryptedPassword += cipher.final(ENCODING)
  return cryptedPassword
}
//대칭키 복호화
Password.prototype.decryptPassword = function(password) {
  var cryptedPassword = ""
  try {
    var SECRET_KEY = this.getSecretKey()
    var ENCODING = 'base64'
    var text = password
    var cipher = crypto.createDecipher('aes-256-cbc', SECRET_KEY)
    cryptedPassword = cipher.update(text, ENCODING, 'utf8')
    cryptedPassword += cipher.final("utf8")
  } catch (e) {
    console.error(e)
    return null;
  }
  return cryptedPassword
}

//복호화 불가능한 패스워드
Password.prototype.getHashPassword = function(password, repeat) {
  var repeat = repeat || 1
  var tmppw = this.getSecretKey() + password + this.getSecretKey();
  for (var i = 0; i < repeat; i++) {
    tmppw = crypto.createHash('sha256').update(tmppw).digest("hex");
  }
  return tmppw
}


module.exports = Password;