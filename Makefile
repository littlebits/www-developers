$coffee = ./node_modules/.bin/coffee

dev:
	NODE_ENV=dev ${$coffee} boot.coffee
