import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    nome: "Tutu à Mineira",
    descricao: "Feijão refogado e engrossado com farinha de mandioca, servido com torresmo crocante, couve refogada, ovo frito e arroz branco.",
    preco: 32.23,
    url_imagem: "https://picsum.photos/seed/tutu/800/600",
    qtd_disp: 30,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 2,
    nome: "Frango com Quiabo",
    descricao: "Coxas e sobrecoxas de frango cozidas em molho caseiro, acompanhadas de quiabo refogado, angu cremoso e arroz soltinho.",
    preco: 30.32,
    url_imagem: "https://picsum.photos/seed/frango/800/600",
    qtd_disp: 30,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 3,
    nome: "Feijoada Mineira",
    descricao: "Feijoada completa com carnes suínas, linguiça, paio, costelinha, servida com couve, farofa, laranja e arroz branco.",
    preco: 45.00,
    url_imagem: "https://picsum.photos/seed/feijoada/800/600",
    qtd_disp: 30,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 5,
    nome: "Feijão Tropeiro",
    descricao: "Feijão tropeiro com linguiça, bacon, torresmo, ovo, farofa e couve crocante, servido com arroz branco.",
    preco: 34.00,
    url_imagem: "https://picsum.photos/seed/tropeiro/800/600",
    qtd_disp: 30,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 11,
    nome: "Suco de Laranja Natural",
    descricao: "Suco fresco de laranjas selecionadas, adoçado ou natural.",
    preco: 10.00,
    url_imagem: "https://picsum.photos/seed/laranja/800/600",
    qtd_disp: 50,
    precisa_produzir: false,
    categoria: 'Bebidas'
  },
  {
    id: 12,
    nome: "Pão de Queijo",
    descricao: "Porção com 6 unidades do autêntico pão de queijo mineiro, crocante por fora e macio por dentro.",
    preco: 15.00,
    url_imagem: "https://picsum.photos/seed/paodequeijo/800/600",
    qtd_disp: 100,
    precisa_produzir: true,
    categoria: 'Entradas'
  },
  {
    id: 13,
    nome: "Torresmo de Rolo",
    descricao: "Torresmo de barriga suína assado e frito, extremamente crocante por fora e suculento por dentro. Acompanha limão e geleia de pimenta.",
    preco: 38.00,
    url_imagem: "https://picsum.photos/seed/torresmo/800/600",
    qtd_disp: 20,
    precisa_produzir: true,
    categoria: 'Entradas'
  },
  {
    id: 14,
    nome: "Bolinho de Mandioca",
    descricao: "Porção com 8 bolinhos de mandioca recheados com queijo canastra derretido.",
    preco: 26.00,
    url_imagem: "https://picsum.photos/seed/bolinho/800/600",
    qtd_disp: 40,
    precisa_produzir: true,
    categoria: 'Entradas'
  },
  {
    id: 15,
    nome: "Pastel de Angu",
    descricao: "Tradicional pastel mineiro feito com massa de milho, recheado com carne moída temperada ou queijo.",
    preco: 22.00,
    url_imagem: "https://picsum.photos/seed/pastel/800/600",
    qtd_disp: 50,
    precisa_produzir: true,
    categoria: 'Entradas'
  },
  {
    id: 16,
    nome: "Galinhada Mineira",
    descricao: "Arroz cozido com frango caipira, açafrão, milho verde e temperos típicos. Um clássico das fazendas mineiras.",
    preco: 42.00,
    url_imagem: "https://picsum.photos/seed/galinhada/800/600",
    qtd_disp: 25,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 17,
    nome: "Vaca Atolada",
    descricao: "Costela bovina cozida lentamente até desmanchar, mergulhada em um creme de mandioca bem temperado.",
    preco: 54.00,
    url_imagem: "https://picsum.photos/seed/vacaatolada/800/600",
    qtd_disp: 15,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 18,
    nome: "Costelinha com Quiabo",
    descricao: "Costelinha de porco frita e depois cozida, servida com quiabo fresquinho, arroz e angu.",
    preco: 48.00,
    url_imagem: "https://picsum.photos/seed/costelinha/800/600",
    qtd_disp: 20,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 19,
    nome: "Doce de Leite com Queijo",
    descricao: "Fatia generosa de queijo minas padrão acompanhada do legítimo doce de leite viçosa.",
    preco: 18.00,
    url_imagem: "https://picsum.photos/seed/docedeleite/800/600",
    qtd_disp: 40,
    precisa_produzir: false,
    categoria: 'Sobremesas'
  },
  {
    id: 20,
    nome: "Ambrosia Mineira",
    descricao: "Doce de leite talhado com ovos e canela, cozido lentamente como nas cozinhas de antigamente.",
    preco: 20.00,
    url_imagem: "https://picsum.photos/seed/ambrosia/800/600",
    qtd_disp: 30,
    precisa_produzir: true,
    categoria: 'Sobremesas'
  },
  {
    id: 21,
    nome: "Cerveja Artesanal",
    descricao: "Cerveja artesanal produzida nas montanhas de Minas (600ml). Consulte os estilos disponíveis.",
    preco: 18.00,
    url_imagem: "https://picsum.photos/seed/beer/800/600",
    qtd_disp: 60,
    precisa_produzir: false,
    categoria: 'Bebidas'
  },
  {
    id: 22,
    nome: "Goiabada Cascão com Queijo",
    descricao: "A clássica sobremesa Romeu e Julieta: goiabada cascão artesanal servida com queijo minas frescal.",
    preco: 16.00,
    url_imagem: "https://picsum.photos/seed/goiabada/800/600",
    qtd_disp: 35,
    precisa_produzir: false,
    categoria: 'Sobremesas'
  },
  {
    id: 23,
    nome: "Pudim de Leite",
    descricao: "Pudim de leite condensado cremoso, sem furinhos, com uma deliciosa calda de caramelo.",
    preco: 14.00,
    url_imagem: "https://picsum.photos/seed/pudim/800/600",
    qtd_disp: 20,
    precisa_produzir: true,
    categoria: 'Sobremesas'
  },
  {
    id: 24,
    nome: "Dose de Cachaça Artesanal",
    descricao: "Dose de cachaça mineira envelhecida em barris de carvalho ou amburana.",
    preco: 12.00,
    url_imagem: "https://picsum.photos/seed/cachaca/800/600",
    qtd_disp: 100,
    precisa_produzir: false,
    categoria: 'Bebidas'
  },
  {
    id: 25,
    nome: "Refrigerante Lata",
    descricao: "Refrigerante em lata 350ml (Cola, Guaraná, Laranja ou Limão).",
    preco: 7.00,
    url_imagem: "https://picsum.photos/seed/soda/800/600",
    qtd_disp: 150,
    precisa_produzir: false,
    categoria: 'Bebidas'
  },
  {
    id: 26,
    nome: "Isca de Tilápia",
    descricao: "Porção de iscas de tilápia empanadas e fritas, acompanhadas de molho tártaro caseiro.",
    preco: 42.00,
    url_imagem: "https://picsum.photos/seed/tilapia/800/600",
    qtd_disp: 25,
    precisa_produzir: true,
    categoria: 'Entradas'
  },
  {
    id: 27,
    nome: "Mandioca Frita com Bacon",
    descricao: "Porção generosa de mandioca frita crocante, coberta com pedaços de bacon e queijo derretido.",
    preco: 32.00,
    url_imagem: "https://picsum.photos/seed/mandiocafrita/800/600",
    qtd_disp: 40,
    precisa_produzir: true,
    categoria: 'Entradas'
  },
  {
    id: 28,
    nome: "Leitão à Pururuca",
    descricao: "Pedaços suculentos de leitão assado com a pele pururucada, servido com farofa de banana, couve e arroz.",
    preco: 65.00,
    url_imagem: "https://picsum.photos/seed/leitao/800/600",
    qtd_disp: 10,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 29,
    nome: "Frango ao Molho Pardo",
    descricao: "Tradicional frango caipira cozido no próprio sangue com temperos verdes, acompanhado de arroz e angu.",
    preco: 58.00,
    url_imagem: "https://picsum.photos/seed/molhopardo/800/600",
    qtd_disp: 12,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  },
  {
    id: 30,
    nome: "Arroz com Suã",
    descricao: "Arroz cozido com pedaços de suã (espinha dorsal do porco com carne), muito temperado e saboroso.",
    preco: 46.00,
    url_imagem: "https://picsum.photos/seed/sua/800/600",
    qtd_disp: 18,
    precisa_produzir: true,
    categoria: 'Pratos Principais'
  }
];
