#$coffee = ./node_modules/.bin/coffee
# dev:
# 	NODE_ENV=dev ${$coffee} boot.coffee

dev:
	PORT=8000 NODE_ENV=dev foreman start -f Procfile.dev

build:
	coffee --compile --bare --output ./ ./

deploy:
	git push heroku master

# for heroku
logs:
	heroku logs --tail

# not used
install_buildpack:
	heroku config:set BUILDPACK_URL=https://github.com/aergonaut/heroku-buildpack-coffeescript.git