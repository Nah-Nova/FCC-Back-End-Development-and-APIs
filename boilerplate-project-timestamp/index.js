sconst express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

// Handle returning a timestamp
app.get('/api/:date?', (req, res) => {
    let date = new Date();
    if (req.params.date) {
        let unixDate = +req.params.date;
        date = isNaN(unixDate) ? new Date(req.params.date) : new Date(unixDate);
        if (!(date instanceof Date) || isNaN(date.getTime())) return res.json({ error: "Invalid Date" });
    }
    return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Create a listener to handle requests
const listener = app.listen(process.env.PORT, () => console.log('Your app is listening on port ' + listener.address().port));