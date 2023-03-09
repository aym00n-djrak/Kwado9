# Matrix

Cette documentation explique comment configurer de A à Z votre serveur Matrix pour notre projet.

Pour rendre ce tutoriel plus accessible, il a été réalisé sur Windows 11.

Avant de commencer à configurer votre serveur, il est important de savoir que vous aurez besoin de 2 choses :

- Un nom de domaine (ex: matrix.example.com)
- Un serveur (ex: VPS, Raspberry Pi, etc...)

## Prérequis

- [Créer et configurer une VM Azure](https://github.com/aym00n-djrak/Kwado9/tree/main/matrix/docs/vm-azure.md)
- [Commander votre nom de domaine et configurer votre DNS](https://github.com/aym00n-djrak/Kwado9/tree/main/matrix/docs/domaine-et-dns-ionos.md)
- [Configurer et installer les outils nécessaires sur Windows](https://github.com/aym00n-djrak/Kwado9/tree/main/matrix/docs/outils-windows-et-ssh.md)

## Configuration et installation du serveur

1. Ouvrez Ubuntu depuis le menu démarrer.

2. Clonez le dépôt GitHub contenant les fichiers de configuration d'Ansible en tapant la commande suivante dans le terminal d'Ubuntu :

```bash
git clone https://github.com/spantaleev/matrix-docker-ansible-deploy
```

3. Déplacez-vous dans le dossier `matrix-docker-ansible-deploy` en tapant la commande suivante :

```bash
cd matrix-docker-ansible-deploy
```

4. Créez un dossier correspondant à votre nom de domaine en tapant la commande suivante :

(remplacez `example.fr` par votre nom de domaine)

```bash
mkdir inventory/host_vars/matrix.example.fr
```

5. Se déplacer dans le dossier correspondant à votre nom de domaine en tapant la commande suivante :

(remplacez `example.fr` par votre nom de domaine)

```bash
cd inventory/host_vars/matrix.example.fr
```

6. Copier le fichier template `vars.yml` dans votre dossier actuel en tapant la commande suivante :

```bash
cp ../../../examples/vars.yml ./
```

7. Éditez le fichier `vars.yml` en tapant la commande suivante :

```bash
code vars.yml
```

Ce fichier contient le strict minimum pour que votre serveur fonctionne.

Si vous souhaitez customiser votre serveur, vous pouvez partir de ce fichier pour créer votre propre fichier de configuration. Pour plus d'informations, vous pouvez consulter la [documentation officielle](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-playbook.md).

Si vous souhaitez reprendre notre configuration, vous pouvez remplacer le contenu du fichier `vars.yml` par celui-ci:

https://github.com/aym00n-djrak/Kwado9/blob/main/matrix/src/exemple-vars.yml

Cependant, il est important de noter que dans les deux cas vous devez remplacer les valeurs suivantes par les vôtres :

- `matrix_domain`
- `matrix_homeserver_generic_secret_key`
- `matrix_ssl_lets_encrypt_support_email`
- `devture_postgres_connection_password`
- `matrix_synapse_ext_password_provider_shared_secret_auth_shared_secret`

Vous pouvez générer des mots de passe sécurisés avec pwgen en tapant la commande suivante dans votre terminal Ubuntu:

```bash
pwgen -s 64 3
```

Sauvegardez les mots de passe générés, vous pourrez en avoir besoin en cas de soucis.
Ne publiez pas ce fichier sur GitHub, il contient des informations sensibles.

8. Sauvegardez ce fichier, puis déplacez vous dans le dossier `inventory` en tapant la commande suivante :

```bash
cd ../..
```

9. Copiez le fichier template `hosts` dans votre dossier actuel en tapant la commande suivante :

```bash
cp ../examples/hosts ./
```

10. Éditez le fichier `hosts` en tapant la commande suivante :

```bash
code hosts
```

Vous devez compléter la dernière ligne de ce fichier de la manière suivante :

(remplacez `example.fr` par votre nom de domaine, `1.2.3.4` par l'adresse IP de votre serveur et `user` par votre nom d'utilisateur)

```bash
matrix.example.fr ansible_host=1.2.3.4 ansible_ssh_user=user become=true become_user=root
```

become=true et become_user=root sont nécessaires pour élever les privilèges de votre utilisateur afin qu'il puisse installer les paquets nécessaires sur votre serveur (en tant que root).

11. Sauvegardez ce fichier, puis déplacez vous dans le dossier `matrix-docker-ansible-deploy` en tapant la commande suivante :

```bash
cd ..
```

12. Téléchargez, puis démarrer Ansible depuis un conteneur Docker en tapant la commande suivante :

```bash
docker run -it --rm \
-w /work \
-v `pwd`:/work \
-v $HOME/.ssh/id_rsa:/root/.ssh/id_rsa:ro \
--entrypoint=/bin/sh \
devture/ansible:latest
```

Cette commande va aussi copier vos fichiers de configuration dans le conteneur Docker ainsi que votre clé SSH.

Une fois dans le conteneur Docker, votre terminal doit ressembler à ceci :

```bash
root@f3b0c5b5b0a5:/work#
```

13. Lancer le playbook Ansible en tapant une à une les commandes suivantes :

```bash
git config --global --add safe.directory /work
```

```bash
make roles
```

```bash
ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start
```

Ses commandes vont installer et configurer votre serveur. Cela peut prendre un certain temps. Après une quinzaine de minutes, le terminal doit afficher de nouveau /work# avec un message de succès. Il faudra encore attendre quelques minutes pour que le serveur soit disponible et que les certificats SSL soient générés.

14. Vérifiez que votre serveur est bien en ligne en y accédant depuis votre navigateur en tapant les adresses suivantes :

https://example.fr pour accéder à la page d'accueil du serveur Nginx

https://matrix.example.fr pour accéder à la page d'accueil de votre serveur Matrix

https://element.example.fr pour accéder à la page d'accueil de votre client web Element

https://chat.example.fr pour accéder au client cinny (remplaçant Element si vous avez utilisé notre fichier exemple-vars.yml)

Votre serveur est maintenant opérationnel !

## Utilisation

1. Créez un compte utilisateur en tapant la commande suivante dans le conteneur Ansible :

(remplacez `user` par votre nom d'utilisateur, `password` par votre mot de passe et `no` par `yes` si vous souhaitez que votre compte soit administrateur)

```bash
ansible-playbook -i inventory/hosts setup.yml --extra-vars='username=user password=password admin=no' --tags=register-user
```

2. Connectez vous à votre serveur Matrix depuis votre client Element (en utilisant les identifiants créés au point 1) à l'adresse suivante : https://element.example.fr/


3. Mettez en place chaque pont :
    ![CleanShot 2023-01-26 at 23 08 40](https://user-images.githubusercontent.com/1048265/215031550-61f92954-6936-42af-bb4b-a8165e17389e.gif)

    1. Cliquer sur le bouton `+` en haut à gauche et tapez @whatsappbot:exemple.fr
    2. Cliquez sur le bot dans les suggestions proposées
    3. Cliquez sur la conversation `whatsappbot` dans la liste des conversations
    4. Envoyez le message `login` au bot
    5. Scannez le QR code avec votre téléphone
    6. Répétez les étapes 1 à 5 pour chaque pont que vous souhaitez mettre en place
    les commandes à envoyer au bot peuvent changer, mais sont toujours indiquées dans la documentation du pont accessible en envoyant le message `help` au bot

Vous pouvez maintenant utiliser les ponts que vous avez mis en place pour communiquer avec vos contacts depuis Matrix !

Plusieurs Clients Matrix sont disponibles sur PC comme sur téléphone, vous pouvez en trouver une liste ici : https://matrix.org/clients/

(Connectez-vous aux clients en utilisant l'adresse https://matrix.example.fr et les identifiants créés au point 1)

## Sources

https://www.youtube.com/watch?v=JCsw1bbBjAM

https://www.youtube.com/watch?v=eUBH_pucv4g

https://github.com/beeper/self-host/blob/main/README.md

## Auteur

Enzo GALLOS
