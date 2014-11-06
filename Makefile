dev:
	PORT=8100 NODE_ENV=dev node-dev server

deploy:
	git push git@heroku.com:littlebits-cloud-developer.git master

api-http-download-options:
	http localhost:8000/options > client/api-http-routes.json

logs:
	heroku logs --tail
