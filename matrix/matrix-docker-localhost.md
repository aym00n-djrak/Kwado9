# Installation de Matrix et Element en local avec Docker

## Prérequis

### Pour Windows

WSL:
1. Activer ou désactiver des fonctionnalités windows

2. Cochez les cases suivantes :
  - Platefome de machine virtuelle
  - Sous-système Windows pour Linux

3. Sur le microsoft store :
  - Installez [WSL](https://www.microsoft.com/store/productId/9P9TQF7MRM4R)
  - Installez [Ubuntu](https://www.microsoft.com/store/productId/9PN20MSR04DW)
  - (optionnel) Installez [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=en-us&gl=us) (Windows 10)

Docker Destop:
- Installez [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- (optionnel) Créez un compte sur DockerHub pour pouvoir publier ses propre images

## Installation

Générez un fichier de configuration en executant la commande suivante dans un terminal

```bash
docker run -it --rm \
    --mount type=volume,src=synapse-data,dst=/data \
    -e SYNAPSE_SERVER_NAME=my.matrix.host \
    -e SYNAPSE_REPORT_STATS=yes \
    matrixdotorg/synapse:latest generate
```

Puis démarrez le serveur matrix avec la commande suivante:

```bash
docker run -d --name synapse \
    --mount type=volume,src=synapse-data,dst=/data \
    -p 8008:8008 \
    matrixdotorg/synapse:latest
```

Puis téléchargez [Element](https://element.io/download)

## Utilisation

Pour créez un utilisateur entrez dans le terminal:

```bash
 docker exec -it synapse register_new_matrix_user http://localhost:8008 -c /data/homeserver.yaml
 ```
 
 Puis connectez vous sur le client Element en cliquant sur modifier, puis dans autre server d'acceuil entrez l'adresse suivante
 http://localhost:8008/
 Entrez ensuite les informations de l'utilisateur créé précedament et cliquer sur se connecter
