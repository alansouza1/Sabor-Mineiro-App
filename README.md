# Sabor Mineiro Delivery 🍲

Este é o repositório do frontend da aplicação de delivery "Sabor Mineiro", construída com React, TypeScript, Vite e Tailwind CSS. 

Atualmente, a aplicação funciona de forma *standalone* (sem backend real), utilizando o `localStorage` do navegador para simular a persistência de dados do carrinho e dos pedidos.

---

## 🤖 Contexto para o Gemini CLI (AI Assistant)

**Atenção Gemini CLI / AI Agent:** O usuário está utilizando este repositório como base para construir o **Backend** da aplicação. Seu objetivo principal será criar uma API RESTful utilizando **Java Spring Boot** e integrar este frontend a ela, substituindo o uso atual de `localStorage`.

Abaixo estão os detalhes técnicos e a arquitetura atual para guiar o seu desenvolvimento.

### 1. Stack Tecnológica
* **Frontend:** React 19 + Vite, TypeScript, Tailwind CSS v4, React Router DOM v7
* **Backend Alvo:** Java Spring Boot (REST API)
* **Comunicação:** Axios (já instalado no `package.json` do frontend)

### 2. Diretrizes para o Backend em Spring Boot
Ao gerar o código do backend, por favor, siga estas convenções:
* Crie **REST Controllers** para expor os endpoints.
* Utilize **Spring Data JPA** (Repositories) e **Entities** para persistência no banco de dados (ex: PostgreSQL ou MySQL).
* Crie **DTOs (Data Transfer Objects)** que correspondam exatamente às interfaces TypeScript listadas abaixo.
* **CORS:** Lembre-se de configurar o CORS globalmente no Spring Boot (ex: `@CrossOrigin` ou via `WebMvcConfigurer`) para permitir requisições da porta onde o Vite roda (geralmente `http://localhost:3000` ou `http://localhost:5173`).

### 3. Modelos de Dados (Interfaces TypeScript -> DTOs Java)
Para que o backend se comunique perfeitamente com o frontend, a API deve respeitar os seguintes contratos de dados:

```typescript
// Produto do Cardápio
export interface Product {
  id: number | string;
  nome: string;
  descricao: string;
  preco: number;
  url_imagem: string;
  qtd_disp: number;
  precisa_produzir: boolean;
  categoria: string;
}

// Item no Carrinho/Pedido
export interface CartItem extends Product {
  quantity: number;
  observations?: string;
}

// Dados do Cliente
export interface Customer {
  name: string;
  phone: string;
  address: string;
  paymentMethod: 'pix' | 'card' | 'cash';
}

// Pedido Completo
export interface Order {
  id: string; // Ex: "#123" ou UUID
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  customer: Customer;
  createdAt: string; // ISO Date string
}
```

### 4. Endpoints da API Necessários (Sugestão de Implementação)
O backend Spring Boot precisará expor, no mínimo, os seguintes endpoints:

* **Produtos (Menu):**
  * `GET /api/products` - Retorna a lista de produtos disponíveis.
* **Pedidos (Orders):**
  * `POST /api/orders` - Cria um novo pedido (Checkout).
  * `GET /api/orders` - Lista todos os pedidos (Para o painel Admin).
  * `PATCH /api/orders/{id}/status` - Atualiza o status de um pedido específico (Painel Admin).

### 5. Onde fazer a integração no Frontend
Ao criar o backend, você precisará modificar os seguintes arquivos no frontend para conectá-los à API Spring Boot:

1. **`src/hooks/useOrders.ts`**:
   * Substituir a leitura do `localStorage` por uma chamada `GET /api/orders`.
   * Substituir a função `addOrder` por uma chamada `POST /api/orders`.
   * Substituir a função `updateOrderStatus` por uma chamada `PATCH /api/orders/{id}/status`.
2. **`src/hooks/useCart.ts`**:
   * O carrinho pode continuar usando `localStorage` para persistência local na máquina do cliente antes do checkout, mas a finalização do carrinho deve chamar a API.
3. **Listagem de Produtos**:
   * Atualmente os produtos podem estar *hardcoded* (mockados). Eles devem passar a ser carregados via `GET /api/products` em um `useEffect` na página do cardápio.

---

## 🚀 Como rodar o projeto localmente (Frontend)

### Pré-requisitos
* Node.js (v18 ou superior recomendado)
* npm ou yarn

### Instalação

1. Clone o repositório e entre na pasta:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Para rodar os testes:
```bash
npm run test
```
