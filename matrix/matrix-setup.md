# Installation de Matrix et Element
## Installation de Matrix
1. Ouvrez une session en mode administrateur en exécutant la commande suivante :

```bash
sudo su
```

Mettez à jour les paquets système en exécutant les commandes suivantes :

```bash
apt update && apt upgrade
```

Installez les dépendances nécessaires pour Matrix en exécutant la commande suivante :

```bash
apt install lsb-release wget apt-transport-https
```

Téléchargez la clé de paquet pour Matrix en exécutant la commande suivante :

```bash
wget -qO /usr/share/keyrings/matrix-org-archive-keyring.gpg https://packages.matrix.org/debian/matrix-org-archive-keyring.gpg
```

Ajoutez le dépôt Matrix à votre liste de sources en exécutant la commande suivante :

```bash
echo "deb [signed-by=/usr/share/keyrings/matrix-org-archive-keyring.gpg] https://packages.matrix.org/debian/ $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/matrix-org.list
```

Mettez à jour les paquets disponibles en exécutant la commande suivante :

```bash
apt update
```

Installez Matrix Synapse en exécutant la commande suivante :

```bash
apt install matrix-synapse-py3
```

Démarrez Matrix Synapse en exécutant les commandes suivantes :

```bash
systemctl start matrix-synapse
systemctl enable matrix-synapse
```

Générez une chaîne aléatoire pour le secret partagé d'enregistrement en exécutant la commande suivante :

```bash
RANDOMSTRING=$(openssl rand -base64 30)
```

Ajoutez la chaîne aléatoire générée à la configuration de Matrix Synapse en exécutant la commande suivante :

```bash
echo "registration_shared_secret: $RANDOMSTRING" | tee -a /etc/matrix-synapse/homeserver.yaml > /dev/null
```

Redémarrez Matrix Synapse en exécutant la commande suivante :

```bash
systemctl restart matrix-synapse
```

Créez un nouvel utilisateur pour Matrix Synapse en exécutant la commande suivante :

```bash
register_new_matrix_user -c /etc/matrix-synapse/homeserver.yaml http://localhost:8008
```

Votre serveur Matrix est maintenant accessible à l'adresse suivante :
http://localhost:8008/_matrix/static/

Quittez la session en mode administrateur en exécututant la commande:

```bash
exit
```
