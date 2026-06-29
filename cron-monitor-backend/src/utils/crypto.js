const crypto = require("crypto");

// Generates  a key hash, prefix, and rawkey

function generateapiKey(){
    const prefix= "cm_live_";
    
    const randombytes = crypto.randomBytes(32).toString('base64url');

    const rawkey = `${prefix}${randombytes}`
    const keyhash = crypto.createHash('sha256').update(rawkey).digest('hex');

    return {
        rawkey,
        prefix,
        keyhash
    }

}

module.exports = {generateapiKey}