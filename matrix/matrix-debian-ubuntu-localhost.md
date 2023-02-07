# Installation de Matrix et Element en local sur Ubuntu ou Debian

## Prérequis

PC ou vm sur Debian ou Ubuntu (ne fonctionne pas sur wsl)  

## Installation de Matrix
1. Ouvrez une session en mode administrateur en exécutant la commande suivante :

```bash
sudo su
```

2. Mettez à jour les paquets système en exécutant les commandes suivantes :

```bash
apt update && apt upgrade
```

2. Installez les dépendances nécessaires pour Matrix en exécutant la commande suivante :

```bash
apt install lsb-release wget apt-transport-https
```

3. Téléchargez la clé de paquet pour Matrix en exécutant la commande suivante :

```bash
wget -qO /usr/share/keyrings/matrix-org-archive-keyring.gpg https://packages.matrix.org/debian/matrix-org-archive-keyring.gpg
```

4. Ajoutez le dépôt Matrix à votre liste de sources en exécutant la commande suivante :

```bash
echo "deb [signed-by=/usr/share/keyrings/matrix-org-archive-keyring.gpg] https://packages.matrix.org/debian/ $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/matrix-org.list
```

5. Mettez à jour les paquets disponibles en exécutant la commande suivante :

```bash
apt update
```

6. Installez Matrix Synapse en exécutant la commande suivante :

```bash
apt install matrix-synapse-py3
```

7. Démarrez Matrix Synapse en exécutant les commandes suivantes :

```bash
systemctl start matrix-synapse
systemctl enable matrix-synapse
```

8. Générez une chaîne aléatoire pour le secret partagé d'enregistrement en exécutant la commande suivante :

```bash
RANDOMSTRING=$(openssl rand -base64 30)
```

9. Ajoutez la chaîne aléatoire générée à la configuration de Matrix Synapse en exécutant la commande suivante :

```bash
echo "registration_shared_secret: $RANDOMSTRING" | tee -a /etc/matrix-synapse/homeserver.yaml > /dev/null
```

10. Redémarrez Matrix Synapse en exécutant la commande suivante :

```bash
systemctl restart matrix-synapse
```

11. Créez un nouvel utilisateur pour Matrix Synapse en exécutant la commande suivante : (réutilisable)

```bash
register_new_matrix_user -c /etc/matrix-synapse/homeserver.yaml http://localhost:8008
```

Votre serveur Matrix est maintenant accessible à l'adresse suivante :
http://localhost:8008/_matrix/static/

Quittez la session en mode administrateur en exécututant la commande:

```bash
exit
```

## Installation d'Element

1. Télécharger la clé de sécurité pour le dépôt Element.io. Pour ce faire, exécutez la commande suivante dans votre terminal :

```bash
sudo wget -O /usr/share/keyrings/element-io-archive-keyring.gpg https://packages.element.io/debian/element-io-archive-keyring.gpg
```

2. Ajoutez maintenant le dépôt Element.io à votre liste de dépôts en utilisant la commande suivante :

```bash
echo "deb [signed-by=/usr/share/keyrings/element-io-archive-keyring.gpg] https://packages.element.io/debian/ default main" | sudo tee /etc/apt/sources.list.d/element-io.list
```

3. Mettez à jour la liste des paquets disponibles sur votre système en utilisant la commande suivante :

```bash
sudo apt update
```

4. Installons maintenant le paquet Element Desktop en utilisant la commande suivante :

```bash
sudo apt install element-desktop -y
```

## Connexion au serveur

Cliquez sur "Se connecter" pour vous connecter à un serveur Matrix. Si vous utilisez le serveur Matrix de Synapse, cliquez sur "Modifier" à côté de "matrix.org", sélectionnez "Autre serveur" et saisissez l'URL http://localhost:8008. Connectez-vous en utilisant les informations d'identification Synapse que vous avez créées plus tôt.

