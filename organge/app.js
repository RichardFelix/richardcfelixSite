var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.locals.pretty = true;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/me', (req, res) =>{
  res.render('me');
});

app.get('*', (req, res) =>{
  res.render('index');
});

app.listen(port, ()=>{
  console.log(`app running on port ${port}`);
});
