$coffee = ./node_modules/.bin/coffee

# dev:
# 	NODE_ENV=dev ${$coffee} boot.coffee

dev:
	foreman start -f Procfile.dev

build:
	coffee --compile --bare --output ./ ./

install_buildpack:
	heroku config:set BUILDPACK_URL=https://github.com/aergonaut/heroku-buildpack-coffeescript.git
