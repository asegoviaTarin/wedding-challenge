export const guests = [
  {
    phone: "600123456",
    name: "Tía Paqui",
    challenge: "Conseguir que el novio baile 'La Macarena' contigo.",
    completed: false
  },
  {
    phone: "600111222",
    name: "Primo Manolo",
    challenge: "Hacerte un selfie con 5 personas que lleven corbata roja.",
    completed: false
  },
  {
    phone: "617834768",
    name: "Alba Segovia",
    challenge: "Llegar a comer hoy antes de las 14:00.",
    completed: false
  },
  {
    phone: "649067636",
    name: "Mario Segovia",
    challenge: "Brindar con el padrino y que diga '¡Vivan los novios!'",
    completed: false
  },
  {
    phone: "600555666",
    name: "Carlos (Amigo Novio)",
    challenge: "Conseguir que la abuela cuente una anécdota de su boda.",
    completed: false
  },
  {
    phone: "666666666", // Test number
    name: "Invitado de Prueba",
    challenge: "Bailar con el camarero más simpático.",
    completed: false
  }
];

export const findGuestByPhone = (phone) => {
  return guests.find(g => g.phone === phone);
};
