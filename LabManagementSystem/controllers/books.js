const Book = require('../models/book');
const user = require('../models/user');
const User = require('../models/user');
const PER_PAGE = 16;



exports.getBooks = async(req, res) => {
    var page = req.params.page || 1;
    const filter = req.params.filter;
    const value = req.params.value;
    const id = req.params.id;
    let searchObj = {};
 
    // constructing search object
    if(filter != 'all' && value != 'all') {
       // fetch books by search value and filter
       searchObj[filter] = value;
    }

    try {
       // Fetch books from database
       const books = await Book
       .find(searchObj)
       .skip((PER_PAGE * page) - PER_PAGE)
       .limit(PER_PAGE);


       // Get the count of total available book of given filter
       const count = await Book.find(searchObj).countDocuments();
      //  let mp;
      //  for(let i = 0; i < ; i++) {
         
      //    mp[books[i]._id] = 0;
      //  }

       User.findById(id)
      //  .populate('bookIssueInfo.book_info.id')
      // .lean()
      //  .populate({ path: 'bookIssueInfo.book_info' })
       .exec((err,doc)=>{
         //  console.log(doc["bookIssueInfo"][0]["_id"])
         //  let mp;
          const mp = new Map();
         for(let i = 0; i < doc["bookIssueInfo"].length; i++) {
            console.log(doc["bookIssueInfo"][i]["_id"])
            let temp = doc["bookIssueInfo"][i]["_id"].toString().trim()
            if(isNaN(mp.get(temp))) mp.set(temp,1);
            else mp.set(temp,mp.get(temp)+1);
         }
         let k = [...mp.keys()];
         let v = [...mp.values()];
         // console.log(mp)
         res.render("books", {
            books: books,
            current: page,
            pages: Math.ceil(count / PER_PAGE),
            filter: filter,
            value: value,
            user: doc,
            takenk: k,
            takenv: v
         })
      })
      //  res.render("books", {
      //     books: books,
      //     current: page,
      //     pages: Math.ceil(count / PER_PAGE),
      //     filter: filter,
      //     value: value,
      //    user: req.user,
      //  })
    } catch(err) {
       console.log(err)
    }
}

exports.findBooks = async(req, res, next) => {
   
   var page = req.params.page || 1;
   const filter = req.body.filter.toLowerCase();
   const value = req.body.searchName;

   // show flash message if empty search field is sent to backend
   if(value == "") {
       req.flash("error", "Searc field is empty. Please fill the search field in order to get a result");
       return res.redirect('back');
   }

   const searchObj = {};
   searchObj[filter] = value;

   try {
      // Fetch books from database
      const books = await Book
      .find(searchObj)
      .skip((PER_PAGE * page) - PER_PAGE)
      .limit(PER_PAGE)

      // Get the count of total available book of given filter
      const count = await Book.find(searchObj).countDocuments();

      res.render("books", {
         books: books,
         current: page,
         pages: Math.ceil(count / PER_PAGE),
         filter: filter,
         value: value,
         user: req.user,
      })
   } catch(err) {
      console.log(err)
   }
}

// find book details working procedure
/*
   1. fetch book from db by id
   2. populate book with associated comments
   3. render user/bookDetails template and send the fetched book
*/

exports.getBookDetails = async(req, res, next) => {
   try {
      const book_id = req.params.book_id;
      const book = await Book.findById(book_id).populate("comments");
      res.render("user/bookDetails", {book: book});
   } catch (err) {
      console.log(err);
      return res.redirect("back");
   }
}