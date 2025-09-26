const express = require('express');
const { verifyToken } = require('./modules/serviceToken');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const routes = {
    '/album': require('./routes/album.js'),
    '/album-rating': require('./routes/albumrating.js'),
    '/album-review': require('./routes/albumreview.js'),
    '/artist': require('./routes/artist.js'),
    '/concert': require('./routes/concert.js'),
    '/country': require('./routes/country.js'),
    '/follow': require('./routes/follow.js'),
    '/genre': require('./routes/genre.js'),
    '/playlist': require('./routes/playlist.js'),
    '/playlist-song': require('./routes/playlistsong.js'),
    '/role': require('./routes/role.js'),
    '/song': require('./routes/song.js'),
    '/song-genre': require('./routes/songgenre.js'),
    '/song-rating': require('./routes/songrating.js'),
    '/song-review': require('./routes/songreview.js'),
    '/song-tag': require('./routes/songtag.js'),
    '/tag': require('./routes/tag.js'),
    '/user': require('./routes/user.js'),
    '/user-settings': require('./routes/usersettings.js'),
    '/concert-artist': require('./routes/concertartist.js'),
    "/song-artist": require("./routes/songartist.js"),
    "/redis": require('./redis/redisRoutes')
};

Object.entries(routes).forEach(([path, route]) => {
    app.use(path, route);
});

// Health Check
app.get('/health', verifyToken('apiGateway'), (req, res) => {
    res.status(200).send('Service is healthy');
});

module.exports = app;