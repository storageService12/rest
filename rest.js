const express =require('express');
const Joi=require('joi');
const app=express();
const bodyParser=require('body-parser');
app.use(express.json());
const books=[{title:'The Lord of the Rings',author:'J.R.R. Tolkien',id:1},
    {title:'War and Peace',author:'Leo Tolstoy',id:2},
    {title:'The Great Gatsby',author:'F. Scott Fitzgerald',id:3},
    {title:'To Kill a Mockingbird',author:'Harper Lee',id:4},
    {title:'Crime and Punishment',author:'Fyodor Dostoevsky',id:5},
    {title:'Jane Eyre',author:'Charlotte Brontë',id:6},
    {title:'1984',author:'George Orwell',id:7},
    {title:'Pride and Prejudice',author:'Jane Austen',id:8},
    {title:'The Catcher in the Rye',author:'J.D. Salinger',id:9},
    {title:'Brave New World',author:'Aldous Huxley',id:10}
];
app.get('/',(req,res)=>{res.send('<h1 style="text-align:center;font-family:Malgun Gothic;color:red;background-color:lightblue">REST APIs are so much fun - 22IT128,22IT051,22IT132</h2>');});
app.get('/api/books',(req,res)=>{res.send(books);});
app.get('api/books/:id',(req,res)=>{const book=books.find(c=>c.id ===parseInt(req.params.id));
  if (!book){
    res.status(404).send('<h2 style="font-family:Malgun Gothic;">The given id is invalid</h2>');}
    res.send(book);
  }  
);
const schema =Joi.object({
    title:Joi.string().required(),
    author:Joi.string().required()
});
app.post('/api/books',(req,res)=>{
    const {error}=schema.validate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
    }
    const {title,author}=req.body;
    const newBook={
        title,author,id:books.length+1
    };
    books.push(newBook);
    res.send(newBook);

});
app.put('/api/books/:id',(req,res)=>{
  const{title,author}=req.body;
  const book=books.find(c=>c.id ===parseInt(req.params.id));
  if (!book){
    res.status(404).send('<h2 style="font-family:Malgun Gothic;">The given id is invalid</h2>');}

book.title=title;
book.author=author;
res.send(book);}
);
app.delete('/api/books/:id',(req,res)=>{
    const book=books.findIndex(c=>c.id ===parseInt(req.params.id));
    if (book===-1){
        res.status(404).send('<h2 style="font-family:Malgun Gothic;">The given id is invalid</h2>');
    }
    books.splice(books,1);
    res.send(books[book]);
});
const port=process.env.PORT || 8080;
app.listen(port,()=>{console.log(`Listening on port ${port}..`);});
