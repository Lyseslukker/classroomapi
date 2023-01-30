

const infoEncryptDecrypt = () => {
    return new Promise((resolve, reject) => {
        var Crypto = require('crypto');
        var secret_key = 'fd85b494-aaaa';
        var secret_iv = 'smslt';
        var encryptionMethod = 'AES-256-CBC';
        var key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0, 32);
        var iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0, 16);
        var encryptedMessage = encrypt_string("hello", encryptionMethod, key, iv);

        console.log(encryptedMessage); // output : L2dOZjlDVmxoSDNWdmpVMkNGd0JEdz09

        var decrptMessage = decrypt_string(encryptedMessage, encryptionMethod, key , iv);

        console.log(decrptMessage);  //output : hello

        function encrypt_string(plain_text, encryptionMethod, secret, iv) {
            var encryptor = Crypto.createCipheriv(encryptionMethod, secret, iv);
            var aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
            return Buffer.from(aes_encrypted).toString('base64');
        };

        function decrypt_string(encryptedMessage, encryptionMethod, secret, iv) {
            const buff = Buffer.from(encryptedMessage, 'base64');
            encryptedMessage = buff.toString('utf-8');
            var decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv);
            return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8');
        };

    })
}