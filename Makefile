
.DEFAULT_GOAL := help
# force rebuilds
.PHONY: dockerfile dockerfile.serve

# =========================================================================	#
# UTIL                                                                      #
# =========================================================================	#

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  dev                serve the project in *develop mode*, supports live updates"
	@echo "  build              build the project for *production mode*"
	@echo "  serve              serve the project in *production mode*"
	@echo
	@echo "  clean              clean the project"
	@echo
	@echo "  dockerfile         dockerise the project"
	@echo "  docker-dev         dockerised version of dev"
	@echo "  docker-build       dockerised version of build"
	@echo
	@echo "  dockerfile.serve   dockerise the optimised project"
	@echo "  docker-serve       dockerised version of serve"

label = Frontend

section:
	@printf "\n[\e[94m\e[1m$(label)\e[0m]: \e[93m\e[1m$(tag)\e[0m\n"

# =========================================================================	#
# LOCAL                                                                     #
# =========================================================================	#

DIST_DIR = ./dist

init: package.json package-lock.json
	@make section tag="Installing dependencies"
	npm install

dev: init
	@make section tag="Local - Serving Dev"
	npm run dev

build: init
	@make section tag="Local - Building Optimised"
	npm run build

serve: build
	@make section tag="Local - Serving Optimised"
	python3 -m http.server 8080 --directory $(DIST_DIR)

clean:
	@make section tag="Cleaning"
	rm -rf ./dist

# =========================================================================	#
# DOCKER - Local Modifictions & Live Updates                                #
# =========================================================================	#

IMAGE_NAME       = frontend-image

CNTNR_NAME       = frontend-container

VBIND_SRC        = -v "$(shell pwd)/src:/app/src"
VBIND_PUBLIC     = -v "$(shell pwd)/public:/app/public"

RUN_FLAGS        = --rm --name "$(CNTNR_NAME)"

dockerfile:
	@make section tag="Local - Building Dockerfile"
	docker build -t "$(IMAGE_NAME)" ./

docker-dev: dockerfile
	@make section tag="Docker - Serving (Dev Mode)"
	docker run $(RUN_FLAGS) -p 8080:8080 $(VBIND_SRC) $(VBIND_PUBLIC) $(IMAGE_NAME) dev

docker-build: dockerfile
	@make section tag="Docker - Building Optimised"
	docker run $(RUN_FLAGS) $(IMAGE_NAME) build

# =========================================================================	#
# DOCKER - Serve Production                                                 #
# =========================================================================	#

IMAGE_NAME_HTTPD = frontend-image-httpd

CNTNR_NAME_HTTPD = frontend-container-httpd

RUN_FLAGS_HTTPD  = --rm --name "$(CNTNR_NAME_HTTPD)"

dockerfile.serve:
	@make section tag="Local - Building Dockerfile.serve"
	docker build -t "$(IMAGE_NAME_HTTPD)" -f "Dockerfile.serve" ./

docker-serve: dockerfile.serve
	@make section tag="Docker - Serving Optimised"
	docker run $(RUN_FLAGS_HTTPD) -p 8080:80 $(IMAGE_NAME_HTTPD)

