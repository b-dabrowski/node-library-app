const _ = require('lodash');
const User = require('../api/user/userModel');
const Category = require('../api/category/categoryModel');
const Author = require('../api/author/authorModel');
const Book = require('../api/book/bookModel');
const logger = require('./logger');

logger.log('Seeding the Database');

const categories = [
  { name: 'Science fiction' },
  { name: 'Satire' },
  { name: 'Drama' },
  { name: 'Action' },
  { name: 'Adventure' },
  { name: 'Romance' },
  { name: 'Mystery' },
  { name: 'Horror' },
];

const authors = [
  { name: 'James', surname: 'Willms' },
  { name: 'Bernadine', surname: 'Jerde' },
  { name: 'Madilyn', surname: 'Shields' },
  { name: 'Jane', surname: 'Corwin' },
  { name: 'Reta', surname: 'Schuster' },
  { name: 'Mark', surname: 'Bruen' },
  { name: 'Catalina', surname: 'Kemmer' },
  { name: 'Filomena', surname: 'Orn' },
  { name: 'Leon', surname: 'Thompson' },
];

const books = [
  { title: 'Qui officiis tenetur', description: 'Repellat voluptas sapiente placeat quod ipsa pariatur numquam consequatur. Nihil distinctio culpa architecto ullam ipsa doloribus et qui. Sapiente sed fuga rerum culpa alias. Iusto nesciunt consequuntur reiciendis corporis dolorem quod fuga minus. Voluptas dolores consequatur voluptatum consequatur dolores maiores facere. Incidunt aut tenetur placeat sed. Et dolorem sint atque. Sint mollitia id quod. Vero quod maiores in dolore. Qui quia voluptas sequi possimus. Facilis in quaerat voluptates. Alias ducimus quis temporibus reprehenderit eum veritatis nobis ut. Saepe odio ullam in sit. Eligendi quos voluptatem veritatis et suscipit occaecati nulla dolor veritatis. Autem quia magni quo magnam fugiat accusamus deserunt blanditiis. Suscipit rerum laborum et nulla molestias eaque voluptate. Reiciendis rerum corrupti nemo molestiae praesentium incidunt.' },
  { title: 'Ad laudantium magni', description: 'Eos quisquam vel perferendis enim quos aut sit reprehenderit eligendi. Molestiae est et. Id odit veritatis id non perspiciatis magni eligendi vero eveniet. Sint quasi quos consectetur. Sed autem quia accusantium debitis et. Et expedita fuga veritatis et. Autem modi aut repudiandae sed debitis et rem. Consectetur odio facere quis sint aspernatur. Sed facere ab. Nostrum ut ducimus et earum rerum recusandae cumque. Et aperiam voluptas veniam aut. Dolore ut ipsa recusandae sit quas. Consequuntur aut voluptatibus eaque illum. Ipsum aut corporis repellat aut aut ea nostrum.' },
  { title: 'Adipisci molestiae sit', description: 'Quisquam repellendus exercitationem qui ea sit aliquam illum. Officia harum saepe pariatur aliquid quo ducimus velit voluptas. Omnis corporis corporis aperiam veritatis. Officiis iste molestiae inventore. Fuga quae enim aut. Incidunt rerum sint ipsa nihil ipsum omnis. Reprehenderit nihil quas et doloremque et molestiae. Laborum at id labore. Odio explicabo molestiae. Tempora recusandae mollitia.' },
  { title: 'Odit aut fuga', description: 'Vitae reprehenderit voluptatibus aspernatur. Magni at odit tempora porro. Et quasi dolorem eum quis ut. Neque iusto saepe quia nemo perspiciatis. Perferendis rem eaque harum libero blanditiis pariatur. Et dolorem voluptas magni. Quae quidem atque nam aut. Est quibusdam quam soluta quia quidem eligendi omnis. Pariatur qui facilis sequi quia consequatur. Libero blanditiis et dolorum nam autem. Ullam cupiditate ipsum magni adipisci rerum quam. Magnam ullam omnis commodi atque doloribus quae omnis dicta. Vero repellat maxime cumque esse minus quas. Perferendis nihil earum iste asperiores qui nulla. Facere in numquam est eveniet.' },
  { title: 'Aliquid qui magni', description: 'Eius ex deserunt qui dolor ea quod. Aspernatur quibusdam mollitia placeat non. Et dignissimos sapiente ea. Quas ullam sapiente rerum omnis. Id aspernatur voluptatibus. Cum eveniet distinctio sint. Reprehenderit consectetur aspernatur. Distinctio asperiores itaque ratione et nihil ut. Aut sit laudantium illo et nobis sit consectetur tempora error. Qui expedita harum. At ea ad nemo sed consequuntur vel. Possimus minus quod magnam. Vero assumenda ad voluptas dolorum ab. Assumenda et sunt ea et repellendus aperiam necessitatibus a qui.' },
  { title: 'Consequatur sunt corporis', description: 'Eum quia nisi sed. Autem voluptatem ullam est fugit dignissimos recusandae adipisci in. Cupiditate non explicabo. Velit vero in. Nostrum excepturi architecto rerum vitae sint. Sequi corrupti nesciunt ut et est doloremque expedita quam. Ut aliquam ut totam maiores iusto et nihil sed. Non et id quasi. Eos porro eligendi. Rerum commodi repellendus aut laborum sunt. Alias rerum voluptates. At architecto consequuntur sint doloremque exercitationem magni. Repellat optio optio perspiciatis nobis culpa dolor. Consequatur consectetur distinctio enim ut omnis pariatur. Nulla quo ut sit ducimus ut repudiandae.' },
  { title: 'Praesentium est beatae', description: 'Quia quam reiciendis. Adipisci dolorem qui sunt ea deleniti laborum. Velit aut ratione. Suscipit sed beatae debitis autem provident atque. Quia ab mollitia voluptas quis enim nam. Assumenda odit voluptatem totam eum vel ducimus consectetur. Distinctio assumenda illo sit enim fuga. Voluptas mollitia et quisquam omnis non. Pariatur dignissimos placeat consequatur nam quibusdam ut. Et reprehenderit qui similique. Consequuntur minus quae mollitia in blanditiis voluptates sunt perspiciatis. Ad perspiciatis quos voluptatem asperiores modi odit nam.' },
  { title: 'Recusandae quae quo', description: 'Consectetur odit minima itaque et rerum id iusto. Quo perferendis quia molestiae aut in autem. Neque deserunt quia ipsum minima. Voluptas reprehenderit accusamus qui nisi eveniet fugit eum illum. Eligendi blanditiis est fugiat sint repudiandae. Sit cumque in. Et rem illo qui repellat temporibus omnis ut non. Quae quibusdam quia sapiente aspernatur. Pariatur et totam sequi. Illo ad facilis fugit. Modi qui totam quos saepe quia. Est sit temporibus non ullam voluptates. Nam aut omnis unde quod quo sed. Qui provident et eos est. Et optio omnis qui rerum atque maiores eveniet. Et provident ab consequatur quia adipisci autem odit.' },
  { title: 'Minus dolore quaerat', description: 'Velit aut quia consequuntur necessitatibus sint. Quia laborum labore voluptatem. Voluptatem porro sapiente natus ea temporibus. Qui vero aliquam neque dignissimos quam impedit eum voluptates perspiciatis. Id ullam quae provident ab reiciendis libero quaerat. Odio et dolor cupiditate sunt omnis in tenetur ut soluta. Qui temporibus ad hic labore qui reprehenderit doloribus maiores et. Cumque mollitia facilis rerum et illum. Corporis sint eum ut quia reiciendis ut iure autem quo. Porro dolore reprehenderit quibusdam id modi id. Architecto saepe sunt quis corrupti. Recusandae dolor minus soluta excepturi ea nesciunt consectetur numquam. Quia dolore perferendis illo. Voluptas maiores quis est molestiae fugit et sit molestias reprehenderit.' },
];

const users = [
  { username: 'user1', password: 'test' },
  { username: 'user2', password: 'test' },
  { username: 'user3', password: 'test', role: 'admin' }
];

const createDoc = (model, doc) => new Promise((resolve, reject) => {
  new model(doc).save((err, saved) => (err ? reject(err) : resolve(saved)));
});

const cleanDB = () => {
  logger.log('... cleaning the DB');
  const cleanPromises = [Author, Category, Book, User]
    .map(model => model.remove().exec());
  return Promise.all(cleanPromises);
};

const createCategories = (data) => {
  const promises = categories.map(category => createDoc(Category, category));

  return Promise.all(promises)
    .then(createdCategories => _.merge({ categories: createdCategories }, data || {}));
};

const createAuthors = (data) => {
  const promises = authors.map(author => createDoc(Author, author));

  return Promise.all(promises)
    .then(createdAuthors => _.merge({ authors: createdAuthors }, data || {}));
};

const createBooks = (data) => {  
  const newBooks = books.map((book) => {
    book.author = data.authors[Math.floor(Math.random() * 9)]._id;
    book.category = data.categories[Math.floor(Math.random() * 8)]._id;
    return createDoc(Book, book);
  });

  return Promise.all(newBooks)    
    .then(createdBooks => _.merge({ books: createdBooks }, data || {}));
};

const createUsers = function(data) {

  const newUsers = users.map(user => createDoc(User, user));

  return Promise.all(newUsers)
    .then(createdUsers => _.merge({ users: createdUsers }, data || {}));
};

cleanDB()  
  .then(createAuthors)
  .then(createCategories)
  .then(createBooks)
  .then(createUsers)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
