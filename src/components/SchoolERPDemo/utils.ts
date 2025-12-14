export function id(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function randName() {
  const first = ["James", "Mary", "Joseph", "Faith", "Peter", "Esther", "Daniel", "Grace", "Paul", "Ruth", "Tom", "Alice"];
  const last = ["Mwangi", "Kamau", "Wambui", "Omondi", "Achieng", "Mutua", "Njoroge", "Chebet"];
  return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
}

export default { id, randName };
