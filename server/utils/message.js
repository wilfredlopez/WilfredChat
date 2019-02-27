var generateMessage = (from, text) =>{
    return{from,
    text,
    createdAt: new Date().getTime()
    };
};


var generateLocationMessage = (from, long, lat) => {
        const google = "https://www.google.com/maps?";
        return {
            from: from,
            url: `https://www.google.com/maps?=${long},${lat}`,
            createdAt: new Date().getTime()
        };
};


module.exports = {generateMessage,generateLocationMessage};