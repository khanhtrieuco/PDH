docker-compose build --compress
docker-compose down
docker-compose up -d -p
docker container prune -f || true
docker image prune -f || true
docker system prune -f || true
