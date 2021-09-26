const axios = require('axios');



async function apiDataHandler(req, res){

try{
    
    let data = await axios.get("https://ltuc-asac-api.herokuapp.com/allChocolateData");
let filteredData = data.data.map((obj)=>{
    return new FavList(obj);
})
res.send(filteredData);
}catch(error){
res.status(500).send('not found')
}

}



class FavList {
    constructor(obj){
        this.title = obj.title;
        this.imageUrl=obj.imageUrl;

    }
}
module.exports = apiDataHandler ;
