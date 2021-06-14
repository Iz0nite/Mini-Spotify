
let token = "BQCpISx-bQCkbLXGQBb5Hfh496UwuP1SqHeP0xPFJlfa8KV3L8gCY_2EOuR6C055dioRftlWAyU0TbmJ9LH2dxLFr_Oar10CcJL_HM_dX2V2jOY5TSJq9r96XUv_owTKoxvtfPZwJxSY1A";

Vue.component('SoundsList', {
    props: ['ind','sound','duration','track'],
    template: '<li v-on:click="readTrack(track.url)"><div><p>{{ ind.number }}</p><p>{{ sound.text }}</p></div><p>{{ duration.time }}</p></li>'
})

let searchBar = new Vue({
    el: '#searchBar',
    data:{
        message: ""
    }

})

let album1 = new Vue({
    el: '#album1',
    data: {
        seen: false,
        urlImage: "",
        albumTitle: "",
        albumArtist: "",
        albumId: "",
        soundsList: []
    }
})

let album2 = new Vue({
    el: '#album2',
    data: {
        seen: false,
        urlImage: "",
        albumTitle: "",
        albumArtist: "",
        albumId: "",
        soundsList: []
    }
})

let album3 = new Vue({
    el: '#album3',
    data: {
        seen: false,
        urlImage: "",
        albumTitle: "",
        albumArtist: "",
        albumId: "",
        soundsList: []
    }

})

function search (message){
    album1.soundsList = [];
    album2.soundsList = [];
    album3.soundsList = [];
    album1.seen = true;
    album2.seen = true;
    album3.seen = true;

    let res = fetch('https://api.spotify.com/v1/search?q='+message+'&type=album',{
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json()).then((data) => {
            // console.log(data.albums.items[0].images[1].url);
            album1.albumTitle  = data.albums.items[0].name;
            album1.albumArtist = data.albums.items[0].artists[0].name;
            album1.urlImage = data.albums.items[0].images[1].url
            let albumId = data.albums.items[0].uri
            albumId=albumId.split(':');
            album1.albumId = albumId[2];
            album2.albumTitle = data.albums.items[1].name;
            album2.albumArtist = data.albums.items[1].artists[0].name;
            album2.urlImage = data.albums.items[1].images[1].url
            albumId = data.albums.items[1].uri
            albumId=albumId.split(':');
            album2.albumId = albumId[2];
            album3.albumTitle = data.albums.items[2].name;
            album3.albumArtist = data.albums.items[2].artists[0].name;
            album3.urlImage = data.albums.items[2].images[1].url
            albumId = data.albums.items[2].uri
            albumId=albumId.split(':');
            album3.albumId = albumId[2];
        })

    setTimeout(resize ,500);

}

function showSounds(albumId,albumObj){
    album1.soundsList = [];
    album2.soundsList = [];
    album3.soundsList = [];
    let res = fetch('https://api.spotify.com/v1/albums/'+albumId+'/tracks?limit=50',{
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json()).then((data) => {
        console.log(data.items.length);
        let ind = data.items.length
        let duration;
        let minute;
        let seconds;
        for (let i = 0; i<ind; i++){
            duration = data.items[i].duration_ms;
            minute = parseInt((duration/1000)/60);
            seconds = parseInt((duration/1000)%60);
            console.log(data.items[i].track_number);
            albumObj.soundsList.push({number: data.items[i].track_number, text: data.items[i].name, time: minute+":"+seconds, url: data.items[i].preview_url});
        }
    })
    setTimeout(resize ,500);
}

function readTrack(urlTrack){
    Howler.stop();
    let  stream  =  new  Howl ( {
        src : urlTrack ,
        html5: true,
        ext : ['mp3'] ,
    });

stream.play();
}

function resize(){

    let searchBarAndAlbumsDiv = document.getElementById("searchBar&Albums");
    let allOlDiv = document.getElementsByClassName("olTrack");
    let height = searchBarAndAlbumsDiv.offsetHeight;
    let margin = parseInt(getStyle(allOlDiv[0],"margin-top"))*2;
    console.log("margin: "+margin);
    height+= margin;
    for (let i = 0; i < allOlDiv.length; i++){
        console.log(allOlDiv[i].offsetHeight);
        height+= allOlDiv[i].offsetHeight;
    }

    let containerDiv = document.getElementById("container");

    containerDiv.style.height = height+"px";

}

function getStyle(e, styleName)
{
    let styleValue = "";

    if(document.defaultView && document.defaultView.getComputedStyle)
        styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
    else if(e.currentStyle)
    {
        styleName = styleName.replace(/\-(\w)/g, function(strMatch, p1)
        {
            return p1.toUpperCase();
        });

        styleValue = e.currentStyle[styleName];
    }

    return styleValue;
}
