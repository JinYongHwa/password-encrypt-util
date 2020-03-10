var Password = require("./index")


var password = new Password("11@@@test!!!###$$")

//Can't decrypt password (Hash)
var hashPassword = password.getHashPassword("123456")
console.log(hashPassword) //47814c8e288e9f01a232074fbd064201a206e5b0a36d955a2724e589865b9a2f

//encrypt hash with repeat count (more safe)
var hashPasswordWithRepeat = password.getHashPassword("123456", 7) //7 times encrypt repeat
console.log(hashPasswordWithRepeat) //1128e37c59f53accfcea83feebc35b5034a69d9ad74d6257200bf4bb74824bd9

//normal text -> encrypted password (aes-256-cbc)
var encryptedPassword = password.encryptPasswordV2("123456")
console.log(encryptedPassword) //Dg5yvVIWlGufdGnaiAGomA==

//encrypted password ->normal text (aes-256-cbc)
var decryptedPassword = password.decryptPasswordV2(encryptedPassword)
console.log(decryptedPassword) //123456