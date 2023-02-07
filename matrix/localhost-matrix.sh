#!/bin/bash

# Installation de Matrix
sudo su

apt update && apt upgrade -y

apt install lsb-release wget apt-transport-https -y

wget -qO /usr/share/keyrings/matrix-org-archive-keyring.gpg https://packages.matrix.org/debian/matrix-org-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/matrix-org-archive-keyring.gpg] https://packages.matrix.org/debian/ $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/matrix-org.list

apt update -y

apt install matrix-synapse-py3 -y

systemctl start matrix-synapse
systemctl enable matrix-synapse

RANDOMSTRING=$(openssl rand -base64 30)

echo "registration_shared_secret: $RANDOMSTRING" | tee -a /etc/matrix-synapse/homeserver.yaml > /dev/null

systemctl restart matrix-synapse

register_new_matrix_user -c /etc/matrix-synapse/homeserver.yaml http://localhost:8008

# Installation d'Element

wget -O /usr/share/keyrings/element-io-archive-keyring.gpg https://packages.element.io/debian/element-io-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/element-io-archive-keyring.gpg] https://packages.element.io/debian/ default main" | tee /etc/apt/sources.list.d/element-io.list

apt update -y

apt install element-desktop -y

exit
