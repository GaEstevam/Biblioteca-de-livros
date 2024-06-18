import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response } from 'express';
import { Book } from './entity/Book';

createConnection().then(async connection => {
  const app = express();
  app.use(express.json());

  app.get('/books', async (req: Request, res: Response) => {
    const books = await connection.getRepository(Book).find();
    res.json(books);
  });

  app.get('/books/:ISBN', async (req: Request<{ ISBN: string }>, res: Response) => {
    const book = await connection.getRepository(Book).findOne({ where: { ISBN: req.params.ISBN } });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });

  app.post('/books', async (req: Request, res: Response) => {
    const book = await connection.getRepository(Book).create(req.body);
    const results = await connection.getRepository(Book).save(book);
    res.send(results);
  });

  app.put('/books/:ISBN', async (req: Request<{ ISBN: string }>, res: Response) => {
    const book = await connection.getRepository(Book).findOne({ where: { ISBN: req.params.ISBN } });
    if (book) {
      connection.getRepository(Book).merge(book, req.body);
      const results = await connection.getRepository(Book).save(book);
      res.send(results);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });

  app.delete('/books/:ISBN', async (req: Request<{ ISBN: string }>, res: Response) => {
    const results = await connection.getRepository(Book).delete(req.params.ISBN);
    if (results.affected) {
      res.json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}).catch(error => console.log(error));
