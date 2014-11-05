dev:
	PORT=8000 NODE_ENV=dev node-dev server

deploy:
	git push git@heroku.com:littlebits-cloud-developer.git master

logs:
	heroku logs --tail
