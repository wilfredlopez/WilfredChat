
var generateMessage = (from, text, createdAt) =>{
    return{from,
    text,
    createdAt
    //createdAt: new Date().getTime()
    };
};


var generateLocationMessage = (from, long, lat, createdAt) => {
        return {
            from: from,
            url: `https://www.google.com/maps?=${long},${lat}`,
            createdAt
        };
};


module.exports = {generateMessage,generateLocationMessage};