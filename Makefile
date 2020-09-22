IMAGE = node:12-alpine
DOCKER = docker run --rm -v $(PWD):/app:rw,delegated -w /app

.PHONY: install
install:
	@$(DOCKER) -it $(IMAGE) yarn install

.PHONY: test
test:
	@$(DOCKER) -it $(IMAGE) yarn test

.PHONY: build
build:
	@$(DOCKER) -it $(IMAGE) yarn build

.PHONY: shell
shell:
	@$(DOCKER) -it $(IMAGE) sh
