.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

initialize: application certs
	@sudo ./infra/local/scripts/hosts.sh
	@yarn install

application:
	@brew install mkcert nss traefik node watchman || true
	@npm install -g yarn corepack --force || true
	@corepack enable
	@yarn install
	@xcode-select --install || true

# install
certs:
	@mkcert -install
	@rm -rf infra/local/cert && mkdir infra/local/cert
	@cd infra/local/cert && mkcert "w0nder.work" '*.w0nder.work' "w0nder.land" "*.w0nder.land"

clean-node-modules:
	@rm -rf src/w0nder-land/node_modules

clean-dist:
	@rm -rf src/w0nder-land/.next

clean: clean-node-modules clean-dist
