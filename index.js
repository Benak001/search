const express=require('express');
const app=express();
const port=3001;
app.use(express.json());
const bodyparser=require('body-parser')

app.get('/',(req,res)=>{
    res.send('server is running')
})
app.listen(port,()=>{
    console.log(`server is running on port`)
})

const articles=[
     {
        title:'articl1',
        id:1234,
        content:'this is an article it has some content',
        date:new Date()

     },
     {
        title:'example',
        id:1232,
        content:'this is an article it has some  example content',
        date:new Date()

     },
     {
        title:'another',
        id:1234,
        content:'this is an article it has some content',
        date:new Date()

     }
]

app.post('/articles',(req,res)=>{
    const {title,content,tags}=req.body;
    if(!title||!content){
        return res.status(400).json({'Error:no content'});
    }
     const article={
        id:articles.length+1,
        title,
        content,
        date:new Date(),
     }
     articles.push(article);
     return res.status(200).json(article)
})

const searcharticle=articles.map((a)=>{
    return {title:a.title,art:a};
})

app.get('/search',(req,res)=>{
    const {keyword}=req.query;
    const temp=[];
    searcharticle.forEach((x)=>{
        if(x.title.includes(keyword)){
            temp.push(x.art);
        }
    
    });
    return res.json({temp});
});



