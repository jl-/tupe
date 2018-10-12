build:
	@yarn build

clear:
	@[ -d lib ] && rm -r lib || true
	@[ -d .tmp ] && rm -r .tmp || true
	@[ -d .cache ] && rm -r .cache || true
