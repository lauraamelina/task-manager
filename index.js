import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.set('port', 8080);



app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
});
