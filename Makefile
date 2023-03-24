IMAGE = node:16-alpine
DOCKER = docker run --rm -v $(PWD):/app:rw,delegated -w /app

.PHONY: install
install:
	@$(DOCKER) -it $(IMAGE) yarn install

.PHONY: build
build:
	@$(DOCKER) -it $(IMAGE) yarn build

.PHONY: shell
shell:
	@$(DOCKER) -it $(IMAGE) sh
