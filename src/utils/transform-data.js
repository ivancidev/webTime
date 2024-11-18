export const transformData = (forums) => {
  const categories = {
    1: { title: "Lenguajes de programación", cards: [] },
    2: { title: "Front-end", cards: [] },
    3: { title: "Back-end", cards: [] },
    4: { title: "Desarrollo Full-stack", cards: [] },
    5: { title: "DevOps y despliegue", cards: [] },
    6: { title: "Metodologías y mejores prácticas", cards: [] },
    7: {
      title: "Diseño de interfaces y experiencia de usuario (UI/UX)",
      cards: [],
    },
  };

  forums.forEach((forum) => {
    const { id_foro,codCategoria, titulo_foro, descripcion, imagen_foro } = forum;

    if (categories[codCategoria]) {
      categories[codCategoria].cards.push({
        id_foro,
        title: titulo_foro,
        description: descripcion,
        imgUrl: imagen_foro,
      });
    }
  });

  return Object.values(categories);
};
