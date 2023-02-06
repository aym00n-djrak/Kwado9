# Matrix

## Introduction
Vidéo explicant le fonctionnement de Matrix :
https://www.youtube.com/watch?v=wSyr8u6dvV0

## Prérequis
- nom de domaine (1,20€ sur [Ionos](https://www.ionos.fr/domaine/fr-domaine))
- serveur local :
	- [Cloudflare Tunnel](https://www.cloudflare.com/fr-fr/products/tunnel/)
	- [Tuto Video Cloudflare Tunnel](https://youtu.be/ey4u7OUAF3c)

	ou 
- Cloud hosting provider :
	- AWS
	- Azure
	- Google Cloud
	- DigitalOcean

## Installation
- [Beeper self-host Guide](https://github.com/beeper/self-host) Digital Ocean Droplet & Docker & Ansible
- [Free small matrix server Guide](https://gitlab.com/ptman/matrix-docs/tree/master/free-matrix-server) Oracle Cloud & Docker & Ansible
- [Michael Schnerring Guide](https://schnerring.net/blog/deploy-a-matrix-homeserver-to-azure-kubernetes-service-aks-with-terraform/) Azure & k8s & Terraform
- [Matrix bujarra.com Guide](https://www.bujarra.com/comunicaciones-corporativas-con-synapse/?lang=fr) Ubuntu & nginx (mal traduit)
- [i12bretro Video Guide](https://www.youtube.com/watch?v=ZUNJ84dMHxk) Ubuntu server & Docker [Guide écrit](https://i12bretro.github.io/tutorials/0662.html) 
- [Matrix Tutorials #1](https://www.youtube.com/watch?v=JCsw1bbBjAM) VPS & Docker (Docker Compose) [Guide écrit](https://matrix.org/docs/guides/understanding-synapse-hosting) 
- [Matrix Tutorials #2](https://www.youtube.com/watch?v=eUBH_pucv4g) VPS & Docker & Ansible
- [hik999 Guide](https://hik999.medium.com/cloud-deployment-of-matrix-homeserver-f08ba5e8109e) AWS & Ansible (100$ a month)
- [Cyberhost Guide](https://cyberhost.uk/element-matrix-setup/#installmatrixandelement) Digital Ocean Droplet & Docker & Ansible

## Ponts
[mautrix-bridges](https://docs.mau.fi/bridges/index.html) lien pour installer les ponts

Github/lab de chaque pont :
| [mautrix/whatsapp](https://github.com/mautrix/whatsapp) | [mautrix/signal](https://github.com/mautrix/signal) |
| --- | --- |
| [mautrix/telegram](https://github.com/mautrix/telegram) | [mautrix/facebook](https://github.com/mautrix/facebook) |
| [mautrix/iMessage](https://github.com/mautrix/imessage) | [mautrix/twitter](https://github.com/mautrix/twitter) |
| [android-sms](https://gitlab.com/beeper/android-sms) | [mautrix/discord](https://github.com/mautrix/discord) |
| [mautrix/slack](https://github.com/mautrix/slack) | [mautrix/instagram](https://github.com/mautrix/instagram) |
| [hifi/heisenbridge](https://github.com/hifi/heisenbridge) | [mautrix/googlechat](https://github.com/mautrix/googlechat) |
| [beeper/linkedin](https://github.com/beeper/linkedin) | [beeper/groupme](https://github.com/beeper/groupme) |

## Liens utiles
- [Synapse Guide](https://matrix.org/docs/guides)
- [Matrix Guide](https://matrix-org.github.io/synapse/latest/welcome_and_overview.html)
