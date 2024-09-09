# MKS Frontend Challenge

Este é um projeto de e-commerce com uma interface responsiva desenvolvida utilizando HTML, CSS e JavaScript (sem framework). O design é baseado na abordagem mobile-first, garantindo uma experiência de usuário otimizada em dispositivos móveis.

### Funcionalidades

- **Adicionar Produto no Carrinho**: Permite ao usuário adicionar produtos ao carrinho de compras.
- **Abrir Carrinho**: Exibe o conteúdo atual do carrinho de compras.
- **Adicionar e Remover Quantidade**: Permite ajustar a quantidade de unidades de um produto no carrinho.
- **Exibir Preço Total**: Calcula e exibe o preço total dos produtos no carrinho.
- **Excluir Produto do Carrinho**: Remove produtos individuais do carrinho.
- **Persistência de Dados**: Utiliza ``localStorage`` para armazenar e gerenciar os dados do carrinho. Isso garante que o carrinho de compras seja preservado entre as sessões do navegador, permitindo que os dados permaneçam disponíveis mesmo após o fechamento e reabertura do navegador.

## Video Demonstrativo
**Clique** na imagem abaixo para abrir o vídeo no YouTube.

<a href="https://youtu.be/zfn7u7KhrhE?si=AfT5CE6EWEU_kEem">
  <img src="https://img.youtube.com/vi/zfn7u7KhrhE/maxresdefault.jpg" width="600" />
</a>

### Instalação e Execução

Para executar este projeto localmente, siga estes passos:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/reuelsilva/mks-frontend-challenge.git
   cd mks-frontend-challenge
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   
3. **Execute o servidor JSON-Server:**
   ```bash
   npx json-server --watch "db.json" -p 3000
    ```
4. **Abra com o Live Server**

### Tecnologias Utilizadas

- **HTML 🟠**: Estruturação da página e conteúdo.
- **CSS 🔵**: Estilização e layout.
- **JavaScript 🟡**: Interatividade e lógica do carrinho de compras.
- **JSON-Server**: Simulação de uma API para fornecer dados dos produtos.
- **LocalStorage**: Armazenamento persistente dos dados do carrinho.
