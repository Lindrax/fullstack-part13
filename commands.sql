CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0);

INSERT INTO blogs (author, url, title) values ('Dan Abramov', 'test.fi', 'Writing Resielient Components')
;

INSERT INTO blogs (author, url, title) values ('Martin Fowler', 'test2.fi', 'Is High quality software worth the cost')
;
