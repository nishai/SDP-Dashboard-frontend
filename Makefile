
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

# =========================================================================	#
# PRINT                                                                     #
# =========================================================================	#

label           := Frontend
docker          := $(shell [ -f /.dockerenv ] && echo 1)
location        := $(if $(docker),\033[94mDocker\033[0m,\033[92mLocal\033[0m)

section:
	@printf "\n[\033[91m\033[1m$(label): $(location)\033[0m]: \033[93m\033[1m$(tag)\033[0m\n"
ifdef details
	@printf	"\033[90m$(details)\033[0m\n\n"
endif

# =========================================================================	#
# LOCAL                                                                     #
# =========================================================================	#

DEV_PORT        := 3080
PROD_PORT       := 4080

echo-dev-port:
	@echo $(DEV_PORT)
echo-prod-port:
	@echo $(PROD_PORT)

DIST_DIR := ./dist
ENV_DEV  := PORT=$(DEV_PORT) HOST=0.0.0.0
ENV_PROD := # n/a

init: package.json package-lock.json
	@make section tag="Installing Dependencies"
	$(ENV_DEV) npm install

dev:
	@make section tag="Serving Dev"
	$(ENV_DEV) npm run dev

test: clean
	@mkdir -p coverage
	@make section tag="Run Unit Tests" details="NOT IMPLEMENTED"
	@make section tag="Code Covergage" details="NOT IMPLEMENTED"

dist: clean
	@make section tag="Building Optimised"
	$(ENV_DEV) npm run build

serve: dist
	@make section tag="Serving Optimised"
	$(ENV_PROD) python3 -m http.server $(PROD_PORT) --directory $(DIST_DIR)

# =========================================================================	#
# CLEAN                                                                     #
# =========================================================================	#

clean:
	@make section tag="Cleaning"
	rm -rf ./dist

