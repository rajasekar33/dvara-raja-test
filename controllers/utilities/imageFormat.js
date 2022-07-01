 const blobtoBase64 = (data) => {
    if (data && data instanceof Array) {
        data.map(user => {
            user.picture = new Buffer.from(user.picture, 'binary').toString()
            return user;
        });
        return data;
    }
}

const base64ToBlob = (file) => {
    return new Buffer.from(file, 'base64')    
}

module.exports = {
    blobtoBase64,
    base64ToBlob
}