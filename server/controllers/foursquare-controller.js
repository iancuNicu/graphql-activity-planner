const axios = require('axios');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const url = 'https://api.foursquare.com/v2/venues/explore/?';
const detailsUrl = 'https://api.foursquare.com/v2/venues/';

const ForsquareController = {

    getVenueList: function(city='New York', section='coffee'){
        const callParams = [
            `near=${city}`,
            `venuePhotos=1`,
            `client_id= ${client_id}`,
            `client_secret=${client_secret}`,
            `section=${section}`,
            `limit=5`,
            `v=${this.getCurrentDate()}`
        ].join('&');
        return axios.get(url+callParams).then(res => {
            return res.data.response.groups[0].items.map(item =>item.venue)
        }).catch(e => ({
            error:e
        }));
    },

    getPhotos: function(id){
        const callParams = [
            `client_id= ${client_id}`,
            `client_secret=${client_secret}`,
            `limit=10`,
            `v=${this.getCurrentDate()}`
        ].join('&');
        const callUrl = `${detailsUrl}${id}/photos/?${callParams}`;
        return axios.get(callUrl).then(res => {
            return res.data.response.photos.items; 
        }).catch(e => ({
            error:e
        }));
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
              console.log(e);
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