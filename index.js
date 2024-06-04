import express from 'express';
import bodyParser from 'body-parser';
import UserRoute from './routes/user.api.route.js'
import TaskRoute from './routes/task.api.route.js'

const app = express();
app.use(bodyParser.json());
app.set('port', 8080);

app.use('/api/', UserRoute)
app.use('/task/', TaskRoute)

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
});
