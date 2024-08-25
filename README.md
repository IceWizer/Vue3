# Installation

## Docker

https://docs.docker.com/desktop/install/windows-install/

## Ajouter un .env avec à l'intérieur
### Pour serveur/local
VITE_BASE_URL="https://api.password-manager.icewize.fr/"
VITE_API_URL="https://api.password-manager.icewize.fr/api/"

### Pour tout en local
VITE_BASE_URL="http://localhost/"
VITE_API_URL="http://localhost/api/"

docker compose up -d