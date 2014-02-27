$nodedev = ./node_modules/.bin/node-dev

dev:
	PORT=8000 NODE_ENV=dev ${$nodedev} ./server

devforeman:
	PORT=8000 NODE_ENV=dev foreman start -f Procfile.dev

deploy:
	git push heroku master

# for heroku
logs:
	heroku logs --tail

# not used
install_buildpack:
	heroku config:set BUILDPACK_URL=https://github.com/aergonaut/heroku-buildpack-coffeescript.git