var express=require('express');
var app=express();
var cors=require('cors');
var mongoose=require('mongoose');
mongoose
.connect("mongodb://localhost/Reservation",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('mongodb is up'))
.catch(err=>console.log(err))

var db=mongoose.connection;

var Schema=mongoose.Schema;

let Seats=new Schema({
    seats:Array
})

let bookedSeates=mongoose.model('seats',Seats);


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/display',(req,res)=>{
    bookedSeates.find({},function(err,docs){
        if(err)console.log(err)
        res.send(docs);
    })
})

app.post('/send',(req,res)=>{
    let data=req.body;
    var sData=new bookedSeates();
    db.dropCollection("seats", function (err, result) {
        if(err)console.log(err);
        console.log(result);
    })
    sData.seats=data;
    sData.save(function(err){
        if(err)console.log(err)
    })
})

app.listen(8080,()=>{
    console.log("Server is up and running");
})