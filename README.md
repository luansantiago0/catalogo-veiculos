# Catálogo de veículos

Este projeto consiste em um sistema de catálogo de veículos à venda, com uma interface pública para visualização e um painel administrativo para cadastro, edição e exclusão de registros. O sistema utiliza tecnologias como Node.js, React e Python (FASTAPI) para criar uma API REST e interagir com um banco de dados MySQL e também utilização do JWT (JSON Web Token) para autenticação segura no painel administrativo.

# Conteúdo
- Sistema do projeto em execução
- Tecnologias utilizadas
- Instalação
- Configuração
- Execução
- Uso
- API Endpoints
- Autor
# Sistema do projeto em execução
https://youtu.be/ah3anaOuiLQ

# Tecnologias utilizadas
- Banco de dados: (Dbeaver, Mysql)
- Back end: (Python(FastAPI), SQLALchemy, BucketS3(AWS), JWT).
- Front end: (Typescript, NodeJS, React(Vite).
# Instalação
Certifique-se de ter o Node.js e o Python instalados em seu sistema.
```bash
Instalação das dependências:
#npm install
#pip install -r requirements.txt
```
# Configuração
Backend
- Pré-requisitos: (Python(FastAPI), SQLAlchemy, boto3, JWT)
Observação: As imagens dos carros que são criados são armazenadas no serviço Amazon S3, e a comunicação com o S3 é realizada usando a biblioteca boto3 no arquivo.
```bash
instalações das dependências dentro da pasta catalogo-veiculos-back: 

#pip install fastapi uvicorn
#pip install sqlalchemy
#pip install PyJWT
#pip install passlib
#pip install python-dotenv
#pip install bcrypt
#pip install python-multipart
#pip install boto3
#pip install mysql-connector-python 
```

```bash
- Para configuração do banco de dados mude as variáveis de ambiente no arquivo .env na pasta do backend.
#DATABASE_URL=mysql://seu_usuario:senha@localhost/nome_do_banco
```

```bash
- Para mudar a chave secreta para a autenticação JWT. 
#SECRET_KEY=sua_chave_secreta_para_JWT
```

Frontend
Pré-requisitos: (Typescript, Nodejs, react(vite))

```bash
dentro da pasta 'catalogo-veiculos-front' executar o:
#npm i
```
# Execução
```bash
Execute o backend:
#python -m uvicorn main:app --reload
```
```bash
Execute o frontend:
#npm run dev
```

# Uso
Depois da execução acesse o crud para gerenciar e criar usuários admins através do http://127.0.0.1:8000/docs
Depois da execução acesse o site através do navegador em http://localhost:5173/. Utilize o painel administrativo para fazer login e gerenciar os veículos no catálogo.

# API Endpoints
A API oferece os seguintes endpoints:

POST /create-user Cria um usuário admin
POST /login Login para acessar o token
GET /carros: Lista todos os veículos.
POST /carros: Cria um novo veículo.
PUT /carros/{car_id}: Atualiza um veículo existente.
DELETE /carros/{car_id}: Exclui um veículo.
Certifique-se de incluir o token JWT válido nas requisições privadas.

# Site das documentações da tecnologias utilizadas
[https://fastapi.tiangolo.com]
[https://www.python.org]
[https://www.typescriptlang.org]
[https://react.dev]
[https://nodejs.org/en]
[https://www.mysql.com]
[https://www.sqlalchemy.org]
[https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/s3-userguide.pdf]

# Autor 

Luan Santiago de Araujo
https://www.linkedin.com/in/luan-santiago-4220a0206/
