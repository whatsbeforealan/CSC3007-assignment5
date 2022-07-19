fetch('https://api.data.gov.sg/v1/environment/psi').then(
    response => {
        response.json().then(
            data =>{
                let tiles = new L.TileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
                    detectRetina: true,
                    maxZoom: 18,
                    minZoom: 11,
                    //Do not remove this attribution
                    attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">' +
                                'New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                });
                let map = new L.Map("map", {
                    center: [1.347833, 103.809357], 
                    zoom: 11,
                    maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3))
                    })
                    .addLayer(tiles);

                keys = Object.keys(data.region_metadata);
                keys.forEach(element => {
                    regionname = String(data.region_metadata[element].name.valueOf())
                    lat = data.region_metadata[element].label_location.latitude	
                    long = data.region_metadata[element].label_location.longitude	

                    var circle = L.circle([lat, long], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 1000
                    }).addTo(map); 
                    circle.bindPopup("PSI 24HR Readings : " + data.items[0].readings['psi_twenty_four_hourly'][regionname]);
                });
            }
        )
    }
)