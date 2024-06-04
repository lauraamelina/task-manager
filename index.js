import express from 'express';
import bodyParser from 'body-parser';
import UserRoute from './routes/user.api.route.js'

const app = express();
app.use(bodyParser.json());
app.set('port', 8080);

app.use('/api/', UserRoute)

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
});
