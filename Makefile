bootstrap:
	docker-compose up -d --remove-orphans
clean:
	docker-compose down --volumes --remove-orphans