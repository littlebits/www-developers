dev:
	PORT=8000 NODE_ENV=dev node-dev server

client:
	duo client/index.css client/index.js build
	node_modules/.bin/myth build/index.css build/index.css

deploy:
	git push git@heroku.com:littlebits-cloud-developer.git master

logs:
	heroku logs --tail
