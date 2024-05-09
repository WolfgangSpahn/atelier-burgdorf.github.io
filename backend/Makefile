help:      ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e "s/\\$$//" | sed -e "s/##//"

venv:      ## Install the project.
	python -m venv .venv

install:   ## do install
	python -m pip install -r .\requirements.txt

run:       ## Run the server.
	python server.py

test:      ## Run the tests.
	python stress_tests.py