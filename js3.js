const express = require('express')
const app = express()

app.set('view engine','ejs');

//opening home h2.html page using express
app.use(express.static(__dirname+'/public'))

app.set('port',process.env.PORT || 5000)

var Datastore=require('nedb')
var db=new Datastore({filename:'store3.db',autoload:true})


app.get('/',function(req,res){
	res.render('home')
})

app.get('/login',function(req,res){
	res.render('signup')
})

app.get('/personal/:name',function(req,res){
	/*db.find({'email':req.query.email,'password':req.query.pwd},function(err,result){
		if(resu1t.length>0){			
				res.render('personal',{result:result})
			}
	})*/
	var a=req.params.username
	db.find({username:a},function(err,result){
		console.log(result);
		if(result.length!=0){
			res.render('personal',{result:result})
		}else{
			res.send('no user found with '+a)
		}
	})
	
})

app.get('/signupsubmit',function(req,res){
	var d={
		'name':req.query.firstname,
		'email':req.query.email,
		'username':req.query.username,
		'password':req.query.pwd,
		
	}
	db.insert(d,function(err,newdoc){
		res.render('signup')
	})
})

app.get('/loginsubmit',function(req,res){
	db.find({'email':req.query.email,'password':req.query.pwd},function(err,resu1){
		if(resu1.length>0){
			db.find({},function(err,result){
				res.render('profile',{results:result
				})
			})
		}
		else{
		res.send('email or password is wrong')
	}
	})
})


app.listen(app.set('port'), function () {
  console.log('Example app listening on port 5000!')
})