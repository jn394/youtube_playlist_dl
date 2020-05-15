const fs = require('fs');
const ytdl = require('ytdl-core');
const ytlist = require('youtube-playlist');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

const url = 'https://www.youtube.com/playlist?list=PLXcb8WgPo0RGW0ozs__AsufvuE1bZn5Ry'; // YOUTUBLE PLAYLIST URL

let name;
let playlist;

ytlist(url, 'url').then(res => {
    // console.log(res);
    /* Object
    { data:
     { playlist:
        [ 'https://youtube.com/watch?v=bgU7FeiWKzc',
          'https://youtube.com/watch?v=3PUVr8jFMGg',
          'https://youtube.com/watch?v=3pXVHRT-amw',
          'https://youtube.com/watch?v=KOVc5o5kURE' ] } }
     */
    name = res.data.name;
    playlist = res.data.playlist;
}).then(() => {
    playlistSetup(playlist);
})

async function playlistSetup(playlist) {
    let count = [];
    console.log('-------------------STARTING DOWNLOAD-------------------');
    for (let i = 0; i < playlist.length; i++) {
        let fullTitle = name + ' ' + (i + 1) + '.mp4';
        await downloadVideo(playlist[i], fullTitle);
        count.push(i)
    }

    Promise.all(count).then(() => {
        console.log("-------------------All VIDEOS HAVE BEEN DOWNLOADED-------------------");
    });
}

async function downloadVideo(url, fullTitle) {
    return new Promise(resolve => {
        ytdl(url)
            .pipe(fs.createWriteStream(fullTitle))
            .on('finish', function () {
                console.log('-------------------FINISHED ' + fullTitle + '-------------------');
                resolve();
            });
    });
}
