<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <img src="./assets/logo.png" width="320" alt="wise logo" />
</p>


## Descrição
Encurtador de URLs <br/>
Documentação no endpoint `/docs` <br/>
Aplicação disponivel no [heroku](https://wise-shortener.herokuapp.com)

## Funcionamento
A aplicação recebe uma url pelo corpo da requisição do endpoint `/encurtador` e então ela salva a URL recebida no banco de dados, juntamente do código gerado para encurtar a url e retorna essa nova URL encurtada que consiste no endereço da aplicação + /código de encurtamento (6 letras e números gerados randômicamente).
Ao receber uma requisição GET na url encurtada, a partir do código de encurtamento, que vai no parâmetro da requisição, ele busca no banco de dados a url original e retorna um redirect para essa url
## Iniciar a aplicação

```bash
$ docker-compose up
```

## Testes

```bash
# start container
$ docker-compose up

#unit tests
$ docker exec -it wise-shortener sh -c "yarn test"

#e2e
$ docker exec -it wise-shortener sh -c "yarn test:e2e"

#coverage
$ docker exec -it wise-shortener sh -c "yarn test:cov"

```

- Autor - [Caique Porfirio](https://github.com/caiquejjx)


