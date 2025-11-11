"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get comparePassword () {
        return comparePassword;
    },
    get encryptPassword () {
        return encryptPassword;
    },
    get generateHmacSha256Base64 () {
        return generateHmacSha256Base64;
    },
    get generateRandomString () {
        return generateRandomString;
    },
    get generateSha256Base64 () {
        return generateSha256Base64;
    },
    get generateToken () {
        return generateToken;
    }
});
require("dotenv/config");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_wildcard(require("jsonwebtoken"));
const _bcryptjs = /*#__PURE__*/ _interop_require_wildcard(require("bcryptjs"));
const _crypto = /*#__PURE__*/ _interop_require_wildcard(require("crypto"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const encryptPassword = (password)=>{
    return _bcryptjs.hashSync(password, 12);
};
const comparePassword = (hashPassword, password)=>{
    return _bcryptjs.compareSync(password, hashPassword);
};
const generateToken = (payload)=>{
    return _jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};
const generateRandomString = (length = 128)=>{
    // Generate enough random bytes, then slice to desired length
    return _crypto.randomBytes(length).toString("base64") // or "hex"
    .slice(0, length); // ensure max length
};
const generateSha256Base64 = (data)=>{
    let jsonStringHash256 = _crypto.createHash("sha256").update(data, "utf-8").digest();
    let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
    return bufferFromJsonStringHash256.toString("base64");
};
const generateHmacSha256Base64 = (data, secret)=>{
    // Create an HMAC object using SHA256 algorithm and the secret key
    const hmac = _crypto.createHmac("sha256", secret).update(data.toString()).digest();
    // Calculate the digest and encode it in Base64
    let bufferFromHmac256Value = Buffer.from(hmac);
    return bufferFromHmac256Value.toString("base64");
};

//# sourceMappingURL=encrypt.js.map