#!/bin/bash

# Função para verificar e instalar pacotes necessários
function install_packages {
    echo "Atualizando pacotes do sistema..."
    sudo apt update && sudo apt upgrade -y

    echo "Instalando dependências necessárias..."
    sudo apt install -y nodejs npm git sqlite3
}

# Função para configurar o banco de dados
function setup_database {
    echo "Configurando o banco de dados..."
    sqlite3 ./backend/updates.db <<EOF
    CREATE TABLE IF NOT EXISTS updates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        version TEXT NOT NULL,
        status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        time TEXT NOT NULL,
        action TEXT NOT NULL
    );
EOF
}

# Função para clonar o repositório
function clone_repository {
    echo "Clonando o repositório da aplicação..."
    git clone https://github.com/seu_usuario/seu_repositorio.git backend
}

# Função para instalar dependências do backend
function install_backend_dependencies {
    echo "Instalando dependências do backend..."
    cd backend
    npm install
    cd ..
}

# Função para iniciar o servidor
function start_server {
    echo "Iniciando o servidor..."
    cd backend
    node server.js &
    cd ..
}

# Início do script
echo "Iniciando a instalação do Linux Update Manager..."

install_packages
setup_database
clone_repository
install_backend_dependencies
start_server

echo "Instalação concluída. O servidor está rodando na porta 3000."
