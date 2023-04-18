FROM node:14

# Copia a pasta do cliente para o container
WORKDIR /app
COPY . /app/

# Instala as dependências do Node.js
RUN npm install

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar o servidor de desenvolvimento do Next.js
CMD ["npm", "run" "dev"]