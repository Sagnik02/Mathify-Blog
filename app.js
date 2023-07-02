const express=require('express')
const mongoose=require('mongoose')
const Blog=require('./models/blog')
//expresss app
const app=express()

const dburl='mongodb://127.0.0.1:27017/NodeProjects'

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
        app.listen(3000);
    })
    .catch((error) => {
      console.error('Failed to connect to the MongoDB database', error);
    });


//register view engine
app.set('view engine','ejs');


app.use(express.urlencoded({extended:true}));
//listen for request

app.get('/add-blog',(req,res)=>{
    const blog=new Blog({
        title:'New Blog 2',
        snippet:'About',
        body:'About More'
    })
    blog.save()
    .then((result)=>{
        res.send(result)
    })
})

app.get('/all-blogs',(req,res)=>{
    Blog.find().then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});


app.get('/single-blog',(req,res)=>{
    Blog.findById('6499837de99c535882af3c96').then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});


app.get('/',(req,res)=>{
    res.redirect('/blogs')
});

app.get('/about',(req,res)=>{
    
    res.render('about',{title:'About'})
});

app.get('/blogs',(req,res)=>{
    Blog.find().then((result)=>{
       res.render('index',{title:'All Blogs',blogs: result}) 
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create a new blog'}) 
});

app.post('/blogs',(req,res)=>{
    console.log(req.body);
    const blog=new Blog(req.body);

    blog.save().then((result)=>{
        res.redirect('/blogs')
    })
})




app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    //console.log(id)
    Blog.findById(id)
        .then((result)=>{
            res.render('details',{blog: result, title:'Blog Details'})
        })
});







//404
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})

})

