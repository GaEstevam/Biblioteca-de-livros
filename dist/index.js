"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const Book_1 = require("./entity/Book");
// Conexão com o banco de dados
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // CRUD endpoints
    // Listar todos os livros
    app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const books = yield connection.getRepository(Book_1.Book).find();
        res.json(books);
    }));
    // Obter um livro específico
    app.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield connection.getRepository(Book_1.Book).findOne({ where: { ISBN: parseInt(req.params.id, 10) } });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    }));
    // Criar um novo livro
    app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = connection.getRepository(Book_1.Book).create(req.body);
        const result = yield connection.getRepository(Book_1.Book).save(book);
        res.json(result);
    }));
    // Atualizar um livro existente
    app.put('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield connection.getRepository(Book_1.Book).findOne({ where: { ISBN: parseInt(req.params.id, 10) } });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        connection.getRepository(Book_1.Book).merge(book, req.body);
        const result = yield connection.getRepository(Book_1.Book).save(book);
        res.json(result);
    }));
    // Deletar um livro
    app.delete('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield connection.getRepository(Book_1.Book).delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted' });
    }));
    // Iniciar o servidor
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})).catch((error) => console.log(error));
