const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

const routes = {
    '/album': require('./routes/album.js'),
    '/albumrating': require('./routes/albumrating.js'),
    '/albumreview': require('./routes/albumreview.js'),
    '/artist': require('./routes/artist.js'),
    '/concert': require('./routes/concert.js'),
    '/country': require('./routes/country.js'),
    '/follow': require('./routes/follow.js'),
    '/genre': require('./routes/genre.js'),
    '/playlist': require('./routes/playlist.js'),
    '/playlistsong': require('./routes/playlistsong.js'),
    '/role': require('./routes/role.js'),
    '/song': require('./routes/song.js'),
    '/songgenre': require('./routes/songgenre.js'),
    '/songrating': require('./routes/songrating.js'),
    '/songreview': require('./routes/songreview.js'),
    '/songtag': require('./routes/songtag.js'),
    '/tag': require('./routes/tag.js'),
    '/user': require('./routes/user.js'),
    '/usersettings': require('./routes/usersettings.js'),
    'concertartist': require('./routes/concertartist.js')
};

Object.entries(routes).forEach(([path, route]) => {
    app.use(path, route);
});

module.exports = app;