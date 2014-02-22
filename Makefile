$coffee = ./node_modules/.bin/coffee

# dev:
# 	NODE_ENV=dev ${$coffee} boot.coffee

boot:
	PORT=8000 foreman start

dev:
	PORT=8000 foreman start -f Procfile.dev 

build:
	coffee --compile --bare --output ./ ./

logs:
	heroku logs --tail

install_buildpack:
	heroku config:set BUILDPACK_URL=https://github.com/aergonaut/heroku-buildpack-coffeescript.git

deploy:
	git push heroku master
