# Configuration des outils nécessaire sur Windows

Afin de rendre la configuration la plus simple et la plus sécurisée possible, nous avons choisi d'utiliser Docker et Ansible pour la configuration de notre serveur. 

Ansible permet d'installer et de configurer automatiquement les différents services que nous allons utiliser sur notre serveur à partir de fichiers de configuration.

Malheureusement, Ansible ne fonctionne pas nativement sur Windows. C'est pourquoi nous allons utiliser Docker Desktop à travers WSL (Windows Subsystem for Linux) pour pouvoir utiliser Ansible sur Windows. 

WSL nous permettra aussi d'utiliser les outils linux nécessaires à la configuration de notre serveur comme Git, pwgen, etc.

## Installation de WSL et Docker Desktop

1. Ouvrez le menu démarrer et tapez "Activer ou désactiver des fonctionnalités windows" puis cliquez sur le résultat correspondant
![activer ou désactiver des fonctionnalités windows](./images/activer-desactiver.png)

2. Cochez les cases suivantes :
  - Platefome de machine virtuelle
  - Sous-système Windows pour Linux
![fonctionnalités windows](./images/fonctionalites.png)

Cliquez sur OK pour valider, puis redémarrez votre ordinateur.

3. Sur le microsoft store :
  - Installez [WSL](https://www.microsoft.com/store/productId/9P9TQF7MRM4R)
  - Installez [Ubuntu](https://www.microsoft.com/store/productId/9PN20MSR04DW)

Vous pouvez maintenant ouvrir Ubuntu depuis le menu démarrer.


4. Installez [Docker Desktop](https://www.docker.com/products/docker-desktop/)

5. Votre ordinateur va redémarrer pour pouvoir finir l'installation de Docker Desktop.

6. Pour pouvoir utiliser Docker Desktop à travers Ubuntu, il faut activer l'intégration de WSL dans Docker Desktop. Pour cela, ouvrez Docker Desktop, cliquez sur les paramètres, puis sur ressources. Puis dans l'onglet WSL Integration, activez Ubuntu et cliquez sur Apply and restart.

![docker desktop wsl](./images/wsl.png)

Vous pouvez maintenant utiliser Docker Desktop à travers Ubuntu.

## Installation des autres outils

Nous allons maintenant installer les autres outils nécessaires à la configuration de notre serveur. 
- Git sera utilisé pour récupérer les fichiers de configuration d'Ansible
- Pwgen sera utilisé pour générer des mots de passe aléatoires 
- Visual Studio Code sera utilisé pour éditer les fichiers de configuration d'Ansible.

1. Ouvrez Ubuntu depuis le menu démarrer.

2. Installez git et pwgen en tapant les commandes suivantes dans le terminal d'Ubuntu :

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install git pwgen -y
```

3. Sur Windows, installer [Visual Studio Code](https://code.visualstudio.com/)



