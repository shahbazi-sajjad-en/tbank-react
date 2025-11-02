#!/bin/bash
# PRO Deploy Script with auto-clean, restart policy, env vars, colored logs and auto tail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOCKER_REGISTRY="docker.ham-sun.com"
DOCKER_REPOSITORY="docker-hosted"
DOCKER_USERNAME="m.bazrafshan"
DOCKER_PASSWORD="m.bazrafshan"

IDENTIFIER=""
PORT="8090"
CONTAINER_NAME="cbaas-tbank-nextjs"

show_help() {
  echo -e "${BLUE}Usage:${NC} ./deploy-pro.sh -i <identifier> [-p <port>]"
}

while [[ $# -gt 0 ]]; do
  case $1 in
    -i|--id) IDENTIFIER="$2"; shift 2;;
    -p|--port) PORT="$2"; shift 2;;
    -h|--help) show_help; exit 0;;
    *) echo -e "${RED}Unknown option:${NC} $1"; show_help; exit 1;;
  esac
done

if [ -z "$IDENTIFIER" ]; then
  echo -e "${RED}Error:${NC} identifier required (-i)"
  exit 1
fi

IMAGE_NAME="cbaas-tbank-nextjs:v${IDENTIFIER}"
REMOTE_IMAGE_NAME="${DOCKER_REGISTRY}/${DOCKER_REPOSITORY}/${IMAGE_NAME}"

echo -e "${BLUE}[1]${NC} Building local image: ${GREEN}$IMAGE_NAME${NC}"
docker build -t "$IMAGE_NAME" . || exit 1

echo -e "${BLUE}[2]${NC} Tagging image for remote registry"
docker tag "$IMAGE_NAME" "$REMOTE_IMAGE_NAME"

echo -e "${BLUE}[3]${NC} Logging into registry: ${YELLOW}$DOCKER_REGISTRY${NC}"
docker login "$DOCKER_REGISTRY" -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" || exit 1

echo -e "${BLUE}[4]${NC} Pushing image to remote registry"
docker push "$REMOTE_IMAGE_NAME" || exit 1

echo -e "${BLUE}[5]${NC} Pulling image from remote to confirm"
docker pull "$REMOTE_IMAGE_NAME" || exit 1

# Stop and remove previous container if exists
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo -e "${YELLOW}Container exists. Stopping and removing...${NC}"
  docker stop "$CONTAINER_NAME" >/dev/null 2>&1
  docker rm "$CONTAINER_NAME" >/dev/null 2>&1
fi

echo -e "${BLUE}[6]${NC} Running new container on port ${YELLOW}$PORT${NC}"
docker run -d \
  --name "$CONTAINER_NAME" \
  -p "$PORT":"$PORT" \
  -e NODE_ENV=production \
  --restart unless-stopped \
  "$REMOTE_IMAGE_NAME" || exit 1

echo -e "${BLUE}[7]${NC} Logout from registry"
docker logout "$DOCKER_REGISTRY" >/dev/null 2>&1

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "📦 Container: ${YELLOW}$CONTAINER_NAME${NC}"
echo -e "🌐 URL: ${GREEN}http://localhost:$PORT${NC}"
echo -e "🆔 Image: ${GREEN}$REMOTE_IMAGE_NAME${NC}"

# echo -e "\n${BLUE}--- Showing live logs (Ctrl+C to exit) ---${NC}\n"
# docker logs -f "$CONTAINER_NAME"
