# For us

dev:
	PORT=8000 NODE_ENV=dev foreman start -f Procfile.dev

deploy:
	git push heroku master

# For Heroku

logs:
	heroku logs --tail