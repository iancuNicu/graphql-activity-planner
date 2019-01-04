const axios = require('axios');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const url = 'https://api.foursquare.com/v2/venues/search/?';
const detailsUrl = 'https://api.foursquare.com/v2/venues/';

const ForsquareController = {

    getVenueList: function(city='New York', section='coffee'){
        const callParams = [
            `near=${city}`,
            `client_id= ${client_id}`,
            `client_secret=${client_secret}`,
            `section=${section}`,
            `limit=5`,
            `v=${this.getCurrentDate()}`
        ].join('&');
        return axios.get(url+callParams).then(res => {
            return res.data.response.venues;
        }).catch(e => {
            return e;
        });
    },

    getVenueDetails: function(id){
        const params = [
            `client_id=${client_id}`,
            `client_secret=${client_secret}`,
            `v=${this.getCurrentDate()}`
          ].join('&');
          return axios.get(detailsUrl + id + '?' + params).then(res => {
              return res.data.response.venue;
          }).catch(e => {
              return e;
          });
    },
    
    getCurrentDate: () => {
        const date = new Date();
        const {year, month, day} = {
                                    year:date.getFullYear(),
                                    month:date.getMonth()+1,
                                    day: date.getDay()-1
                                   }
            const strDay = day < 10 ? `0${day}` : `{${day}}`;
            const strMonth = month < 10 ? `0${month}` : `${month}`;
            return `${year}${strMonth}${strDay}`                      
    }

}

module.exports = ForsquareController;