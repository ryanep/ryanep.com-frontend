import express from 'express';
import { match } from 'react-router';
import compression from 'compression';
import config from './config';
import routes from '../app/routes';
import minifyHTML from 'express-minify-html';
import { handleRender, handleNotFound } from './render';

const app = express();

app.set('views', process.cwd() + '/src/server/views');
app.set('view engine', 'ejs');

app.use(compression());
app.use(minifyHTML({
    override: true,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));

app.use(express.static('dist/public'));
app.use(express.static('static'));

app.use((req, res, next) => {
	if(req.url.substr(-1) === '/' && req.url.length > 1) {
		res.redirect(301, req.url.substring(0, req.url.length-1));
	} else {
		next();
	}
});

app.get('*', (req, res) => {
	match({ routes, location: req.url }, (err, redirect, props) => {
		if (props) {
			handleRender(res, props);
		} else {
			handleNotFound(res);
		}
	});
});

app.listen(config.app.port, () => {
	console.log(`Serving site on port ${config.app.port}`);
});