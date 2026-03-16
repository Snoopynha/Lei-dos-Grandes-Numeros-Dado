# 🎲 Simulador - Lei dos Grandes Números

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Spark Java](https://img.shields.io/badge/Spark%20Java-F34B7D?style=for-the-badge)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![Static Badge](https://img.shields.io/badge/font-awesome?style=for-the-badge)
![Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

> Este simulador é uma demonstração prática da **Lei dos Grandes Números (LLN)**, um teorema fundamental da teoria da probabilidade.

## Lei dos Grandes Números

### O Conceito
Através da simulação de lançamentos de dados, o sistema calcula a frequência relativa das faces, mostrando como os resultados convergem para 0.1667 (~16,67%) à medida que o número de tentativas aumenta.

Diferente da moeda (50/50), um dado justo possui 6 resultados possíveis.
- **Probabilidade Teórica ($P$):** $1/6 \approx 0,1667$ para cada face.
- **Frequência Relativa ($f_n$):** É a razão entre o número de sucessos da face e o número total de lançamentos. $$f_n = \frac{\text{sucessos da face}}{\text{total de lançamentos}}$$

### O Fenômeno da Convergência (Propriedade D)
Como observado nos gráficos deste projeto:
1. **Instabilidade Inicial:** Com poucos lançamentos (ex: 10 ou 20), a frequência relativa pode variar drasticamente (ex: 0,8 ou 0,2), pois cada evento individual tem um peso enorme no total.
2. **Estabilização:** Conforme $n \to \infty$ (tende ao infinito), a diferença entre a frequência observada e a probabilidade teórica converge para zero:
   $$|f_n - P| \to 0$$

Isso explica por que, após 1.000 ou 10.000 lançamentos, as linhas no gráfico tornam-se quase horizontais, "colando" na linha de referência de 0.1667.

## Demonstração
[Clique aqui para ver a Demonstração Online](https://snoopynha.github.io/Lei-dos-Grandes-Numeros-Dado/)

## Tecnologias Utilizadas
- **Backend:** Java com framework Spark.
- **Gerenciamento de Dependências:** Maven.
- **Frontend:** HTML5, CSS3 e JavaScript.
- **Gráficos:** Chart.js.
- **Animações:** CSS Keyframes e Font Awesome para efeito do dado.

## Como rodar o projeto localmente

1. **Pré-requisitos:** Ter o Java JDK e o Maven instalados.
2. **Clonar o repositório:**
    ```bash
    git clone https://github.com/Snoopynha/Lei-dos-Grandes-Numeros-Dado.git

3. **Executar o servidor: Dentro da pasta do projeto rode:**
    ```bash
    mvn exec:java -Dexec.mainClass="LancamentoDados"

4. **Acessar: Abrir o navegador em `http://localhost:4567`**

## Estrutura de Branches
- `main`: Versão completa com servidor Java Spark.
- `gh-pages`: Versão estática para hospedagem no GitHub Pages. 
