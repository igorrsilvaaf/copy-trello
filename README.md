# 🎯 Project To-do

Um aplicativo de gerenciamento de tarefas inspirado no Trello, construído com React. Permite organizar tarefas em listas, com uma interface moderna e intuitiva.

## ✨ Funcionalidades

- **Gerenciamento de Listas**
  - Criar novas listas
  - Editar título das listas
  - Deletar listas
  - Arquivar listas

- **Gerenciamento de Tarefas**
  - Adicionar tarefas em qualquer lista
  - Editar tarefas existentes
  - Excluir tarefas
  - Arrastar e soltar tarefas entre listas
  - Categorização de tarefas (Backlog, Pending, In Progress, etc.)

- **Personalização**
  - Diferentes cores de fundo
  - Imagens de fundo predefinidas
  - Upload de imagens personalizadas para o fundo
  - Interface adaptável e responsiva

## 🚀 Tecnologias Utilizadas

- React.js
- CSS Modules
- React Icons
- Vite

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/project-todo.git
```

2. Entre no diretório:
```bash
cd project-todo
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🎮 Como Usar

### Criando uma Nova Lista
1. Clique no botão "Adicionar outra lista"
2. A lista será criada com um título padrão
3. Clique no menu (⋮) da lista para editar o título

### Adicionando Tarefas
1. Clique em "Adicionar um cartão" em qualquer lista
2. Digite o título da tarefa
3. Clique em "Adicionar Cartão" ou pressione Enter

### Movendo Tarefas
- Arraste e solte tarefas entre as listas
- As tarefas mantêm suas categorias ao serem movidas

### Personalizando o Fundo
1. Clique no botão "Plano de Fundo" no cabeçalho
2. Escolha entre:
    - Cores predefinidas
    - Imagens predefinidas
    - Upload de imagem personalizada

## 🔧 Estrutura do Projeto

```
project-todo/
├── src/
│   ├── components/
│   │   ├── BackgroundSelector.jsx
│   │   └── TodoList.jsx
│   ├── utils/
│   │   └── backgrounds.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
└── package.json
```

## 📱 Responsividade

O aplicativo é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop: Layout completo com todas as funcionalidades
- Tablet: Scroll horizontal para listas
- Mobile: Interface otimizada para telas pequenas

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


## 👨‍💻 Autor

##### Igor Silva - Quality Assurance

## 🙏 Agradecimentos

- Inspirado no Trello
- Ícones por [React Icons](https://react-icons.github.io/react-icons/)
- Imagens de fundo por [Unsplash](https://unsplash.com/)
