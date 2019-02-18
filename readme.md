
## Install
```
npm install  password-encrypt-util
```

## Example
``` javascript
var Password = require("password-encrypt-util")


//construct with salt
var password = new Password("11@@@test!!!###$$")

//Can't decrypt password (Hash)
var hashPassword = password.getHashPassword("123456")
console.log(hashPassword) //47814c8e288e9f01a232074fbd064201a206e5b0a36d955a2724e589865b9a2f

//normal text -> encrypted password (aes-256-cbc)
var encryptedPassword = password.encryptPassword("123456")
console.log(encryptedPassword) //Dg5yvVIWlGufdGnaiAGomA==

//encrypted password ->normal text (aes-256-cbc)
var decryptedPassword = password.decryptPassword(encryptedPassword)
console.log(decryptedPassword) //123456
```
