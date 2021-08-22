
# SeriesDay :movie_camera:

## Projeto 3 - Social Network desenvolvido no bootcamp de Front-End da SAP006 Laboratória :yellow_heart:

## Índice

1. [Definição do Produto](#dart-definição-do-produto)
2. [Histórias de Usuários](#pencil2-histórias-de-usuários)
3. [Protótipos](#art-protótipos)
4. [Como usar?](#gear-como-usar)
5. [Links para saber mais sobre Pokémons](#link-links-para-saber-mais-sobre-pokémons)
6. [Testes de Usabilidade](#busts_in_silhouette-testes-de-usabilidade)
7. [Tecnologias utilizadas](#robot-tecnologias-utilizadas)
8. [Estrutura dos Principais Arquivos](#file_folder-estrutura-dos-principais-arquivos)
9. [Resultados](#%EF%B8%8F-resultados)
10. [Sobre as desenvolvedoras](#woman_technologist-sobre-as-desenvolvedoras)

---
## :dart: Definição do Produto

O [SeriesDay](https://socialnetworklab-48687.web.app/) é uma rede social para todos os apaixonados por séries e foi desenvolvida para que eles possam compartilhar resenhas/reviews dos seriados assistidos. O seu principal objetivo é promover a interação e comunicação entre usuários que possuem esse interesse em comum. Com essa troca de experiências, o SeriesDay busca ajudá-los a escolher o que assistir entre as milhares de opções dos catálogos dos serviços de streaming. 

O layout do site baseia-se nos acessórios cinematográficos, o que remete à produção audiovisual das séries. A intenção é apresentar para o público uma aplicação temática, intuitiva e aconchegante que propicie uma ótima experiência de usuário. Para isso, nos pontos de interação do usuário, foram utilizadas cores vivas que mudam de acordo com o seu manuseio, pop-ups de informações e de respostas para guiá-lo na usabilidade do produto.

O seu design é mobile first também responsivo para tablet e desktop, o que proporciona a versatilidade e adaptabilidade desejada pelos usuários. A sua idealização foi feita a partir de protótipos de baixa e de alta fidelidade que nortearam a construção do site de acordo com as necessidades dos clientes. Nele, é possível criar uma conta de acesso, logar-se com ela, criar, editar, deletar e dar likes em publicações. Além disso, existe uma área editável de perfil, onde o cliente pode alterar sua imagem de exibição.

---
## :pencil2: Histórias de Usuários
![img](./src/assets/historia1.png)
![img](./src/assets/historia2.png)
![img](./src/assets/historia3.png)
![img](./src/assets/historia4.png)

---
## :art: Protótipos 

* ####  Mobile
![img](./src/assets/prototipo-mobile.png)

* #### Desktop
![img](./src/assets/prototipo-desktop.png)

---
## :gear: Como usar?
- Primeiramente o usuário acessará a página inicial, na qual, o acesso para a Pokedéx ocorre ao clicar na Pokébola;

### Na Pokedéx:
- O usuário é capaz de buscar um Pokémon pelo seu respectivo nome no campo "Busque por um Pokémon"; 
- É possível ordenar os cards em ordem crescente ou decrescente para os atributos de **Nome**, **Raridade**, **Distância dos Ovos**, **Probabilidade de Aparição**, **Chance de Captura**, **Chance de Fuga**,  **Tamanho e Estatísticas**; 
- A filtragem dos cards é independente da ordenação e os Pokemons podem ser selecionados de acordo com o seus **tipos**, **fraquezas**, **resistências** e **distância do candy**. É importante ressaltar que esses filtros são independentes entre si.
- No campo de "Busca Avançada", é possível fazer a filtragem de forma integrada e dinâmica das gerações, tipos, resistências e fraquezas.
- Ao passar o mouse em cima dos cards, os mesmos irão girar e informações adicionais serão exibidas. Quando isso ocorre, o usuário pode visualizar o **peso** e **altura** dos Pokémons, bem como as suas estatísticas **ataque-base**, **defesa-base**, **stamina-base**, **pontos de vida** e **força de combate**. Dados relativos as fraquezas, resistências e geração do indivíduo também poderão ser visualizadas e, além disso, são exibidas setas verdes ou vermelhas que informam, respectivamente, se tal informação do Pokémon está acima ou abaixo da média geral;
- À esquerda da tela, existe um botão de "Informações" para acessar detalhes dos termos exibidos na página. 

---
## :busts_in_silhouette: Testes de Usabilidade
Durante o desenvolvimento do produto, foram realizados testes de usabilidade com diferentes indivíduos no intuito de analisar a experiência do usuário com a interface do site. Com base nos resultados desses testes, foram detectados os seguintes pontos de ajustes:

- Usuário gostaria de entender mais sobre os termos utilizados para descrever os Pokémons
- Desejo por filtros múltiplos que integrem informações 

Para a resolução dessas questões, foram implementados os campos de "Informações" e de "Busca Avançada" descritos anteriormente.

---
## :robot: Tecnologias utilizadas

| Ferramenta | Descrição |
| --- | --- |
| `HTML 5` | Linguagem de marcação |
| `CSS3` | Linguagem de estilização |
| `JavaScript` |  Linguagem de programação interpretada estruturada|
| `Jest` | Framework de teste em JavaScript|
| `Node.js` | Software de execução de códigos JavaScript|
| `Git e GitHub` | Sistemas de controle de versões distribuídos|
| `Firebase` | Plataforma desenvolvida pelo Google para a criação de aplicativos móveis e da web|

---

## :file_folder: Estrutura dos Principais Arquivos
```
.
├── 📁src
|   ├── 📁assets
|   ├── 📁pages
|   |   ├── 📁Login
|   |   |   ├── 📁_snapshots_
|   |   |   |   └── 📄index.spec.js.snap
|   |   |   ├── 📄index.js
|   |   |   ├── 📄index.spec.js
|   |   |   ├── 📄mock.js
|   |   |   └── 📄style.js
|   |   |
|   |   ├── 📁Register
|   |   |   ├── 📁_snapshots_
|   |   |   |   └── 📄index.spec.js.snap
|   |   |   ├── 📄index.js
|   |   |   ├── 📄index.spec.js
|   |   |   ├── 📄mock.js
|   |   |   └── 📄style.js
|   |   |
|   |   ├── 📁Timeline
|   |   |   ├── 📁_snapshots_
|   |   |   |   └── 📄index.spec.js.snap
|   |   |   ├── 📄index.js
|   |   |   ├── 📄index.spec.js
|   |   |   ├── 📄mock.js
|   |   |   └── 📄style.js
|   ├── 📁services
|   |   ├── 📄index.js
|   |   └── 📄index.spec.js
|   ├── 📄config.js
|   ├── 📄general.css 
|   ├── 📄index.html
|   └── 📄main.js
├── 📄README.md
└── 📄package.json

```

## ✔️ Resultados

* ####  Mobile (375px)
![img](./src/images/resultado-mobile-index.png)
![img](./src/images/resultado-mobile-pokedex1.png)
![img](./src/images/resultado-mobile-pokedex2.png)
![img](./src/images/resultado-mobile-pokedex3.png)
![img](./src/images/resultado-mobile-pokedex4.png)
![img](./src/images/resultado-mobile-pokedex5.png)

* #### Tablet (768px)
![img](./src/images/resultado-tablet-index.png)
![img](./src/images/resultado-tablet-pokedex1.png)
![img](./src/images/resultado-tablet-pokedex2.png)
![img](./src/images/resultado-tablet-pokedex3.png)
![img](./src/images/resultado-tablet-pokedex4.png)
![img](./src/images/resultado-tablet-pokedex5.png)

* #### Desktop (1440px)
![img](./src/images/resultado-desktop-index.png)
![img](./src/images/resultado-desktop-pokedex1.png)
![img](./src/images/resultado-desktop-pokedex2.png)
![img](./src/images/resultado-desktop-pokedex3.png)
![img](./src/images/resultado-desktop-pokedex4.png)
![img](./src/imagesresultado-desktop-pokedex5.png)
![img](./src/images/resultado-desktop-pokedex6.png)


---
## :woman_technologist: Sobre as desenvolvedoras
### Patrícia Barnabé

- [LinkedIn](https://www.linkedin.com/in/patriciabarnabe)
- E-mail: patbarnabe5@gmail.com

### Larissa Vilela

- [LinkedIn](https://www.linkedin.com/in/larissa-vilela-sobral/)
- E-mail: larissavilelasobral@gmail.com