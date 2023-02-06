# update software repositories
sudo apt update
# install available software updates
sudo apt upgrade
# install prerequisites
sudo apt install lsb-release wget openssl apt-transport-https -y
# add matrix gpg key
sudo wget -O /usr/share/keyrings/matrix-org-archive-keyring.gpg https://packages.matrix.org/debian/matrix-org-archive-keyring.gpg
# add matrix apt repository
echo "deb [signed-by=/usr/share/keyrings/matrix-org-archive-keyring.gpg] https://packages.matrix.org/debian/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/matrix-org.list
# update software repositories
sudo apt update
# install synapse
sudo apt install matrix-synapse-py3 -y
# when prompted, enter localhost as the name of the matrix server
# choose whether to share statistics with matrix
# install postgresql
sudo apt install libpq5 postgresql -y
# enable the postgresql service and start it
sudo pg_ctlcluster 13 main start
# connect to postgresql
sudo -u postgres psql postgres
# create synapse database user
create user matrix_synapse_rw with password 'm@trix!';
# create matrix_synapse database
create database matrix_synapse with encoding='UTF8' lc_collate='C' lc_ctype='C' template='template0' owner='matrix_synapse_rw';
# close postgresql connection
exit
# edit the homeserver.yaml file
sudo nano /etc/matrix-synapse/homeserver.yaml
