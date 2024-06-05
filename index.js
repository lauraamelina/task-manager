import express from 'express';
import bodyParser from 'body-parser';
import UserRoute from './routes/user.api.route.js'
import TaskRoute from './routes/task.api.route.js'
import StatusRoute from './routes/status.api.route.js'

const app = express();
app.use(bodyParser.json());
app.set('port', 8080);

app.use('/users/', UserRoute)
app.use('/task/', TaskRoute)
app.use('/status/', StatusRoute)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
});
