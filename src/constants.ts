import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tutu à Mineira",
    description: "Feijão refogado e engrossado com farinha de mandioca, servido com torresmo crocante, couve refogada, ovo frito e arroz branco.",
    price: 32.23,
    imageUrl: "https://picsum.photos/seed/tutu/800/600",
    availableQuantity: 30,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 2,
    name: "Frango com Quiabo",
    description: "Coxas e sobrecoxas de frango cozidas em molho caseiro, acompanhadas de quiabo refogado, angu cremoso e arroz soltinho.",
    price: 30.32,
    imageUrl: "https://picsum.photos/seed/frango/800/600",
    availableQuantity: 30,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 3,
    name: "Feijoada Mineira",
    description: "Feijoada completa com carnes suínas, linguiça, paio, costelinha, servida com couve, farofa, laranja e arroz branco.",
    price: 45.00,
    imageUrl: "https://picsum.photos/seed/feijoada/800/600",
    availableQuantity: 30,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 5,
    name: "Feijão Tropeiro",
    description: "Feijão tropeiro com linguiça, bacon, torresmo, ovo, farofa e couve crocante, servido com arroz branco.",
    price: 34.00,
    imageUrl: "https://picsum.photos/seed/tropeiro/800/600",
    availableQuantity: 30,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 11,
    name: "Suco de Laranja Natural",
    description: "Suco fresco de laranjas selecionadas, adoçado ou natural.",
    price: 10.00,
    imageUrl: "https://picsum.photos/seed/laranja/800/600",
    availableQuantity: 50,
    needsProduction: false,
    category: 'Bebidas'
  },
  {
    id: 12,
    name: "Pão de Queijo",
    description: "Porção com 6 unidades do autêntico pão de queijo mineiro, crocante por fora e macio por dentro.",
    price: 15.00,
    imageUrl: "https://picsum.photos/seed/paodequeijo/800/600",
    availableQuantity: 100,
    needsProduction: true,
    category: 'Entradas'
  },
  {
    id: 13,
    name: "Torresmo de Rolo",
    description: "Torresmo de barriga suína assado e frito, extremamente crocante por fora e suculento por dentro. Acompanha limão e geleia de pimenta.",
    price: 38.00,
    imageUrl: "https://picsum.photos/seed/torresmo/800/600",
    availableQuantity: 20,
    needsProduction: true,
    category: 'Entradas'
  },
  {
    id: 14,
    name: "Bolinho de Mandioca",
    description: "Porção com 8 bolinhos de mandioca recheados com queijo canastra derretido.",
    price: 26.00,
    imageUrl: "https://picsum.photos/seed/bolinho/800/600",
    availableQuantity: 40,
    needsProduction: true,
    category: 'Entradas'
  },
  {
    id: 15,
    name: "Pastel de Angu",
    description: "Tradicional pastel mineiro feito com massa de milho, recheado com carne moída temperada ou queijo.",
    price: 22.00,
    imageUrl: "https://picsum.photos/seed/pastel/800/600",
    availableQuantity: 50,
    needsProduction: true,
    category: 'Entradas'
  },
  {
    id: 16,
    name: "Galinhada Mineira",
    description: "Arroz cozido com frango caipira, açafrão, milho verde e temperos típicos. Um clássico das fazendas mineiras.",
    price: 42.00,
    imageUrl: "https://picsum.photos/seed/galinhada/800/600",
    availableQuantity: 25,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 17,
    name: "Vaca Atolada",
    description: "Costela bovina cozida lentamente até desmanchar, mergulhada em um creme de mandioca bem temperado.",
    price: 54.00,
    imageUrl: "https://picsum.photos/seed/vacaatolada/800/600",
    availableQuantity: 15,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 18,
    name: "Costelinha com Quiabo",
    description: "Costelinha de porco frita e depois cozida, servida com quiabo fresquinho, arroz e angu.",
    price: 48.00,
    imageUrl: "https://picsum.photos/seed/costelinha/800/600",
    availableQuantity: 20,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 19,
    name: "Doce de Leite com Queijo",
    description: "Fatia generosa de queijo minas padrão acompanhada do legítimo doce de leite viçosa.",
    price: 18.00,
    imageUrl: "https://picsum.photos/seed/docedeleite/800/600",
    availableQuantity: 40,
    needsProduction: false,
    category: 'Sobremesas'
  },
  {
    id: 20,
    name: "Ambrosia Mineira",
    description: "Doce de leite talhado com ovos e canela, cozido lentamente como nas cozinhas de antigamente.",
    price: 20.00,
    imageUrl: "https://picsum.photos/seed/ambrosia/800/600",
    availableQuantity: 30,
    needsProduction: true,
    category: 'Sobremesas'
  },
  {
    id: 21,
    name: "Cerveja Artesanal",
    description: "Cerveja artesanal produzida nas montanhas de Minas (600ml). Consulte os estilos disponíveis.",
    price: 18.00,
    imageUrl: "https://picsum.photos/seed/beer/800/600",
    availableQuantity: 60,
    needsProduction: false,
    category: 'Bebidas'
  },
  {
    id: 22,
    name: "Goiabada Cascão com Queijo",
    description: "A clássica sobremesa Romeu e Julieta: goiabada cascão artesanal servida com queijo minas frescal.",
    price: 16.00,
    imageUrl: "https://picsum.photos/seed/goiabada/800/600",
    availableQuantity: 35,
    needsProduction: false,
    category: 'Sobremesas'
  },
  {
    id: 23,
    name: "Pudim de Leite",
    description: "Pudim de leite condensado cremoso, sem furinhos, com uma deliciosa calda de caramelo.",
    price: 14.00,
    imageUrl: "https://picsum.photos/seed/pudim/800/600",
    availableQuantity: 20,
    needsProduction: true,
    category: 'Sobremesas'
  },
  {
    id: 24,
    name: "Dose de Cachaça Artesanal",
    description: "Dose de cachaça mineira envelhecida em barris de carvalho ou amburana.",
    price: 12.00,
    imageUrl: "https://picsum.photos/seed/cachaca/800/600",
    availableQuantity: 100,
    needsProduction: false,
    category: 'Bebidas'
  },
  {
    id: 25,
    name: "Refrigerante Lata",
    description: "Refrigerante em lata 350ml (Cola, Guaraná, Laranja ou Limão).",
    price: 7.00,
    imageUrl: "https://picsum.photos/seed/soda/800/600",
    availableQuantity: 150,
    needsProduction: false,
    category: 'Bebidas'
  },
  {
    id: 26,
    name: "Isca de Tilápia",
    description: "Porção de iscas de tilápia empanadas e fritas, acompanhadas de molho tártaro caseiro.",
    price: 42.00,
    imageUrl: "https://picsum.photos/seed/tilapia/800/600",
    availableQuantity: 25,
    needsProduction: true,
    category: 'Entradas'
  },
  {
    id: 27,
    name: "Mandioca Frita com Bacon",
    description: "Porção generosa de mandioca frita crocante, coberta com pedaços de bacon e queijo derretido.",
    price: 32.00,
    imageUrl: "https://picsum.photos/seed/mandiocafrita/800/600",
    availableQuantity: 40,
    needsProduction: true,
    category: 'Entradas'
  },
  {
    id: 28,
    name: "Leitão à Pururuca",
    description: "Pedaços suculentos de leitão assado com a pele pururucada, servido com farofa de banana, couve e arroz.",
    price: 65.00,
    imageUrl: "https://picsum.photos/seed/leitao/800/600",
    availableQuantity: 10,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 29,
    name: "Frango ao Molho Pardo",
    description: "Tradicional frango caipira cozido no próprio sangue com temperos verdes, acompanhado de arroz e angu.",
    price: 58.00,
    imageUrl: "https://picsum.photos/seed/molhopardo/800/600",
    availableQuantity: 12,
    needsProduction: true,
    category: 'Pratos Principais'
  },
  {
    id: 30,
    name: "Arroz com Suã",
    description: "Arroz cozido com pedaços de suã (espinha dorsal do porco com carne), muito temperado e saboroso.",
    price: 46.00,
    imageUrl: "https://picsum.photos/seed/sua/800/600",
    availableQuantity: 18,
    needsProduction: true,
    category: 'Pratos Principais'
  }
];
